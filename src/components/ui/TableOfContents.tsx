'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');

    const tocItems: TOCItem[] = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName.substring(1));
      return {
        id,
        text: heading.textContent || '',
        level,
      };
    });

    setToc(tocItems);

    // Add IDs to actual headings in the DOM
    setTimeout(() => {
      const actualHeadings = document.querySelectorAll('.prose h2, .prose h3');
      actualHeadings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }, 100);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('.prose h2, .prose h3');
      let current = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="hidden lg:block sticky top-24 w-64">
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-900">목차</h3>
        </div>
        <nav>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
              >
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left text-sm transition-colors hover:text-primary w-full ${
                    activeId === item.id
                      ? 'text-primary font-medium'
                      : 'text-gray-600'
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
