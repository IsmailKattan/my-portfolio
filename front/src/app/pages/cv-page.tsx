import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, GraduationCap, Code } from 'lucide-react';
import { motion } from 'motion/react';
import { api, CVData } from '../../services/api';
import { PageLoading } from '../components/loading';
import { ErrorMessage } from '../components/error-message';

export function CVPage() {
  const { t } = useTranslation();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCV = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCV();
      setCvData(data);
    } catch (err) {
      setError('Failed to load CV data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCV();
  }, []);

  if (loading) return <PageLoading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCV} />;
  if (!cvData) return <ErrorMessage message="No CV data available" />;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-4">{t('cv.title')}</h1>
      </motion.div>

      {/* Personal Info */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <span>{t('cv.personalInfo')}</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('cv.email')}</p>
              <p>{cvData.personal_info?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('cv.phone')}</p>
              <p>{cvData.personal_info?.phone || '-'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('cv.location')}</p>
              <p>{cvData.personal_info?.location || '-'}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
      >
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          <span>{t('cv.education')}</span>
        </h2>
        
        <div className="space-y-4">
          {cvData.education?.map((edu, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg">{edu.degree}</h3>
              <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl mb-4 flex items-center gap-2">
          <Code className="w-6 h-6" />
          <span>{t('cv.skills')}</span>
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {cvData.skills?.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md"
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
