import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '4y88u6cf',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function getLogo() {
  try {
    const result = await client.fetch(`*[_type == "siteSettings"][0]{ "logoUrl": logo.asset->url }`);
    if (result && result.logoUrl) {
      console.log('LOGO_URL:' + result.logoUrl);
    } else {
      console.log('LOGO_NOT_FOUND');
    }
  } catch (err) {
    console.error(err);
  }
}
getLogo();
