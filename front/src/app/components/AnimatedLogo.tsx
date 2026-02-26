import { useEffect, useRef, useState } from 'react';

interface AnimatedLogoProps {
  className?: string;
}

export function AnimatedLogo({ className = '' }: AnimatedLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check current theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Auto-play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play blocked, user interaction needed
      });
    }
  }, [isDark]);

  const videoSrc = isDark 
    ? '/videos/logo-animation-dark.mp4'
    : '/videos/logo-animation-light.mp4';

  return (
    <div className={`relative ${className}`}>
      {/* Container with glass morphism effect */}
      <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 via-transparent to-[#0ea5e9]/20 pointer-events-none" />
        
        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain relative z-10"
          style={{ maxHeight: '350px' }}
        />
      </div>
    </div>
  );
}
