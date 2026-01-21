import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deletePopup, togglePopupActive } from './actions';
import { Plus, Pencil, Trash2, Eye, EyeOff, Megaphone } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PopupsManagementPage() {
  const popups = await prisma.popup.findMany({
    orderBy: { order: 'asc' },
  });

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ko-KR');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">팝업 관리</h1>
        <Link
          href="/admin/dashboard/popups/new"
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          <span>새 팝업 추가</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                시작일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                종료일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                순서
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {popups.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  등록된 팝업이 없습니다
                </td>
              </tr>
            ) : (
              popups.map((popup) => (
                <tr key={popup.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                    <Megaphone size={16} className="mr-2 text-gray-400" />
                    {popup.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <form action={togglePopupActive}>
                      <input type="hidden" name="id" value={popup.id} />
                      <input type="hidden" name="isActive" value={popup.isActive.toString()} />
                      <button
                        type="submit"
                        className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                          popup.isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {popup.isActive ? (
                          <>
                            <Eye size={12} className="mr-1" />
                            활성
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} className="mr-1" />
                            비활성
                          </>
                        )}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(popup.startDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(popup.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {popup.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link
                        href={`/admin/dashboard/popups/${popup.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="수정"
                      >
                        <Pencil size={18} />
                      </Link>
                      <form action={deletePopup}>
                        <input type="hidden" name="id" value={popup.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-900"
                          title="삭제"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
