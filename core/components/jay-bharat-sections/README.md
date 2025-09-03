# Jay Bharat Restaurant - Shopify Sections for BigCommerce Catalyst

This directory contains React components that implement Shopify Liquid sections for use in BigCommerce Catalyst, maintaining the Jay Bharat Restaurant theme design and functionality.

## 🎯 Overview

These components are **non-destructive** implementations that:
- ✅ Don't affect existing BigCommerce Catalyst code
- ✅ Maintain Shopify theme design and functionality
- ✅ Use React/Next.js best practices
- ✅ Are fully typed with TypeScript
- ✅ Include responsive design and accessibility features

## 📦 Available Components

### 1. **AnnouncementBar** 🆕
- **Source**: `announcement-bar.liquid`
- **Purpose**: Top-of-site announcements with social links and localization
- **Features**: Single/multiple announcements, auto-rotation, social icons, responsive design
- **Usage**: Site-wide promotions, store updates, social media integration

### 2. **WhatsAppWidget**
- **Source**: `header.liquid` (lines 14-65)
- **Purpose**: Fixed WhatsApp contact button
- **Features**: Floating widget, custom phone number and message
- **Usage**: Add to any page for customer contact

### 3. **ImageBanner** 
- **Source**: `image-banner.liquid`
- **Purpose**: Hero banners with overlay text and CTAs
- **Features**: Responsive images, multiple content positions, overlay opacity
- **Usage**: Homepage heroes, page headers, promotional banners

### 4. **MultiColumn**
- **Source**: `multicolumn.liquid`
- **Purpose**: Grid layouts with images, text, and links
- **Features**: Responsive columns, image sizing, hover effects
- **Usage**: Feature sections, service highlights, product showcases

### 5. **RichText**
- **Source**: `rich-text.liquid`
- **Purpose**: Flexible content blocks with headings, text, and buttons
- **Features**: Multiple content types, text alignment, animations
- **Usage**: About sections, content pages, announcements

### 6. **Newsletter**
- **Source**: `newsletter.liquid`
- **Purpose**: Email subscription forms
- **Features**: Form validation, success/error states, customizable styling
- **Usage**: Footer signup, promotional sections, customer engagement

## 🚀 Quick Start

```tsx
import { 
  AnnouncementBar,
  WhatsAppWidget, 
  ImageBanner, 
  MultiColumn, 
  RichText, 
  Newsletter 
} from '@/components/jay-bharat-sections';

export function HomePage() {
  return (
    <>
      {/* Site-wide announcement at the top */}
      <AnnouncementBar
        announcements={[
          {
            id: '1',
            text: '🎉 Grand Opening Week - 20% off all orders!',
            link: '/menu'
          }
        ]}
        colorScheme="scheme-4"
        showSocial={true}
        socialLinks={{
          facebook: '#',
          instagram: '#'
        }}
      />
      
      <main>
        <ImageBanner
          title="Welcome to Jay Bharat Restaurant"
          image="/images/hero.jpg"
          buttonText="Order Now"
          buttonLink="/menu"
        />
        
        <MultiColumn
          title="Our Specialties"
          items={[
            {
              id: '1',
              title: 'Fresh Ingredients',
              text: 'Locally sourced, authentic flavors',
              image: '/images/ingredients.jpg'
            }
          ]}
        />
        
        <WhatsAppWidget />
      </main>
    </>
  );
}
```

## 🎨 Styling Integration

All components use the existing Jay Bharat color scheme:

```css
/* Components automatically use these CSS variables */
--jay-bharat-cream: #e5e6d6
--jay-bharat-dark-brown: #37241e  
--jay-bharat-rich-brown: #7e5039
--jay-bharat-golden-brown: #bc9256
--jay-bharat-terracotta: #984d38
--jay-bharat-golden-yellow: #edc56d
--jay-bharat-white: #ffffff
--jay-bharat-black: #121212
```

## 📱 Responsive Design

All components include:
- Mobile-first responsive breakpoints
- Touch-friendly interactive elements
- Optimized images with Next.js Image component
- Accessible markup with ARIA labels

## 🔧 Customization

### Color Schemes
Components support all Shopify theme color schemes:
- `scheme-1` (default cream/brown)
- `scheme-2` (white/black) 
- `scheme-3` (rich brown)
- `scheme-4` (golden brown)
- `scheme-5` (terracotta)
- `scheme-fffc6450-2dd2-4635-b662-cacd9bd74234` (golden yellow)

### Content Positioning
Banner and text components support:
- `top-left`, `top-center`, `top-right`
- `middle-left`, `middle-center`, `middle-right`
- `bottom-left`, `bottom-center`, `bottom-right`

### Column Layouts
MultiColumn supports 1-6 columns on desktop and 1-2 on mobile.

## 🔌 BigCommerce Integration

### Using with BigCommerce Data

```tsx
// Example: Fetch data from BigCommerce and pass to components
export async function getServerSideProps() {
  const bannerData = await fetchBannerContent();
  const features = await fetchFeatures();
  
  return {
    props: { bannerData, features }
  };
}

export function ProductPage({ bannerData, features }) {
  return (
    <main>
      <ImageBanner {...bannerData} />
      <MultiColumn items={features} />
    </main>
  );
}
```

### Newsletter Integration

```tsx
<Newsletter
  onSubmit={async (email) => {
    // Integrate with BigCommerce customer API
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error('Subscription failed');
    }
  }}
/>
```

## 🧩 Extending Components

### Adding New Section Types

1. Analyze the Shopify Liquid file
2. Create a React component following the same pattern
3. Add TypeScript interfaces for props
4. Include responsive styling with styled-jsx
5. Add to the main index.ts export

### Custom Styling

```tsx
<ImageBanner
  className="custom-banner"
  style={{
    '--custom-overlay-color': 'rgba(126, 80, 57, 0.6)'
  }}
/>
```

## 📋 Migration Status

### ✅ Completed Sections
- [x] **AnnouncementBar** - Site-wide announcements with social links and auto-rotation
- [x] **WhatsApp Widget** - Customer contact integration
- [x] **Image Banner** - Hero sections and promotional banners  
- [x] **MultiColumn** - Feature grids and content blocks
- [x] **Rich Text** - Flexible content sections
- [x] **Newsletter** - Email subscription forms

### 🚧 Available for Implementation
- [ ] **Featured Product** - Product showcases
- [ ] **Featured Collection** - Category highlights  
- [ ] **Slideshow** - Image carousels
- [ ] **Video** - Video content sections
- [ ] **Testimonials** - Customer reviews (ys_testimonial.liquid)
- [ ] **Gallery** - Image galleries (ys_custom_gallery.liquid)
- [ ] **Contact Form** - Customer inquiry forms
- [ ] **Collage** - Mixed media layouts
- [ ] **Announcement Bar** - Site-wide notifications

## 🤝 Contributing

When adding new sections:

1. Follow the existing component patterns
2. Include full TypeScript typing
3. Add responsive design considerations
4. Include accessibility features
5. Document props and usage examples
6. Test with Jay Bharat color scheme

## 📞 Support

For questions about implementing these components or migrating additional Shopify sections, refer to the example usage file or extend the existing patterns.

---

**Note**: These components are designed to work alongside your existing BigCommerce Catalyst setup without any conflicts or modifications to the core codebase.
