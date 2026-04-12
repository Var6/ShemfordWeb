import React from 'react';
import Link from 'next/link';
import { ThemeSwitch } from '../theme-switch';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../icons';
import { siteConfig } from '@/config/site';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-yellow-400 text-white pt-10 pb-8 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Map Section */}
        <div className="w-full h-44 md:h-full overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/20">
          <iframe
            className="w-full h-full rounded-3xl"
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=SHEMFORD%20Futuristic%20School%20Patna&t=&z=13&ie=UTF8&iwloc=B&output=embed"
            loading="lazy"
          />
        </div>

        {/* Address Section */}
        <div className="md:pr-4">
          <h3 className="text-lg font-semibold mb-3">Our Address</h3>
          <p>SHEMFORD Futuristic School Patna</p>
          <p>Jaganpura Road, Udaini, Patna, Bihar 804453</p>
          <p>India</p>
        </div>

        {/* Links Section */}
        <div className="md:pr-4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-slate-100 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-slate-100 transition">About Us</Link></li>
            <li><Link href="/admissions" className="hover:text-slate-100 transition">Admissions</Link></li>
            <li><Link href="/academics" className="hover:text-slate-100 transition">Academics</Link></li>
            <li><Link href="/contact" className="hover:text-slate-100 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p>Email: info@shemfordpatna.com</p>
          <p>Phone: +91 9431201060</p>
          <p>Admissions: admissions@shemfordpatna.com</p>
        </div>
      </div>

      {/* Copyright & Socials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 py-5 mt-8 border-t border-white/20">
        <p className="text-center md:text-left text-sm text-white/95">
          &copy; {new Date().getFullYear()} SHEMFORD Futuristic School Patna. All Rights Reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link aria-label="Facebook" href={siteConfig.links.facebook}>
            <FacebookIcon className="text-white hover:text-slate-100" />
          </Link>
          <Link aria-label="Instagram" href={siteConfig.links.instagram}>
            <InstagramIcon className="text-white hover:text-slate-100" />
          </Link>
          <Link aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-white hover:text-slate-100" />
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
