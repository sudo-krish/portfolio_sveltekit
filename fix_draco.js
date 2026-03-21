const fs = require('fs');
const path = require('path');

const files = [
    'src/lib/components/home/3d/ExperienceGem.svelte',
    'src/lib/components/home/3d/GithubOcta.svelte',
    'src/lib/components/home/3d/TechCube.svelte',
    'src/lib/components/home/3d/ImpactTorus.svelte',
    'src/lib/components/home/3d/DataWarehouse.svelte',
    'src/lib/components/home/3d/CredentialShield.svelte',
    'src/lib/components/home/3d/ContactBeacon.svelte'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Remove the individual DRACOLoader instantiations
        content = content.replace(/import \{ DRACOLoader \} from "three\/examples\/jsm\/loaders\/DRACOLoader\.js";/g, '');
        content = content.replace(/\/\/ --- Draco Decompression ---\r?\n\s*const dracoLoader = new DRACOLoader\(\);\r?\n\s*dracoLoader\.setDecoderPath\("\/draco\/"\);/g, '');
        
        // Replace { dracoLoader } with { useDraco: true, dracoDecoderPath: '...' }
        content = content.replace(/\{ dracoLoader \}/g, '{\n    useDraco: true,\n    dracoDecoderPath: "https://www.gstatic.com/draco/v1/decoders/"\n  }');

        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
