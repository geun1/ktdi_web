'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarClientProps {
  categories: Array<{
    id: string;
    name: string;
    pages: Array<{
      id: string;
      slug: string;
      title: string;
    }>;
  }>;
}

export default function NavbarClient({ categories }: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
              KTDI 대한재능개발원
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <button className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium group-hover:text-accent transition-colors">
                  {category.name}
                </button>
                {category.pages.length > 0 && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                    {category.pages.map((page) => (
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">메뉴 열기</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 flex justify-between items-center"
                >
                  <span>{category.name}</span>
                  <svg
                    className={`h-5 w-5 transform transition-transform ${
                      openCategory === category.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openCategory === category.id && category.pages.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {category.pages.map((page) => (
                      <Link
                        key={page.id}
                        href={`/page/${page.slug}`}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {page.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
