'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPopup(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const isActive = formData.get('isActive') === 'true';
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const order = parseInt(formData.get('order') as string) || 0;

  if (!title || !content) {
    return { error: '제목과 내용은 필수입니다' };
  }

  try {
    await prisma.popup.create({
      data: {
        title,
        content,
        isActive,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        order,
      },
    });
    revalidatePath('/admin/dashboard/popups');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to create popup:', error);
    return { error: '팝업 생성에 실패했습니다' };
  }

  redirect('/admin/dashboard/popups');
}

export async function updatePopup(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const isActive = formData.get('isActive') === 'true';
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const order = parseInt(formData.get('order') as string) || 0;

  if (!id || !title || !content) {
    return { error: '필수 필드가 누락되었습니다' };
  }

  try {
    await prisma.popup.update({
      where: { id },
      data: {
        title,
        content,
        isActive,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        order,
      },
    });
    revalidatePath('/admin/dashboard/popups');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to update popup:', error);
    return { error: '팝업 수정에 실패했습니다' };
  }

  redirect('/admin/dashboard/popups');
}

export async function deletePopup(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  try {
    await prisma.popup.delete({
      where: { id },
    });
    revalidatePath('/admin/dashboard/popups');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete popup:', error);
  }
}

export async function togglePopupActive(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';

  if (!id) {
    return;
  }

  try {
    await prisma.popup.update({
      where: { id },
      data: { isActive: !isActive },
    });
    revalidatePath('/admin/dashboard/popups');
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to toggle popup:', error);
  }
}
