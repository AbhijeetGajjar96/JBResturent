'use client';

import { AnnouncementBar } from './announcement-bar';

// This component wraps the AnnouncementBar specifically for the header
// It can be configured via environment variables or BigCommerce settings

interface HeaderAnnouncementBarProps {
  // Optional props to override defaults
  announcements?: Array<{
    id: string;
    text: string;
    link?: string;
  }>;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  colorScheme?: string;
  autoRotate?: boolean;
  changeSlideSpeed?: number;
  showSocial?: boolean;
  enabled?: boolean;
}

export function HeaderAnnouncementBar({
  announcements,
  socialLinks,
  colorScheme = 'scheme-4', // Jay Bharat golden brown
  autoRotate = true,
  changeSlideSpeed = 7,
  showSocial = true,
  enabled = true
}: HeaderAnnouncementBarProps = {}) {
  // Don't render if disabled
  if (!enabled) {
    return null;
  }

  // Default Jay Bharat Restaurant announcements
  const defaultAnnouncements = [
    {
      id: 'grand-opening',
      text: '🎉 Grand Opening Special - 20% off all orders this week! Use code: WELCOME20',
      link: '/menu'
    },
    {
      id: 'free-delivery',
      text: '🚚 Free delivery on orders over $35 within 5 miles of our restaurant',
      link: '/delivery'
    },
    {
      id: 'mobile-app',
      text: '📱 Download our app for exclusive deals and faster ordering experience',
      link: '/app'
    },
    {
      id: 'hours',
      text: '🕐 Open Daily: 11 AM - 10 PM | Call (555) 123-4567 for reservations',
      link: 'tel:+15551234567'
    }
  ];

  // Default Jay Bharat social links
  const defaultSocialLinks = {
    facebook: 'https://facebook.com/jaybharatrestaurant',
    instagram: 'https://instagram.com/jaybharatrestaurant',
    youtube: 'https://youtube.com/@jaybharatrestaurant'
  };

  // Use provided data or defaults
  const finalAnnouncements = announcements || defaultAnnouncements;
  const finalSocialLinks = socialLinks || defaultSocialLinks;

  return (
    <AnnouncementBar
      announcements={finalAnnouncements}
      colorScheme={colorScheme}
      showLineSeparator={true}
      showSocial={showSocial}
      socialLinks={finalSocialLinks}
      autoRotate={autoRotate}
      changeSlideSpeed={changeSlideSpeed}
    />
  );
}

// Environment-based configuration
export function EnvConfiguredHeaderAnnouncementBar() {
  // Check if announcement bar should be shown
  const isEnabled = process.env.NEXT_PUBLIC_SHOW_ANNOUNCEMENT_BAR !== 'false';
  
  if (!isEnabled) {
    return null;
  }

  // Get announcements from environment variables
  const customAnnouncements = [];
  
  // Check for up to 5 custom announcements
  for (let i = 1; i <= 5; i++) {
    const text = process.env[`NEXT_PUBLIC_ANNOUNCEMENT_${i}_TEXT`];
    const link = process.env[`NEXT_PUBLIC_ANNOUNCEMENT_${i}_LINK`];
    
    if (text) {
      customAnnouncements.push({
        id: `env-${i}`,
        text,
        link: link || undefined
      });
    }
  }

  // Get social links from environment
  const envSocialLinks = {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL,
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL
  };

  // Filter out empty social links
  const filteredSocialLinks = Object.fromEntries(
    Object.entries(envSocialLinks).filter(([_, value]) => value)
  );

  return (
    <HeaderAnnouncementBar
      announcements={customAnnouncements.length > 0 ? customAnnouncements : undefined}
      socialLinks={Object.keys(filteredSocialLinks).length > 0 ? filteredSocialLinks : undefined}
      colorScheme={process.env.NEXT_PUBLIC_ANNOUNCEMENT_COLOR_SCHEME || 'scheme-4'}
      autoRotate={process.env.NEXT_PUBLIC_ANNOUNCEMENT_AUTO_ROTATE !== 'false'}
      changeSlideSpeed={parseInt(process.env.NEXT_PUBLIC_ANNOUNCEMENT_SLIDE_SPEED || '7')}
      showSocial={process.env.NEXT_PUBLIC_SHOW_SOCIAL_LINKS !== 'false'}
      enabled={isEnabled}
    />
  );
}

// Time-based announcements (different messages for different times of day)
export function TimeBasedHeaderAnnouncementBar() {
  const getTimeBasedAnnouncements = () => {
    const hour = new Date().getHours();
    
    if (hour >= 11 && hour <= 14) {
      // Lunch time (11 AM - 2 PM)
      return [
        {
          id: 'lunch-special',
          text: '🍽️ Lunch Special: Complete meal with rice, curry, and naan for just $12.99',
          link: '/menu/lunch-special'
        },
        {
          id: 'quick-lunch',
          text: '⚡ Quick lunch options available - Perfect for your lunch break!',
          link: '/menu/quick-lunch'
        }
      ];
    } else if (hour >= 17 && hour <= 22) {
      // Dinner time (5 PM - 10 PM)
      return [
        {
          id: 'dinner-special',
          text: '🌙 Dinner Special: Order online for 15% off pickup orders',
          link: '/order-online'
        },
        {
          id: 'family-dinner',
          text: '👨‍👩‍👧‍👦 Family dinner packages available - Feed the whole family!',
          link: '/menu/family-packages'
        }
      ];
    } else {
      // General hours
      return [
        {
          id: 'general-hours',
          text: '🏪 Jay Bharat Restaurant - Open Daily 11 AM to 10 PM',
          link: '/hours'
        },
        {
          id: 'online-ordering',
          text: '📱 Order online 24/7 for pickup during business hours',
          link: '/order'
        }
      ];
    }
  };

  return (
    <HeaderAnnouncementBar
      announcements={getTimeBasedAnnouncements()}
      colorScheme="scheme-1" // Cream background for general info
      autoRotate={true}
      changeSlideSpeed={10} // Slower rotation for time-based content
    />
  );
}

// BigCommerce integration example
export function BigCommerceHeaderAnnouncementBar({ storeSettings }: { storeSettings?: any }) {
  // This would integrate with BigCommerce store settings
  const bigCommerceAnnouncements = [];
  
  // Add store-wide announcements from BigCommerce admin
  if (storeSettings?.storeAnnouncement) {
    bigCommerceAnnouncements.push({
      id: 'store-announcement',
      text: storeSettings.storeAnnouncement,
      link: storeSettings.storeAnnouncementLink || '/'
    });
  }
  
  // Add promotional announcements
  if (storeSettings?.promotionalMessage) {
    bigCommerceAnnouncements.push({
      id: 'promotional',
      text: storeSettings.promotionalMessage,
      link: storeSettings.promotionalLink || '/promotions'
    });
  }
  
  // Fallback to Jay Bharat defaults if no BigCommerce settings
  if (bigCommerceAnnouncements.length === 0) {
    return <HeaderAnnouncementBar />;
  }
  
  return (
    <HeaderAnnouncementBar
      announcements={bigCommerceAnnouncements}
      colorScheme={storeSettings?.announcementColorScheme || 'scheme-4'}
      autoRotate={bigCommerceAnnouncements.length > 1}
    />
  );
}
