// Example usage of Jay Bharat Restaurant sections in BigCommerce Catalyst
// This shows how to implement the Shopify sections as React components

import { 
  WhatsAppWidget, 
  ImageBanner, 
  MultiColumn, 
  RichText, 
  Newsletter 
} from './index';

export function JayBharatHomepage() {
  // Example data that would come from BigCommerce CMS or admin
  const multiColumnItems = [
    {
      id: '1',
      title: 'Fresh Ingredients',
      text: 'We use only the finest and freshest ingredients sourced locally to create authentic Indian flavors.',
      image: '/images/fresh-ingredients.jpg',
      imageWidth: 'full' as const,
      linkLabel: 'Learn More',
      linkUrl: '/about-ingredients'
    },
    {
      id: '2', 
      title: 'Traditional Recipes',
      text: 'Our recipes have been passed down through generations, preserving the authentic taste of Indian cuisine.',
      image: '/images/traditional-cooking.jpg',
      imageWidth: 'full' as const,
      linkLabel: 'View Menu',
      linkUrl: '/menu'
    },
    {
      id: '3',
      title: 'Expert Chefs',
      text: 'Our experienced chefs bring decades of expertise in creating the perfect balance of spices and flavors.',
      image: '/images/expert-chefs.jpg', 
      imageWidth: 'full' as const,
      linkLabel: 'Meet Our Team',
      linkUrl: '/team'
    }
  ];

  const richTextBlocks = [
    {
      id: '1',
      type: 'heading' as const,
      heading: 'Welcome to Jay Bharat Restaurant',
      headingSize: 'h1' as const
    },
    {
      id: '2',
      type: 'text' as const,
      text: '<p>Experience the authentic flavors of India at Jay Bharat Restaurant. Our commitment to quality ingredients, traditional cooking methods, and exceptional service makes us your premier destination for Indian cuisine.</p>'
    },
    {
      id: '3',
      type: 'button' as const,
      buttonLabel: 'View Our Menu',
      buttonLink: '/menu',
      buttonStyle: 'primary' as const
    }
  ];

  return (
    <main>
      {/* Hero Banner Section */}
      <ImageBanner
        id="hero-banner"
        image="/images/jay-bharat-hero.jpg"
        mobileImage="/images/jay-bharat-hero-mobile.jpg"
        title="Authentic Indian Cuisine"
        subtitle="Experience the Rich Flavors of India"
        description="Welcome to Jay Bharat Restaurant, where tradition meets taste in every dish we serve."
        buttonText="Order Now"
        buttonLink="/menu"
        secondaryButtonText="View Menu"
        secondaryButtonLink="/menu"
        textAlignment="center"
        contentPosition="middle-center"
        height="large"
        colorScheme="scheme-1"
        overlayOpacity={0.4}
      />

      {/* Rich Text About Section */}
      <RichText
        id="about-section"
        blocks={richTextBlocks}
        colorScheme="scheme-1"
        contentAlignment="center"
        desktopContentPosition="center"
        paddingTop={80}
        paddingBottom={80}
      />

      {/* Multi-Column Features */}
      <MultiColumn
        id="features-section"
        title="Why Choose Jay Bharat?"
        items={multiColumnItems}
        columnsDesktop={3}
        columnsMobile={1}
        colorScheme="scheme-2"
        backgroundStyle="none"
        textAlignment="center"
        imageWidth="full"
        paddingTop={80}
        paddingBottom={80}
      />

      {/* Newsletter Signup */}
      <Newsletter
        id="newsletter-section"
        title="Stay Connected"
        subtitle="Subscribe to receive special offers, new menu updates, and exclusive deals from Jay Bharat Restaurant."
        placeholder="Enter your email address"
        buttonText="Subscribe Now"
        colorScheme="scheme-fffc6450-2dd2-4635-b662-cacd9bd74234"
        fullWidth={false}
        paddingTop={60}
        paddingBottom={60}
        onSubmit={async (email) => {
          // Implement newsletter signup logic here
          console.log('Newsletter signup:', email);
          // Could integrate with BigCommerce customer API or third-party service
        }}
      />

      {/* WhatsApp Widget (Fixed Position) */}
      <WhatsAppWidget
        phoneNumber="919876543210"
        message="Hi, I would like to order from Jay Bharat Restaurant"
        storeName="Jay Bharat Restaurant"
      />
    </main>
  );
}

// Example of how to use in a product page
export function JayBharatProductPage() {
  return (
    <main>
      {/* Product-specific banner */}
      <ImageBanner
        id="product-banner"
        image="/images/menu-hero.jpg"
        title="Our Delicious Menu"
        description="Discover our wide range of authentic Indian dishes, from traditional curries to tandoor specialties."
        buttonText="Browse Menu"
        buttonLink="#menu"
        height="medium"
        colorScheme="scheme-3"
        textAlignment="center"
        contentPosition="middle-center"
      />

      {/* Product features */}
      <MultiColumn
        id="menu-features"
        title="What Makes Our Food Special"
        items={[
          {
            id: '1',
            title: 'Spice Blends',
            text: 'Our signature spice blends are crafted in-house using traditional methods.',
            image: '/images/spices.jpg'
          },
          {
            id: '2',
            title: 'Fresh Daily',
            text: 'All our breads and curries are prepared fresh daily in our kitchen.',
            image: '/images/fresh-cooking.jpg'
          }
        ]}
        columnsDesktop={2}
        columnsMobile={1}
        colorScheme="scheme-1"
        textAlignment="center"
      />

      <WhatsAppWidget />
    </main>
  );
}

// Example of how to integrate with BigCommerce data
export function JayBharatWithBigCommerceData({ 
  bannerData, 
  featuresData, 
  newsletterSettings 
}: {
  bannerData: any;
  featuresData: any;
  newsletterSettings: any;
}) {
  return (
    <main>
      <ImageBanner
        {...bannerData}
        colorScheme="scheme-1"
      />
      
      <MultiColumn
        {...featuresData}
        colorScheme="scheme-2"
      />
      
      <Newsletter
        {...newsletterSettings}
        colorScheme="scheme-fffc6450-2dd2-4635-b662-cacd9bd74234"
      />
      
      <WhatsAppWidget />
    </main>
  );
}
