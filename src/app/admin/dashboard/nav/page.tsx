import { prisma } from '@/lib/prisma';
import { createCategory, deleteCategory, updateCategory } from './actions';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default async function NavManagementPage() {
  const categories = await prisma.navCategory.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { pages: true } } },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Navigation Management</h1>

      {/* Add New Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Plus className="mr-2" size={20} /> Add New Category
        </h2>
        <form action={createCategory as any} className="flex gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., About Us"
            />
          </div>
          <div className="w-32">
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
              Order
            </label>
            <input
              type="number"
              name="order"
              id="order"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pages Count
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category: any) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category._count.pages}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    {/* Edit Button (Placeholder for now, ideally opens a modal) */}
                    {/* For simplicity in this iteration, we just show delete */}
                    <form action={deleteCategory as any}>
                      <input type="hidden" name="id" value={category.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-900"
                        disabled={category._count.pages > 0}
                        title={category._count.pages > 0 ? "Cannot delete category with pages" : "Delete"}
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
