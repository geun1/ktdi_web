import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Decode slug in case of URL encoding
  const decodedSlug = decodeURIComponent(slug);

  const page = await prisma.page.findUnique({
    where: {
      slug: decodedSlug,
    },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8 border-b pb-4">
          {page.title}
        </h1>
        <div 
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
