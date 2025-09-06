import React from 'react';
import Link from 'next/link';
import { ThemeSwitch } from '../theme-switch';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../icons';
import { siteConfig } from '@/config/site';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-yellow-400 text-white pt-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Map Section */}
        <div className="w-full h-40 md:h-full">
          <iframe
            className="w-full h-full rounded-md"
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=SHEMFORD%20Futuristic%20School%20Patna&t=&z=13&ie=UTF8&iwloc=B&output=embed"
            loading="lazy"
          ></iframe>
        </div>

        {/* Address Section */}
        <div className="md:border-r md:border-white pr-4">
          <h3 className="text-lg font-semibold mb-2">Our Address</h3>
          <p>SHEMFORD Futuristic School Patna</p>
          <p>Jaganpura Road, Udaini, Patna, Bihar 804453</p>
          <p>India</p>
        </div>

        {/* Links Section */}
        <div className="md:border-r md:border-white pr-4">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/admissions" className="hover:underline">Admissions</Link></li>
            <li><Link href="/academics" className="hover:underline">Academics</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: info@shemfordpatna.com</p>
          <p>Phone: +91 9431201060</p>
          <p>For Admissions: admissions@shemfordpatna.com</p>
        </div>
      </div>

      {/* Copyright & Socials */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4 mt-6 border-t border-white">
        <p className="text-center md:text-left w-full md:w-auto mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} SHEMFORD Futuristic School Patna. All Rights Reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link aria-label="Facebook" href={siteConfig.links.facebook}>
            <FacebookIcon className="text-white hover:text-gray-200" />
          </Link>
          <Link aria-label="Instagram" href={siteConfig.links.instagram}>
            <InstagramIcon className="text-white hover:text-gray-200" />
          </Link>
          <Link aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-white hover:text-gray-200" />
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
