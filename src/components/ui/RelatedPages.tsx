import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedPage {
  id: string;
  slug: string;
  title: string;
  categoryName: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
}

export default function RelatedPages({ pages }: RelatedPagesProps) {
  if (pages.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 페이지</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/page/${page.slug}`}
            className="group bg-gray-50 rounded-lg p-6 hover:bg-primary/5 hover:border-primary border border-gray-200 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {page.categoryName}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {page.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
