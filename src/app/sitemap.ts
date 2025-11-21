import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// Revalidate every 24 hours (ISR)
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ktdi.co.kr'; // Update with your actual domain

  // Static routes
  const routes = [
    '',
    '/admin',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic routes from DB with error handling
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const pages = await prisma.page.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });
    
    dynamicRoutes = pages.map((page) => ({
      url: `${baseUrl}/page/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    // During build time, if DB is not accessible, just return static routes
    console.warn('Failed to fetch pages for sitemap:', error);
    // Return empty array for dynamic routes, will be populated on first request
  }

  return [...routes, ...dynamicRoutes];
}
