import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, Certificate } from '../../services/api';

export function CertificatesStrip() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await api.getCertificates();
        setCertificates(data);
      } catch (err) {
        console.error('Failed to fetch certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const flattenCertificates = (certs: Certificate[]): Certificate[] => {
    const result: Certificate[] = [];
    for (const cert of certs) {
      result.push(cert);
      if (cert.sub_certificates) {
        result.push(...flattenCertificates(cert.sub_certificates));
      }
    }
    return result;
  };

  const allCertificates = flattenCertificates(certificates);

  if (loading || allCertificates.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-[#151933] to-[#0a0e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Certifications & Credentials
            </h2>
            <p className="text-gray-400">
              Industry-recognized certifications validating expertise
            </p>
          </div>
          <Link
            to="/certificates"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#00d4ff] hover:underline"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#151933] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0e27] to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-72 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#00d4ff]/30 transition-all group"
                lang={cert.content_language}
                dir={cert.content_language === 'ar' ? 'rtl' : 'ltr'}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0ea5e9] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#0a0e27]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm mb-1 truncate group-hover:text-[#00d4ff] transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-[#00d4ff] text-xs">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(cert.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
