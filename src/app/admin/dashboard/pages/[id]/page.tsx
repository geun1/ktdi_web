import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditPageForm from './EditPageForm';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
  });

  if (!page) {
    notFound();
  }

  const categories = await prisma.navCategory.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Page</h1>
      <EditPageForm page={page} categories={categories} />
    </div>
  );
}
