import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import AdmZip from 'adm-zip';
import dotenv from 'dotenv';

// Load environment variables (useful for local testing)
dotenv.config();

// The target GitHub repository storing your markdown files
const GITHUB_OWNER = 'sudo-krish';
const GITHUB_REPO = 'krish-portfolio-content';
const GITHUB_BRANCH = 'main';

// Destination in SvelteKit where Vite will glob the files
const CMS_DEST_DIR = path.resolve(process.cwd(), 'src/lib/cms-content');

async function run() {
    console.log('🔄 Starting GitHub CMS Fetch...');

    // We use a ZIPBALL stream rather than cloning to remain fully headless & self-contained
    const zipUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/zipball/${GITHUB_BRANCH}`;

    // Cloudflare Pages requires setting GITHUB_CONTENT_TOKEN in the dashboard
    const headers = {
        'User-Agent': 'SvelteKit-CMS-Ingestion',
        'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        console.log('🔒 Using GitHub Personal Access Token for authentication.');
    } else {
        console.warn('⚠️ No GITHUB_TOKEN found. Fetching anonymously (Subject to strict 60 req/hr rate limits).');
    }

    try {
        console.log(`⬇️ Downloading archive from: ${zipUrl}`);
        const response = await fetch(zipUrl, { headers });

        if (!response.ok) {
            throw new Error(`GitHub API refused connection: ${response.status} ${response.statusText}`);
        }

        // Convert the response stream into a buffer for AdmZip
        const buffer = await response.buffer();
        const zip = new AdmZip(buffer);

        // Ensure fresh destination directory
        if (fs.existsSync(CMS_DEST_DIR)) {
            fs.rmSync(CMS_DEST_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(CMS_DEST_DIR, { recursive: true });

        console.log('📦 Extracting archive to src/lib/cms-content...');

        // GitHub ZIPs have a dynamic root folder name (e.g. `sudo-krish-krish-portfolio-content-1a2b3c4`)
        // We unpack everything, then move the inner contents up, then delete the root folder.
        zip.extractAllTo(CMS_DEST_DIR, true);

        const extractedRoot = fs.readdirSync(CMS_DEST_DIR)[0];
        const extractedPath = path.join(CMS_DEST_DIR, extractedRoot);

        // Move the required folders up to the final destination
        const foldersToKeep = ['articles', 'learning', 'projects', 'research'];

        foldersToKeep.forEach(folder => {
            const src = path.join(extractedPath, folder);
            const dest = path.join(CMS_DEST_DIR, folder);
            if (fs.existsSync(src)) {
                fs.renameSync(src, dest);
                console.log(`✅ Extracted /${folder}`);
            }
        });

        // Cleanup the dynamic GitHub root folder
        fs.rmSync(extractedPath, { recursive: true, force: true });

        console.log('✨ GitHub CMS Sync Complete! Files are ready for Vite injection.');

    } catch (error) {
        console.error('❌ Failed to fetch CMS content from GitHub:');
        console.error(error.message);
        process.exit(1);
    }
}

run();
