import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '4y88u6cf',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function generateSitemap() {
  const baseUrl = 'https://academiaboulder.com';
  
  console.log('Generating sitemap...');

  // Static pages
  const pages = [
    { url: '/', priority: 1.0 },
  ];

  try {
    // Fetch programs
    const programs = await client.fetch(`*[_type == "program"]{ "slug": slug.current }`);
    programs.forEach((p: any) => {
      if (p.slug) pages.push({ url: `/programas/${p.slug}`, priority: 0.8 });
    });

    // Fetch events
    const events = await client.fetch(`*[_type == "event"]{ "slug": slug.current }`);
    events.forEach((e: any) => {
      if (e.slug) pages.push({ url: `/eventos/${e.slug}`, priority: 0.7 });
    });
  } catch (err) {
    console.error('Error fetching data from Sanity:', err);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <priority>${p.priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(process.cwd(), 'client/public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated successfully at ${outputPath}`);
}

generateSitemap();
