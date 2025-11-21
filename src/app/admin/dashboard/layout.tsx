import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logout } from '../actions';
import { LayoutDashboard, Menu, FileText, LogOut } from 'lucide-react';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">KTDI Admin</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/dashboard/nav"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Menu size={20} />
            <span>Navigation</span>
          </Link>
          <Link
            href="/admin/dashboard/pages"
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <FileText size={20} />
            <span>Pages</span>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
