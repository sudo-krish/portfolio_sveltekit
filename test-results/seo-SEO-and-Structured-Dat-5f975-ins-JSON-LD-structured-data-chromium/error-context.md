# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo.spec.ts >> SEO and Structured Data >> homepage contains JSON-LD structured data
- Location: tests\seo.spec.ts:26:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('SEO and Structured Data', () => {
  4  |   test('homepage contains correct SEO meta tags', async ({ page }) => {
  5  |     await page.goto('/');
  6  | 
  7  |     // Check title
  8  |     const title = await page.title();
  9  |     expect(title).toContain('Krishnanand Anil');
  10 | 
  11 |     // Check meta description
  12 |     const description = page.locator('meta[name="description"]');
  13 |     await expect(description).toHaveCount(1);
  14 |     const descContent = await description.getAttribute('content');
  15 |     expect(descContent?.length).toBeGreaterThan(0);
  16 | 
  17 |     // Check Open Graph tags
  18 |     const ogTitle = page.locator('meta[property="og:title"]');
  19 |     await expect(ogTitle).toHaveCount(1);
  20 |     
  21 |     // Check canonical link
  22 |     const canonical = page.locator('link[rel="canonical"]');
  23 |     await expect(canonical).toHaveCount(1);
  24 |   });
  25 | 
  26 |   test('homepage contains JSON-LD structured data', async ({ page }) => {
  27 |     await page.goto('/');
  28 | 
  29 |     // Check for the script tag containing ld+json
  30 |     const scriptTags = page.locator('script[type="application/ld+json"]');
  31 |     
  32 |     // There might be multiple schemas (e.g. one from SEO, one from StructuredData)
  33 |     const count = await scriptTags.count();
  34 |     expect(count).toBeGreaterThan(0);
  35 | 
  36 |     let foundPersonSchema = false;
  37 |     let foundWebsiteSchema = false;
  38 | 
  39 |     for (let i = 0; i < count; i++) {
  40 |       const content = await scriptTags.nth(i).textContent();
  41 |       console.log('JSON-LD Content:', content);
  42 |       if (content) {
  43 |         if (content.includes('"Person"')) foundPersonSchema = true;
  44 |         if (content.includes('"WebSite"')) foundWebsiteSchema = true;
  45 |       }
  46 |     }
  47 | 
  48 |     // At least one of these should be present based on default settings
> 49 |     expect(foundPersonSchema || foundWebsiteSchema).toBe(true);
     |                                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  50 |   });
  51 | });
  52 | 
```