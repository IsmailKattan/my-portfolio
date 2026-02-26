import { useTranslation } from 'react-i18next';
import { X, Award, Calendar, ExternalLink, Building, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Certificate } from '../../services/api';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const { t } = useTranslation();

  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto z-50 p-4"
          >
            <div
              className="bg-white dark:bg-[#151933] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#00d4ff]/20 overflow-hidden"
              lang={certificate.content_language}
              dir={certificate.content_language === 'ar' ? 'rtl' : 'ltr'}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-[#1e2443] to-[#151933] p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#00d4ff]/20 rounded-xl">
                    <Award className="w-10 h-10 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{certificate.name}</h2>
                    <p className="text-[#8b92b8] text-sm">{t('certificates.credential')}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Issuer */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
                    <Building className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-[#8b92b8]">{t('certificates.issuer')}</p>
                    <p className="font-medium text-gray-900 dark:text-[#e4e7f1]">{certificate.issuer}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-[#8b92b8]">{t('certificates.date')}</p>
                    <p className="font-medium text-gray-900 dark:text-[#e4e7f1]">
                      {new Date(certificate.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Sub-certificates count if any */}
                {certificate.sub_certificates && certificate.sub_certificates.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
                      <FileText className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-[#8b92b8]">{t('certificates.includes')}</p>
                      <p className="font-medium text-gray-900 dark:text-[#e4e7f1]">
                        {certificate.sub_certificates.length} {t('certificates.subCertificates')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Credential Link */}
                {certificate.credential_url && (
                  <a
                    href={certificate.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:bg-[#0ea5e9] transition-colors font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{t('certificates.viewCredential')}</span>
                  </a>
                )}

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[#00d4ff]/30 text-gray-700 dark:text-[#8b92b8] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e2443] transition-colors font-medium"
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
