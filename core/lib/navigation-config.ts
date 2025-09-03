// Navigation configuration for Jay Bharat Restaurant
// This can be easily managed and is Makeswift-safe

export interface NavigationLink {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

export const jayBharatNavigationConfig: NavigationLink[] = [
  {
    label: 'Restaurant',
    href: '/restaurant',
  },
  {
    label: 'Store',
    href: '/store',
    children: [
      {
        label: 'Snacks',
        href: '/store/snacks',
        children: [
          { label: 'Chips', href: '/store/snacks/chips' },
          { label: 'Namkeen', href: '/store/snacks/namkeen' },
          { label: 'Biscuits', href: '/store/snacks/biscuits' },
        ],
      },
      {
        label: 'Sweets',
        href: '/store/sweets',
        children: [
          { label: 'Mithai', href: '/store/sweets/mithai' },
          { label: 'Chocolates', href: '/store/sweets/chocolates' },
          { label: 'Dry Fruits', href: '/store/sweets/dry-fruits' },
        ],
      },
    ],
  },
  {
    label: 'Catering',
    href: '/catering',
  },
  {
    label: 'Our Legacy',
    href: '/about-us',
  },
];

// Helper function to get navigation links
export const getJayBharatNavigationLinks = (): NavigationLink[] => {
  return jayBharatNavigationConfig;
};
