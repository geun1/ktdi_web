import { prisma } from '@/lib/prisma';
import NewPageForm from './NewPageForm';

export default async function NewPage() {
  const categories = await prisma.navCategory.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Page</h1>
      <NewPageForm categories={categories} />
    </div>
  );
}
