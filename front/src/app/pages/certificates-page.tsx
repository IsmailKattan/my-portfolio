import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { CertificateTree } from '../components/certificate-tree';
import { motion } from 'motion/react';
import { api, Certificate } from '../../services/api';
import { PageLoading } from '../components/loading';
import { ErrorMessage } from '../components/error-message';

export function CertificatesPage() {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCertificates();
      setCertificates(data);
    } catch (err) {
      setError('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  if (loading) return <PageLoading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCertificates} />;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl mb-4">{t('certificates.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Click on certificates with nested items to expand and view related certifications.
        </p>
      </motion.div>

      <CertificateTree certificates={certificates} />
    </div>
  );
}
