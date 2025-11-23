import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import TableOfContents from '@/components/ui/TableOfContents';
import RelatedPages from '@/components/ui/RelatedPages';
import ShareButtons from '@/components/ui/ShareButtons';
import FloatingCTA from '@/components/ui/FloatingCTA';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const page = await prisma.page.findUnique({
    where: { slug: decodedSlug },
  });

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  // Strip HTML tags for description (simple regex)
  const description = page.content.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...';

  return {
    title: page.title,
    description: description,
    openGraph: {
      title: page.title,
      description: description,
      type: 'article',
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Decode slug in case of URL encoding
  const decodedSlug = decodeURIComponent(slug);

  const page = await prisma.page.findUnique({
    where: {
      slug: decodedSlug,
    },
    include: {
      category: true,
    },
  });

  if (!page) {
    notFound();
  }

  // Get related pages from same category
  const relatedPages = await prisma.page.findMany({
    where: {
      categoryId: page.categoryId,
      id: { not: page.id },
    },
    take: 3,
    orderBy: {
      order: 'asc',
    },
    include: {
      category: true,
    },
  });

  return (
    <>
      <div className="bg-white min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: page.category.name },
              { label: page.title },
            ]}
          />
          
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-primary mb-8 border-b pb-4">
                {page.title}
              </h1>
              <div 
                className="rich-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
              
              <ShareButtons title={page.title} />
              
              <RelatedPages
                pages={relatedPages.map((p) => ({
                  id: p.id,
                  slug: p.slug,
                  title: p.title,
                  categoryName: p.category.name,
                }))}
              />
            </div>

            {/* Table of Contents Sidebar */}
            <TableOfContents content={page.content} />
          </div>
        </div>
      </div>
      
      <FloatingCTA />
      <ScrollToTop />
    </>
  );
}
