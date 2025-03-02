export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Shemford Futuristic School',
  description: 'One Stop Solution for all you Academic Need',
  navItems: [
    {
      label: 'Messages',
      href: '/Message',
    },
    {
      label: 'Books',
      href: '/books',
    },
    {
      label: 'Accessories',
      href: '/accessories',
    },
    {
      label: 'About Us',
      href: '/About',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    facebook: 'https://www.facebook.com/shemfordschoolpatna',
    twitter: 'https://twitter.com/shemford_patna?lang=en',
    instagram: 'https://instagram.com/shemfordschoolpatna',
    youtube: 'https://www.youtube.com/channel/UCVsGbdY1le2-XPoCq2z6Ccg',
    telegram: 'https://t.me/shemfordschoolpatna',
  },
};
