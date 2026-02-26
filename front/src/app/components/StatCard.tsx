import { useEffect, useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  value: number;
  label: string;
  icon: LucideIcon;
  suffix?: string;
  delay?: number;
}

export function StatCard({ value, label, icon: Icon, suffix = '', delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-[#0a0e27]" />
        </div>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {count}{suffix}
        </span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}
