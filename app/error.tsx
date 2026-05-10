'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-4">

      <Image
        src="/icon.png"
        alt="Shemford Futuristic School"
        width={64}
        height={64}
        className="mb-8 opacity-80"
      />

      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl
        flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-orange-600" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        Something Went Wrong
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-10 leading-relaxed">
        An unexpected error occurred. You can try again or return to the homepage.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3
            bg-orange-600 hover:bg-orange-700 text-white font-semibold
            rounded-xl transition-colors shadow-sm text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3
            border-2 border-orange-200 dark:border-orange-900/40
            text-orange-600 dark:text-orange-400 font-semibold
            rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/10
            transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

    </div>
  );
}
