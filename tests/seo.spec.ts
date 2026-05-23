import { test, expect } from '@playwright/test';

test.describe('SEO and Structured Data', () => {
  test('homepage contains correct SEO meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    const title = await page.title();
    expect(title).toContain('Krishnanand Anil');

    // Check meta description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveCount(1);
    const descContent = await description.getAttribute('content');
    expect(descContent?.length).toBeGreaterThan(0);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);
    
    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });

  test('homepage contains JSON-LD structured data', async ({ page }) => {
    await page.goto('/');

    // Check for the script tag containing ld+json
    const scriptTags = page.locator('script[type="application/ld+json"]');
    
    // There might be multiple schemas (e.g. one from SEO, one from StructuredData)
    const count = await scriptTags.count();
    expect(count).toBeGreaterThan(0);

    let foundPersonSchema = false;
    let foundWebsiteSchema = false;

    for (let i = 0; i < count; i++) {
      const content = await scriptTags.nth(i).textContent();
      console.log('JSON-LD Content:', content);
      if (content) {
        if (content.includes('"Person"')) foundPersonSchema = true;
        if (content.includes('"WebSite"')) foundWebsiteSchema = true;
      }
    }

    // At least one of these should be present based on default settings
    expect(foundPersonSchema || foundWebsiteSchema).toBe(true);
  });
});
