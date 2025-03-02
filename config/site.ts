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
      label: 'Blogs',
      href: '/blog',
    },
    {
      label: 'About',
      href: '/about',
    },
  ],
  navMenuItems: [
    {
      label: 'Message',
      href: '/Messages',
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
      label: 'About',
      href: '/about',
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
