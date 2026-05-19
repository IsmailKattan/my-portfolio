import { useState } from 'react';
import { KeyRound, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { adminAuth } from '../../../services/adminApi';

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await adminAuth.changePassword(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('400')) {
        setError('Current password is incorrect.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Change Password</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Update your admin account password.</p>
      </div>

      <div className="bg-white dark:bg-[#151933] rounded-xl border border-gray-200 dark:border-[#00d4ff]/10 p-6">
        {success ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <p className="text-gray-900 dark:text-white font-medium">Password updated successfully!</p>
            <button
              onClick={() => setSuccess(false)}
              className="text-sm text-[#00d4ff] hover:underline"
            >
              Change again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {newPassword && newPassword.length < 8 && (
                <p className="mt-1 text-xs text-red-500">Minimum 8 characters</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2443] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00d4ff] text-[#0a0e27] font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
