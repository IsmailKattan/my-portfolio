import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FolderGit2, 
  Award, 
  BookOpen, 
  LogOut,
  Shield
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/cv', icon: User, label: 'CV' },
  { path: '/admin/experiences', icon: Briefcase, label: 'Experiences' },
  { path: '/admin/projects', icon: FolderGit2, label: 'Projects' },
  { path: '/admin/certificates', icon: Award, label: 'Certificates' },
  { path: '/admin/blog', icon: BookOpen, label: 'Blog' },
];

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />;
  }

  if (location.pathname === '/admin/login') {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0a0e27]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-[#151933] border-r border-gray-200 dark:border-[#00d4ff]/10">
        <div className="p-6 border-b border-gray-200 dark:border-[#00d4ff]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0a0e27]" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">Admin</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Portfolio CMS</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e2443]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-[#00d4ff]/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
