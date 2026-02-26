import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Award, ExternalLink, Calendar, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Certificate } from '../../services/api';
import { CertificateModal } from './certificate-modal';

interface CertificateNodeProps {
  certificate: Certificate;
  level?: number;
  onViewDetails?: (cert: Certificate) => void;
}

function CertificateNode({ certificate, level = 0, onViewDetails }: CertificateNodeProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasSubCertificates = certificate.sub_certificates && certificate.sub_certificates.length > 0;

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(certificate);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-8 mt-4' : 'mt-4'}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
        lang={certificate.content_language}
        dir={certificate.content_language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Award className={`w-6 h-6 ${level === 0 ? 'text-yellow-500' : level === 1 ? 'text-blue-500' : 'text-green-500'}`} />
              <h3 className="text-lg">{certificate.name}</h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <span className="font-semibold">{t('certificates.issuer')}:</span>
                <span>{certificate.issuer}</span>
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(certificate.date).toLocaleDateString()}</span>
              </p>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleViewDetails}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:bg-[#0ea5e9] transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>{t('certificates.viewDetails')}</span>
              </button>
              {certificate.credential_url && (
                <a
                  href={certificate.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border-2 border-[#00d4ff] text-gray-900 dark:text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/10 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('certificates.verify')}</span>
                </a>
              )}
            </div>
          </div>
          
          {hasSubCertificates && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {hasSubCertificates && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {certificate.sub_certificates!.map((subCert) => (
              <CertificateNode key={subCert.id} certificate={subCert} level={level + 1} onViewDetails={onViewDetails} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CertificateTreeProps {
  certificates: Certificate[];
}

export function CertificateTree({ certificates }: CertificateTreeProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  return (
    <>
      <div className="space-y-4">
        {certificates.map((certificate) => (
          <CertificateNode 
            key={certificate.id} 
            certificate={certificate} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      <CertificateModal 
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
