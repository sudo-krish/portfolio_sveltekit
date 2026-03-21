const fs = require('fs');
const filePath = 'd:/projects/portfolio_sveltekit/src/lib/components/home/hero/HeroBackground.svelte';
let content = fs.readFileSync(filePath, 'utf-8');
content = content.replace(/fetchpriority="high"/g, 'loading="lazy" decoding="async"');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Replaced fetchpriority with lazy loading in HeroBackground!');
