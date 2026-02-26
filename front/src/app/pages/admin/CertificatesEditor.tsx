import { useEffect, useState } from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { api, Certificate } from '../../../services/api';
import { adminCertificates } from '../../../services/adminApi';

export function CertificatesEditor() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    credential_url: '',
    parent_id: null as number | null,
    content_language: 'en',
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

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

  const handleSubmit = async () => {
    try {
      await adminCertificates.create(formData);
      setMessage('Certificate created');
      setFormData({ name: '', issuer: '', date: '', credential_url: '', parent_id: null, content_language: 'en' });
      fetchCertificates();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to create certificate');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this certificate? This will also delete all sub-certificates.')) return;
    try {
      await adminCertificates.delete(id);
      fetchCertificates();
    } catch (err) {
      setMessage('Failed to delete');
    }
  };

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

  const renderCertificateTree = (certs: Certificate[], level = 0) => {
    return certs.map((cert) => (
      <div key={cert.id} className={`${level > 0 ? 'ml-8 mt-3' : 'mt-4'}`}>
        <div className="flex items-start justify-between p-4 bg-white dark:bg-[#151933] rounded-lg border border-gray-200 dark:border-[#00d4ff]/10">
          <div className="flex items-start gap-3">
            <Award className={`w-5 h-5 mt-0.5 ${level === 0 ? 'text-yellow-500' : level === 1 ? 'text-blue-500' : 'text-green-500'}`} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{cert.name}</h3>
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#1e2443] text-gray-500 dark:text-gray-400 text-xs rounded font-mono">
                  {cert.content_language}
                </span>
              </div>
              <p className="text-sm text-[#00d4ff]">{cert.issuer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</p>
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Credential
                </a>
              )}
            </div>
          </div>
          <button
            onClick={() => handleDelete(cert.id)}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        {cert.sub_certificates && cert.sub_certificates.length > 0 && (
          <div className="mt-2">
            {renderCertificateTree(cert.sub_certificates, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#00d4ff] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Certificates Editor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your certifications</p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white dark:bg-[#151933] rounded-xl p-6 border border-gray-200 dark:border-[#00d4ff]/10 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Certificate</h2>
        <div className="space-y-4">
          <input
            placeholder="Certificate Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <input
            placeholder="Issuer"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <input
            placeholder="Credential URL (optional)"
            value={formData.credential_url}
            onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content Language</label>
            <select
              value={formData.content_language}
              onChange={(e) => setFormData({ ...formData, content_language: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
            >
              <option value="en">English (en)</option>
              <option value="ar">Arabic (ar)</option>
              <option value="tr">Turkish (tr)</option>
            </select>
          </div>
          <select
            value={formData.parent_id || ''}
            onChange={(e) => setFormData({ ...formData, parent_id: e.target.value ? Number(e.target.value) : null })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white"
          >
            <option value="">No Parent (Top Level)</option>
            {allCertificates.map((cert) => (
              <option key={cert.id} value={cert.id}>
                {cert.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </button>
        </div>
      </div>

      {/* List */}
      <div>
        {certificates.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No certificates yet</p>
        ) : (
          renderCertificateTree(certificates)
        )}
      </div>
    </div>
  );
}
