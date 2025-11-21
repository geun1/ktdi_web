import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Navbar() {
  const categories = await prisma.navCategory.findMany({
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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              KTDI
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {categories.map((category: any) => (
              <div key={category.id} className="relative group">
                <button className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium group-hover:text-accent transition-colors">
                  {category.name}
                </button>
                {category.pages.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                    {category.pages.map((page: any) => (
                      <Link
                        key={page.id}
                        href={`/page/${page.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center">
             {/* Mobile menu button placeholder */}
          </div>
        </div>
      </div>
    </nav>
  );
}
