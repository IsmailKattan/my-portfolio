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
import { AuthProvider } from './contexts/AuthContext';
import { AdminLayout } from './pages/admin/AdminLayout';
import { LoginPage } from './pages/admin/LoginPage';
import { Dashboard } from './pages/admin/Dashboard';
import { CVEditor } from './pages/admin/CVEditor';
import { ExperiencesEditor } from './pages/admin/ExperiencesEditor';
import { ProjectsEditor } from './pages/admin/ProjectsEditor';
import { CertificatesEditor } from './pages/admin/CertificatesEditor';
import { BlogEditor } from './pages/admin/BlogEditor';
import { ChangePassword } from './pages/admin/ChangePassword';
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
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

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
            <LanguageSwitcher />
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
          </div>
        )}
      </div>
    </nav>
  );
}

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/IsmailKattan',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ismail-kattan/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/i.qttn/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ismail.kattan.3',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:ismailkattan.contact@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { path: '/cv', label: t('nav.cv') },
    { path: '/experiences', label: t('nav.experiences') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/certificates', label: t('nav.certificates') },
    { path: '/blog', label: t('nav.blog') },
  ];

  return (
    <footer className="bg-[#151933] dark:bg-[#0a0e27] text-[#e4e7f1] mt-16 border-t border-[#00d4ff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Logo size="small" />
              <span className="text-lg font-bold bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent">QTTN</span>
            </div>
            <p className="text-[#8b92b8] text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#00d4ff] uppercase tracking-wider mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#8b92b8] hover:text-[#00d4ff] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#00d4ff] uppercase tracking-wider mb-4">{t('footer.connect')}</h3>
            <ul className="space-y-3">
              {socialLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#8b92b8] hover:text-[#00d4ff] transition-colors text-sm"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#00d4ff]/10 text-center text-[#8b92b8] text-sm">
          © {year} Ismail Kattan. {t('footer.rights')}
        </div>
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
              <Route path="password" element={<ChangePassword />} />
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