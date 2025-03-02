import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const navMenuItems = [
    { label: 'Message', href: '/Messages' },
    { label: 'Blog', href: '/blog' },
    { label: 'CBSE', href: '/CBSE' },
    { label: 'Notification', href: '/Notification' },
    { label: 'About Us', href: '/about' },
  ];

  const links = {
    facebook: 'https://www.facebook.com/shemfordschoolpatna',
    twitter: 'https://twitter.com/shemford_patna?lang=en',
    instagram: 'https://instagram.com/shemfordschoolpatna',
    youtube: 'https://www.youtube.com/channel/UCVsGbdY1le2-XPoCq2z6Ccg',
    telegram: 'https://t.me/shemfordschoolpatna',
  };

  return (
    <footer className="bg-tansparent text-black dark:text-white pt-8 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {navMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-gray-200 transition duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-6 text-black">
              <a
                href={links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition duration-200"
              >
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a
                href={links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition duration-200"
              >
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition duration-200"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a
                href={links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition duration-200"
              >
                <i className="fab fa-youtube fa-2x"></i>
              </a>
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition duration-200"
              >
                <i className="fab fa-telegram fa-2x"></i>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>Phone: +91 123 456 7890</p>
            <p>Email: info@shemfordschool.com</p>
            <p>Address: Shemford School, Patna, Bihar, India</p>
          </div>

          {/* Subscribe Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe for Updates</h3>
            <form action="#" method="POST" className="flex items-center space-x-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-orange-400 text-center pt-4">
        <p>&copy; 2025 Shemford School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
