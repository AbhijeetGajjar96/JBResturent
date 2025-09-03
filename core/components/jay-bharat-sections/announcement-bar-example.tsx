// Example usage of AnnouncementBar component in BigCommerce Catalyst
// This shows how to implement the Shopify announcement bar as a React component

import { AnnouncementBar } from './announcement-bar';

// Example 1: Simple single announcement
export function SimpleAnnouncementExample() {
  return (
    <AnnouncementBar
      announcements={[
        {
          id: '1',
          text: 'Free delivery on orders over $50! Order now and taste authentic Indian cuisine.',
          link: '/menu'
        }
      ]}
      colorScheme="scheme-4" // Golden brown theme
      showLineSeparator={true}
    />
  );
}

// Example 2: Multiple rotating announcements with social links
export function FullFeaturedAnnouncementExample() {
  const announcements = [
    {
      id: '1',
      text: '🎉 Grand Opening Special - 20% off on all orders this week!',
      link: '/menu'
    },
    {
      id: '2', 
      text: '🍛 Try our new Biryani varieties - Now available for delivery',
      link: '/menu/biryani'
    },
    {
      id: '3',
      text: '📞 Call us at (555) 123-4567 for reservations and catering',
      link: 'tel:+15551234567'
    }
  ];

  const socialLinks = {
    facebook: 'https://facebook.com/jaybharatrestaurant',
    instagram: 'https://instagram.com/jaybharatrestaurant',
    youtube: 'https://youtube.com/@jaybharatrestaurant'
  };

  return (
    <AnnouncementBar
      announcements={announcements}
      colorScheme="scheme-fffc6450-2dd2-4635-b662-cacd9bd74234" // Golden yellow
      showLineSeparator={true}
      showSocial={true}
      socialLinks={socialLinks}
      autoRotate={true}
      changeSlideSpeed={7} // 7 seconds per slide
    />
  );
}

// Example 3: Announcement bar with localization
export function LocalizedAnnouncementExample() {
  return (
    <AnnouncementBar
      announcements={[
        {
          id: '1',
          text: 'Welcome to Jay Bharat Restaurant - Authentic Indian Cuisine',
          link: '/about'
        }
      ]}
      colorScheme="scheme-3" // Rich brown
      showLineSeparator={true}
      enableCountrySelector={true}
      enableLanguageSelector={true}
    />
  );
}

// Example 4: Integration with BigCommerce layout
export function JayBharatLayoutWithAnnouncement({ children }: { children: React.ReactNode }) {
  // This could be fetched from BigCommerce admin or CMS
  const currentPromotions = [
    {
      id: '1',
      text: 'Limited Time: Buy 2 Main Courses, Get 1 Appetizer Free!',
      link: '/promotions'
    },
    {
      id: '2',
      text: 'New Menu Items Available - Explore our expanded vegetarian selection',
      link: '/menu/vegetarian'
    }
  ];

  const restaurantSocials = {
    facebook: '#',
    instagram: '#',
    youtube: '#'
  };

  return (
    <>
      {/* Announcement Bar at the very top */}
      <AnnouncementBar
        announcements={currentPromotions}
        colorScheme="scheme-4"
        showLineSeparator={true}
        showSocial={true}
        socialLinks={restaurantSocials}
        autoRotate={true}
        changeSlideSpeed={8}
      />
      
      {/* Rest of the layout */}
      <div className="layout-content">
        {children}
      </div>
    </>
  );
}

// Example 5: Dynamic announcement bar based on time/events
export function DynamicAnnouncementExample() {
  // This could be based on current time, events, or BigCommerce data
  const getTimeBasedAnnouncements = () => {
    const hour = new Date().getHours();
    
    if (hour >= 11 && hour <= 14) {
      return [
        {
          id: 'lunch',
          text: '🍽️ Lunch Special: Complete meal with rice, curry, and naan for just $12.99',
          link: '/menu/lunch-special'
        }
      ];
    } else if (hour >= 17 && hour <= 22) {
      return [
        {
          id: 'dinner',
          text: '🌙 Dinner Time: Order online for 15% off pickup orders',
          link: '/order-online'
        }
      ];
    } else {
      return [
        {
          id: 'general',
          text: 'Jay Bharat Restaurant - Open Daily 11 AM to 10 PM',
          link: '/hours'
        }
      ];
    }
  };

  return (
    <AnnouncementBar
      announcements={getTimeBasedAnnouncements()}
      colorScheme="scheme-1"
      showLineSeparator={true}
    />
  );
}

// Example 6: Event-driven announcements (holidays, special events)
export function EventAnnouncementExample() {
  const specialEvents = [
    {
      id: 'diwali',
      text: '🪔 Diwali Special Menu - Traditional sweets and festive dishes available!',
      link: '/events/diwali'
    },
    {
      id: 'catering',
      text: '🎊 Planning an event? Ask about our catering services for parties and corporate events',
      link: '/catering'
    }
  ];

  return (
    <AnnouncementBar
      announcements={specialEvents}
      colorScheme="scheme-5" // Terracotta for festive feel
      showLineSeparator={true}
      autoRotate={true}
      changeSlideSpeed={10}
    />
  );
}
