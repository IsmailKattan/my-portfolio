import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Briefcase, Calendar, Building, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api, Experience } from '../../services/api';
import { PageLoading } from '../components/loading';
import { ErrorMessage } from '../components/error-message';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-[#151933] rounded-xl shadow-lg border border-gray-200 dark:border-[#00d4ff]/10 overflow-hidden"
      lang={experience.content_language}
      dir={experience.content_language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-[#1e2443]/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-[#e4e7f1]">
                {experience.position}
              </h2>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-[#8b92b8]">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{experience.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{experience.duration}</span>
              </div>
            </div>
          </div>

          <div className="p-2 hover:bg-gray-100 dark:hover:bg-[#1e2443] rounded-lg transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-[#8b92b8]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-[#8b92b8]" />
            )}
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-[#00d4ff]/10">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-900 dark:text-[#e4e7f1]">
                <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full" />
                {t('experiences.responsibilities')}
              </h3>
              <ul className="space-y-3">
                {experience.responsibilities.map((responsibility, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 w-2 h-2 bg-[#00d4ff]/50 rounded-full flex-shrink-0" />
                    <span className="text-gray-600 dark:text-[#8b92b8] leading-relaxed">
                      {responsibility}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function ExperiencesPage() {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getExperiences();
      setExperiences(data);
    } catch (err) {
      setError('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  if (loading) return <PageLoading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchExperiences} />;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-4">{t('experiences.title')}</h1>
      </motion.div>

      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.id} experience={experience} index={index} />
        ))}
      </div>
    </div>
  );
}
