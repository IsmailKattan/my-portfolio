import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Logo } from './components/Logo';
import { useState, useEffect } from 'react';
import { HomePage } from './pages/home-page';
import { LandingPage } from './pages/LandingPage';
import { CVPage } from './pages/cv-page';
import { ExperiencesPage } from './pages/experiences-page';
import { ProjectsPage } from './pages/projects-page';
import { ProjectDetailPage } from './pages/project-detail-page';
import { CertificatesPage } from './pages/certificates-page';
import { BlogPage } from './pages/blog-page';
import { BlogDetailPage } from './pages/blog-detail-page';
import { LanguageSwitcher } from './components/language-switcher';
import { ThemeToggle } from './components/theme-toggle';
import { Chatbot } from './components/chatbot';
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './pages/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { Dashboard } from './pages/admin/Dashboard';
import { CVEditor } from './pages/admin/CVEditor';
import { ExperiencesEditor } from './pages/admin/ExperiencesEditor';
import { ProjectsEditor } from './pages/admin/ProjectsEditor';
import { CertificatesEditor } from './pages/admin/CertificatesEditor';
import { BlogEditor } from './pages/admin/BlogEditor';
import '../i18n';

function Navigation() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  const navItems = [
    { path: '/cv', label: t('nav.cv') },
    { path: '/experiences', label: t('nav.experiences') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/certificates', label: t('nav.certificates') },
    { path: '/blog', label: t('nav.blog') }
  ];

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  return (
    <nav className="bg-white/80 dark:bg-[#151933]/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-[#00d4ff]/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size="medium" />
            <span className="text-xl hidden sm:block font-bold bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent">QTTN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
                  location.pathname === item.path
                    ? 'bg-[#00d4ff] text-[#0a0e27] shadow-lg shadow-[#00d4ff]/30'
                    : 'text-gray-700 dark:text-[#8b92b8] hover:text-[#00d4ff] hover:bg-gray-100 dark:hover:bg-[#1e2443]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2443] transition-colors text-gray-700 dark:text-[#8b92b8]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-[#00d4ff] text-[#0a0e27] shadow-lg shadow-[#00d4ff]/30'
                    : 'text-gray-700 dark:text-[#8b92b8] hover:bg-gray-100 dark:hover:bg-[#1e2443]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#151933] dark:bg-[#0a0e27] text-[#e4e7f1] mt-16 py-8 border-t border-[#00d4ff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Logo size="small" />
          <span className="text-lg font-bold bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent">QTTN</span>
        </div>
        <p className="text-[#8b92b8]">© {year} All rights reserved</p>
      </div>
    </footer>
  );
}

function PublicLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className={isLanding ? 'flex-1' : 'flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full'}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e27] text-gray-900 dark:text-[#e4e7f1] transition-colors">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route index element={<Dashboard />} />
              <Route path="cv" element={<CVEditor />} />
              <Route path="experiences" element={<ExperiencesEditor />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="certificates" element={<CertificatesEditor />} />
              <Route path="blog" element={<BlogEditor />} />
            </Route>

            {/* Public Routes */}
            <Route path="*" element={<PublicLayout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;