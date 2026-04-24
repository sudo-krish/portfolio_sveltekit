const fs = require('fs');
let css = fs.readFileSync('src/app.css', 'utf-8');

const lightOld = `/* === LIGHT MODE - PURE MONOCHROME === */\r
:root.light, .light, html.light {\r
  /* Background: Crisp Off-White */\r
  --background: 0 0% 98%;\r
  --foreground: 0 0% 4%;\r
  \r
  /* Cards: Pure White */\r
  --card: 0 0% 100%;\r
  --card-foreground: 0 0% 4%;\r
\r
  /* Primary: Deep Black */\r
  --primary: 0 0% 4%;\r
  --primary-foreground: 0 0% 98%;\r
\r
  --secondary: 0 0% 94%;\r
  --secondary-foreground: 0 0% 4%;\r
\r
  --muted: 0 0% 94%;\r
  --muted-foreground: 0 0% 45%;\r
\r
  /* Accent: Structural Grey */\r
  --accent: 0 0% 65%;\r
  --accent-foreground: 0 0% 4%;\r
\r
  /* Highlight: Deep Black */\r
  --highlight: 0 0% 0%;\r
  --highlight-foreground: 0 0% 100%;\r
\r
  --success: 0 0% 60%;\r
  --success-foreground: 0 0% 98%;\r
  --warning: 0 0% 40%;\r
  --warning-foreground: 0 0% 98%;\r
  --destructive: 0 0% 40%;\r
  --destructive-foreground: 0 0% 98%;\r
\r
  /* Borders: Visible clean lines */\r
  --border: 0 0% 88%;\r
  --input: 0 0% 88%;\r
  --ring: 0 0% 4%;\r
\r
  --popover: 0 0% 100%;\r
  --popover-foreground: 0 0% 4%;\r
\r
  /* --- LIGHT GLASSMORPHISM: Crisp, clear --- */\r
  --glass-bg: 0 0% 100% / 0.7;\r
  --glass-border: 0 0% 4% / 0.08;\r
  --glass-blur: 16px;\r
  --glass-highlight: 0 0% 100% / 0.6;`;

const lightNew = `/* === LIGHT MODE - VIBRANT TEAL === */\r
:root.light, .light, html.light {\r
  /* Background: Crisp White */\r
  --background: 220 10% 98%;\r
  --foreground: 220 20% 10%;\r
  \r
  --card: 220 10% 100%;\r
  --card-foreground: 220 20% 10%;\r
\r
  /* Primary: Vibrant Teal */\r
  --primary: 185 90% 35%;\r
  --primary-foreground: 220 10% 98%;\r
\r
  --secondary: 220 10% 94%;\r
  --secondary-foreground: 220 20% 10%;\r
\r
  --muted: 220 10% 94%;\r
  --muted-foreground: 220 10% 45%;\r
\r
  --accent: 185 60% 88%;\r
  --accent-foreground: 220 20% 10%;\r
\r
  --highlight: 185 90% 28%;\r
  --highlight-foreground: 220 10% 98%;\r
\r
  --success: 142 70% 35%;\r
  --success-foreground: 220 10% 98%;\r
  --warning: 45 90% 42%;\r
  --warning-foreground: 220 20% 10%;\r
  --destructive: 0 80% 45%;\r
  --destructive-foreground: 220 10% 98%;\r
\r
  --border: 220 10% 88%;\r
  --input: 220 10% 88%;\r
  --ring: 185 90% 35%;\r
\r
  --popover: 220 10% 100%;\r
  --popover-foreground: 220 20% 10%;\r
\r
  /* --- GLASSMORPHISM WITH VIBRANT TINTS (LIGHT) --- */\r
  --glass-bg: 220 10% 100% / 0.65;\r
  --glass-border: 185 90% 35% / 0.12;\r
  --glass-blur: 16px;\r
  --glass-highlight: 185 90% 35% / 0.06;`;

if (css.includes(lightOld)) {
    css = css.replace(lightOld, lightNew);
    fs.writeFileSync('src/app.css', css, 'utf-8');
    console.log('Light mode updated to vibrant teal');
} else {
    console.log('Could not find old light mode block, trying simpler match...');
    // Simpler approach: just find and replace the key values
    css = css.replace(/\/\* === LIGHT MODE - PURE MONOCHROME === \*\//g, '/* === LIGHT MODE - VIBRANT TEAL === */');
    css = css.replace(/\/\* Background: Crisp Off-White \*\/\s*\n\s*--background: 0 0% 98%;/g, '/* Background: Crisp White */\n  --background: 220 10% 98%;');
    // More targeted replacements for light mode
    const replacements = [
        ['--foreground: 0 0% 4%;', '--foreground: 220 20% 10%;'],
        ['--card: 0 0% 100%;', '--card: 220 10% 100%;'],
        ['--card-foreground: 0 0% 4%;', '--card-foreground: 220 20% 10%;'],
        ['--primary: 0 0% 4%;', '--primary: 185 90% 35%;'],
        ['--primary-foreground: 0 0% 98%;', '--primary-foreground: 220 10% 98%;'],
        ['--secondary: 0 0% 94%;', '--secondary: 220 10% 94%;'],
        ['--secondary-foreground: 0 0% 4%;', '--secondary-foreground: 220 20% 10%;'],
        ['--muted: 0 0% 94%;', '--muted: 220 10% 94%;'],
        ['--muted-foreground: 0 0% 45%;', '--muted-foreground: 220 10% 45%;'],
    ];
    // This is more complex, so let's do a full line-by-line replacement
    // For now, write out the entire light mode section manually
    const lightStart = css.indexOf('/* === LIGHT MODE');
    const lightEnd = css.indexOf('/* Clean drop shadows', lightStart);
    if (lightStart !== -1 && lightEnd !== -1) {
        const before = css.substring(0, lightStart);
        const after = css.substring(lightEnd);
        css = before + lightNew + '\r\n\r\n  ' + after;
        fs.writeFileSync('src/app.css', css, 'utf-8');
        console.log('Light mode updated via section replacement');
    } else {
        console.log('Failed: lightStart=', lightStart, 'lightEnd=', lightEnd);
    }
}
