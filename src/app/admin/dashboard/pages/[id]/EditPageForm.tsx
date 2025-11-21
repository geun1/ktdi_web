'use client';

import { useState } from 'react';
import { updatePage } from '../actions';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface EditPageFormProps {
  page: any;
  categories: any[];
}

export default function EditPageForm({ page, categories }: EditPageFormProps) {
  const [content, setContent] = useState(page.content);

  return (
    <form action={updatePage as any} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
      <input type="hidden" name="id" value={page.id} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Page Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={page.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL)
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            required
            defaultValue={page.slug}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="categoryId"
            id="categoryId"
            required
            defaultValue={page.categoryId}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
          >
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <input
            type="number"
            name="order"
            id="order"
            required
            defaultValue={page.order}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <RichTextEditor value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Update Page
        </button>
      </div>
    </form>
  );
}
