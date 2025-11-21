export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Welcome</h3>
          <p className="text-gray-600">
            Welcome to the KTDI Admin Dashboard. Use the sidebar to manage navigation categories and page content.
          </p>
        </div>
        {/* Add stats or quick links here later */}
      </div>
    </div>
  );
}
