import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <Image
        src="/icon.png"
        alt="Shemford Futuristic School"
        width={72}
        height={72}
        className="mb-8"
      />

      {/* 404 display */}
      <div className="relative mb-6">
        <p className="text-[120px] md:text-[160px] font-black leading-none
          bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Search className="w-16 h-16 text-orange-200 dark:text-orange-900/40" />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        Page Not Found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-10 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        Let&apos;s get you back on track.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3
            bg-orange-600 hover:bg-orange-700 text-white font-semibold
            rounded-xl transition-colors shadow-sm text-sm"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3
            border-2 border-orange-200 dark:border-orange-900/40
            text-orange-600 dark:text-orange-400 font-semibold
            rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/10
            transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Contact Us
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-14 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Popular Pages
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: 'About',      href: '/about'     },
            { label: 'Admission',  href: '/admission' },
            { label: 'Facilities', href: '/Facilities'},
            { label: 'Toppers',    href: '/Toppers'   },
            { label: 'Events',     href: '/Events'    },
            { label: 'Contact',    href: '/contact'   },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400
                bg-gray-100 dark:bg-gray-800 rounded-lg
                hover:bg-orange-100 hover:text-orange-700
                dark:hover:bg-orange-900/20 dark:hover:text-orange-400
                transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
