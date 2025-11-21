'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const order = parseInt(formData.get('order') as string);

  if (!name || isNaN(order)) {
    return { error: 'Name and order are required' };
  }

  try {
    await prisma.navCategory.create({
      data: {
        name,
        order,
      },
    });
    revalidatePath('/admin/dashboard/nav');
    revalidatePath('/'); // Update main site nav
    return { success: true };
  } catch (error) {
    console.error('Failed to create category:', error);
    return { error: 'Failed to create category' };
  }
}

export async function updateCategory(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const order = parseInt(formData.get('order') as string);

  if (!id || !name || isNaN(order)) {
    return { error: 'ID, Name and order are required' };
  }

  try {
    await prisma.navCategory.update({
      where: { id },
      data: {
        name,
        order,
      },
    });
    revalidatePath('/admin/dashboard/nav');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to update category:', error);
    return { error: 'Failed to update category' };
  }
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    return { error: 'ID is required' };
  }

  try {
    await prisma.navCategory.delete({
      where: { id },
    });
    revalidatePath('/admin/dashboard/nav');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete category:', error);
    return { error: 'Failed to delete category. Ensure it has no pages first.' };
  }
}
