// Example: How to integrate AnnouncementBar into BigCommerce Catalyst layout
// This shows different integration patterns without modifying core files

import { AnnouncementBar } from './announcement-bar';

// Method 1: Create a wrapper component for the announcement bar
export function JayBharatAnnouncementBarWrapper() {
  // This data could come from:
  // - BigCommerce admin settings
  // - Environment variables
  // - External CMS
  // - Database
  const announcementData = {
    announcements: [
      {
        id: '1',
        text: '🎉 Grand Opening Week - 20% off all orders! Use code: WELCOME20',
        link: '/menu'
      },
      {
        id: '2',
        text: '🚚 Free delivery on orders over $35 within 5 miles',
        link: '/delivery'
      },
      {
        id: '3',
        text: '📱 Download our app for exclusive deals and faster ordering',
        link: '/app'
      }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/jaybharatrestaurant',
      instagram: 'https://instagram.com/jaybharatrestaurant',
      youtube: 'https://youtube.com/@jaybharatrestaurant'
    }
  };

  return (
    <AnnouncementBar
      announcements={announcementData.announcements}
      colorScheme="scheme-4" // Jay Bharat golden brown
      showLineSeparator={true}
      showSocial={true}
      socialLinks={announcementData.socialLinks}
      autoRotate={true}
      changeSlideSpeed={6}
    />
  );
}

// Method 2: Create a page-specific announcement bar
export function HomePageAnnouncementBar() {
  return (
    <AnnouncementBar
      announcements={[
        {
          id: 'home-welcome',
          text: 'Welcome to Jay Bharat Restaurant - Authentic Indian Flavors Since 1995',
          link: '/about'
        }
      ]}
      colorScheme="scheme-1"
      showLineSeparator={true}
    />
  );
}

export function MenuPageAnnouncementBar() {
  return (
    <AnnouncementBar
      announcements={[
        {
          id: 'menu-special',
          text: 'Chef\'s Special Today: Butter Chicken with Garlic Naan - Limited Time!',
          link: '/menu/specials'
        }
      ]}
      colorScheme="scheme-3"
      showLineSeparator={true}
    />
  );
}

// Method 3: Dynamic announcement based on BigCommerce data
interface BigCommerceAnnouncementProps {
  storeSettings?: any;
  currentPage?: string;
  userLocation?: string;
}

export function DynamicBigCommerceAnnouncement({
  storeSettings,
  currentPage,
  userLocation
}: BigCommerceAnnouncementProps) {
  // Generate announcements based on BigCommerce data
  const getContextualAnnouncements = () => {
    const announcements = [];

    // Store-wide announcements from BigCommerce settings
    if (storeSettings?.announcement) {
      announcements.push({
        id: 'store-announcement',
        text: storeSettings.announcement,
        link: storeSettings.announcementLink || '/'
      });
    }

    // Page-specific announcements
    if (currentPage === 'checkout') {
      announcements.push({
        id: 'checkout-security',
        text: '🔒 Secure checkout powered by BigCommerce - Your data is protected',
        link: '/security'
      });
    }

    // Location-based announcements
    if (userLocation && userLocation.includes('New York')) {
      announcements.push({
        id: 'local-delivery',
        text: '🚴‍♂️ Same-day delivery available in NYC - Order before 3 PM',
        link: '/delivery-info'
      });
    }

    // Default fallback
    if (announcements.length === 0) {
      announcements.push({
        id: 'default',
        text: 'Experience authentic Indian cuisine at Jay Bharat Restaurant',
        link: '/menu'
      });
    }

    return announcements;
  };

  return (
    <AnnouncementBar
      announcements={getContextualAnnouncements()}
      colorScheme="scheme-fffc6450-2dd2-4635-b662-cacd9bd74234"
      showLineSeparator={true}
      showSocial={true}
      socialLinks={{
        facebook: '#',
        instagram: '#'
      }}
    />
  );
}

// Method 4: Integration instructions for layout.tsx
export const LAYOUT_INTEGRATION_INSTRUCTIONS = `
To integrate the AnnouncementBar into your BigCommerce Catalyst layout:

1. Import the component in your layout.tsx:
   import { JayBharatAnnouncementBarWrapper } from '~/components/jay-bharat-sections/layout-integration-example';

2. Add it at the very top of your body content, before {children}:
   <body className="flex min-h-screen flex-col">
     <JayBharatAnnouncementBarWrapper />
     <NextIntlClientProvider>
       <NuqsAdapter>
         {/* existing content */}
         {children}
       </NuqsAdapter>
     </NextIntlClientProvider>
     {/* rest of body */}
   </body>

3. For page-specific announcements, create a wrapper component:
   // In your page component
   export default function HomePage() {
     return (
       <>
         <HomePageAnnouncementBar />
         {/* page content */}
       </>
     );
   }

4. For BigCommerce integration, fetch data in your layout or page:
   // In layout.tsx or page component
   const storeSettings = await fetchStoreSettings();
   
   return (
     <DynamicBigCommerceAnnouncement 
       storeSettings={storeSettings}
       currentPage="home"
     />
   );
`;

// Method 5: Conditional announcement bar based on environment
export function ConditionalAnnouncementBar() {
  // Only show in production or when specifically enabled
  const shouldShowAnnouncement = process.env.SHOW_ANNOUNCEMENT === 'true' || 
                                 process.env.NODE_ENV === 'production';

  if (!shouldShowAnnouncement) {
    return null;
  }

  return (
    <AnnouncementBar
      announcements={[
        {
          id: 'production',
          text: 'Now accepting online orders for pickup and delivery!',
          link: '/order'
        }
      ]}
      colorScheme="scheme-4"
      showLineSeparator={true}
    />
  );
}

// Method 6: A/B testing announcement bar
export function ABTestAnnouncementBar() {
  // Simple A/B test based on user ID or random selection
  const getVariant = () => {
    const random = Math.random();
    return random < 0.5 ? 'A' : 'B';
  };

  const variant = getVariant();

  const variantA = [
    {
      id: 'variant-a',
      text: '🌟 Try our award-winning Biryani - Voted Best in City!',
      link: '/menu/biryani'
    }
  ];

  const variantB = [
    {
      id: 'variant-b', 
      text: '🔥 Spice up your day with our authentic curry selection',
      link: '/menu/curries'
    }
  ];

  return (
    <AnnouncementBar
      announcements={variant === 'A' ? variantA : variantB}
      colorScheme="scheme-5"
      showLineSeparator={true}
    />
  );
}

// Method 7: Announcement bar with admin toggle
interface AdminToggleAnnouncementProps {
  isEnabled?: boolean;
  adminMessage?: string;
  adminLink?: string;
}

export function AdminToggleAnnouncement({
  isEnabled = true,
  adminMessage = 'Welcome to Jay Bharat Restaurant',
  adminLink = '/'
}: AdminToggleAnnouncementProps) {
  if (!isEnabled) {
    return null;
  }

  return (
    <AnnouncementBar
      announcements={[
        {
          id: 'admin-controlled',
          text: adminMessage,
          link: adminLink
        }
      ]}
      colorScheme="scheme-1"
      showLineSeparator={true}
    />
  );
}

// Usage example for the admin toggle:
export function AdminControlledLayout({ adminSettings }: { adminSettings: any }) {
  return (
    <>
      <AdminToggleAnnouncement
        isEnabled={adminSettings?.showAnnouncement}
        adminMessage={adminSettings?.announcementText}
        adminLink={adminSettings?.announcementLink}
      />
      {/* rest of layout */}
    </>
  );
}
