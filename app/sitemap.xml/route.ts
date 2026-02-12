import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://shemford.edu';

  const routes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/admission', priority: '0.95', changefreq: 'weekly' },
    { path: '/contact', priority: '0.9', changefreq: 'daily' },
    { path: '/about', priority: '0.85', changefreq: 'monthly' },
    { path: '/Faculties', priority: '0.7', changefreq: 'weekly' },
    { path: '/Events', priority: '0.75', changefreq: 'weekly' },
    { path: '/Announcement', priority: '0.8', changefreq: 'weekly' },
    { path: '/Achivement', priority: '0.75', changefreq: 'monthly' },
    { path: '/Campus', priority: '0.7', changefreq: 'monthly' },
    { path: '/CBSE', priority: '0.8', changefreq: 'monthly' },
    { path: '/Journal', priority: '0.65', changefreq: 'monthly' },
    { path: '/Calender', priority: '0.7', changefreq: 'weekly' },
    { path: '/Message', priority: '0.65', changefreq: 'weekly' },
    { path: '/Shemford', priority: '0.7', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
     ${routes
       .map((route) => {
         return `
       <url>
         <loc>${baseUrl}${route.path}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
         <changefreq>${route.changefreq}</changefreq>
         <priority>${route.priority}</priority>
       </url>`;
       })
       .join('')}
   </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
