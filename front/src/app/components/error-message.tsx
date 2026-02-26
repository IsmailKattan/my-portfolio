import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message = 'Failed to load data', onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <div className="flex items-center gap-2 text-red-500 mb-4">
        <AlertCircle className="w-6 h-6" />
        <span className="font-medium">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded-lg hover:bg-[#00d4ff]/80 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
