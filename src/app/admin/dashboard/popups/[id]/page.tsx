import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditPopupForm from './EditPopupForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPopupPage({ params }: PageProps) {
  const { id } = await params;

  const popup = await prisma.popup.findUnique({
    where: { id },
  });

  if (!popup) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">팝업 수정</h1>
      <EditPopupForm popup={popup} />
    </div>
  );
}
