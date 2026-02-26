import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Shield, Award, Briefcase, Code, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function HomePage() {
  const { t } = useTranslation();

  const sections = [
    { icon: Shield, title: t('nav.cv'), path: '/cv', color: 'cyan' },
    { icon: Briefcase, title: t('nav.experiences'), path: '/experiences', color: 'blue' },
    { icon: Code, title: t('nav.projects'), path: '/projects', color: 'cyan' },
    { icon: Award, title: t('nav.certificates'), path: '/certificates', color: 'green' },
    { icon: BookOpen, title: t('nav.blog'), path: '/blog', color: 'green' }
  ];

  const colorClasses = {
    cyan: 'from-[#00d4ff] to-[#0ea5e9]',
    blue: 'from-[#0ea5e9] to-[#0284c7]',
    green: 'from-[#10b981] to-[#059669]'
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        {/* Gradient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#00d4ff]/10 to-transparent pointer-events-none" />
        
        <div className="mb-6 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] rounded-full flex items-center justify-center shadow-2xl shadow-[#00d4ff]/50"
          >
            <Shield className="w-16 h-16 text-[#0a0e27]" />
          </motion.div>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl mb-4 font-bold bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent"
        >
          {t('home.title')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-[#8b92b8]"
        >
          {t('home.subtitle')}
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Link
              to={section.path}
              className="block bg-white dark:bg-[#151933] rounded-lg p-6 shadow-lg border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 hover:shadow-[#00d4ff]/20 transition-all group"
            >
              <div className={`w-16 h-16 mb-4 bg-gradient-to-br ${colorClasses[section.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center shadow-lg shadow-[#00d4ff]/30 group-hover:scale-110 group-hover:shadow-[#00d4ff]/50 transition-all`}>
                <section.icon className="w-8 h-8 text-[#0a0e27]" />
              </div>
              
              <h2 className="text-xl mb-2 flex items-center justify-between text-gray-900 dark:text-[#e4e7f1]">
                <span>{section.title}</span>
                <ChevronRight className="w-5 h-5 text-[#00d4ff] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400">
                Explore my {section.title.toLowerCase()}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Years Experience', value: '5+' },
          { label: 'Projects', value: '20+' },
          { label: 'Certifications', value: '8+' },
          { label: 'Blog Posts', value: '30+' }
        ].map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white dark:bg-[#151933] rounded-lg border border-gray-200 dark:border-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all">
            <div className="text-3xl mb-2 font-bold bg-gradient-to-r from-[#00d4ff] to-[#0ea5e9] bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-[#8b92b8] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}