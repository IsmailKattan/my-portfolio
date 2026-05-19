import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' }
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Languages className="w-5 h-5" />
        <span className="hidden md:inline">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 min-w-[150px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${
                i18n.language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
