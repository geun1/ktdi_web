import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

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

  // Dynamic routes from DB
  const pages = await prisma.page.findMany();
  
  const dynamicRoutes = pages.map((page: any) => ({
    url: `${baseUrl}/page/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...dynamicRoutes];
}
