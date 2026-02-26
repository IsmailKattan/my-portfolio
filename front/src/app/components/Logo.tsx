import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ className = '', size = 'medium' }: LogoProps) {
  const [isDark, setIsDark] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [currentSize, setCurrentSize] = useState(1500);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Size mapping for display dimensions
  const sizeClasses = {
    small: 'h-8 w-auto',
    medium: 'h-10 w-auto',
    large: 'h-16 w-auto',
  };

  // Try sizes in order: 1500 -> 1000 -> 500
  const getLogoSrc = () => {
    const theme = isDark ? 'dark' : 'light';
    return `/images/logo-${theme}-${currentSize}.png`;
  };

  const handleError = () => {
    if (currentSize === 1500) {
      setCurrentSize(1000);
    } else if (currentSize === 1000) {
      setCurrentSize(500);
    } else {
      setImgError(true);
    }
  };

  if (imgError) {
    // Fallback to Shield icon if all images fail
    return (
      <div className={`bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] rounded-lg flex items-center justify-center ${size === 'small' ? 'w-8 h-8' : size === 'medium' ? 'w-10 h-10' : 'w-16 h-16'}`}>
        <svg className="w-2/3 h-2/3 text-[#0a0e27]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={getLogoSrc()}
      alt="QTTN Logo"
      className={`${sizeClasses[size]} ${className}`}
      onError={handleError}
    />
  );
}
