import { prisma } from '@/lib/prisma';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  let categories: any[] = [];
  try {
    categories = await prisma.navCategory.findMany({
      include: {
        pages: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });
    console.log(`[Navbar] Successfully fetched ${categories.length} navigation categories`);
  } catch (error) {
    console.error('[Navbar] Failed to fetch navigation categories:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    // Return empty array to allow page to render without navbar items
    categories = [];
  }

  return <NavbarClient categories={categories} />;
}
