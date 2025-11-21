'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPage(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const categoryId = formData.get('categoryId') as string;
  const order = parseInt(formData.get('order') as string);

  if (!title || !slug || !content || !categoryId || isNaN(order)) {
    return { error: 'All fields are required' };
  }

  try {
    await prisma.page.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        order,
      },
    });
    revalidatePath('/admin/dashboard/pages');
    revalidatePath(`/page/${slug}`);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to create page:', error);
    return { error: 'Failed to create page. Slug might be duplicate.' };
  }
  
  redirect('/admin/dashboard/pages');
}

export async function updatePage(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const categoryId = formData.get('categoryId') as string;
  const order = parseInt(formData.get('order') as string);

  if (!id || !title || !slug || !content || !categoryId || isNaN(order)) {
    return { error: 'All fields are required' };
  }

  try {
    await prisma.page.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        categoryId,
        order,
      },
    });
    revalidatePath('/admin/dashboard/pages');
    revalidatePath(`/page/${slug}`);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to update page:', error);
    return { error: 'Failed to update page' };
  }

  redirect('/admin/dashboard/pages');
}

export async function deletePage(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { error: 'ID is required' };
  }

  try {
    await prisma.page.delete({
      where: { id },
    });
    revalidatePath('/admin/dashboard/pages');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete page:', error);
    return { error: 'Failed to delete page' };
  }
}
