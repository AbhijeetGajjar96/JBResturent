# Jay Bharat Makeswift Header Component

A React header component converted from Shopify Liquid, designed to be compatible with Makeswift while maintaining all the original functionality and styling.

## Features

✅ **Converted from Shopify Liquid**: Based on the original `header.liquid` file from Jay Bharat Restaurant theme
✅ **Makeswift Ready**: Designed to work with Makeswift's visual builder (registration code included)
✅ **Tailwind CSS**: Modern utility-first styling approach
✅ **Sticky Header**: React hooks implementation for sticky behavior on scroll
✅ **Mobile Responsive**: Mobile menu with drawer functionality
✅ **Search Modal**: Interactive search overlay
✅ **WhatsApp Integration**: Floating WhatsApp widget
✅ **TypeScript**: Fully typed with proper interfaces
✅ **Accessible**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Usage

```tsx
import { MakeswitHeader } from '~/components/jay-bharat-sections/makeswift-header';

export default function HomePage() {
  return (
    <div>
      <MakeswitHeader />
      {/* Your page content */}
    </div>
  );
}
```

### With Custom Props

```tsx
import { MakeswitHeader } from '~/components/jay-bharat-sections/makeswift-header';

const customMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { 
    label: 'Services', 
    href: '/services',
    children: [
      { label: 'Dine In', href: '/dine-in' },
      { label: 'Takeout', href: '/takeout' },
      { label: 'Catering', href: '/catering' }
    ]
  }
];

export default function HomePage() {
  return (
    <div>
      <MakeswitHeader
        logoText="My Restaurant"
        backgroundColor="#f39c12"
        textColor="#2c3e50"
        menuItems={customMenuItems}
        cartCount={3}
        whatsappNumber="1234567890"
        stickyHeader={true}
      />
      {/* Your page content */}
    </div>
  );
}
```

## Props

### Logo Configuration
- `logo?: { src: string; alt: string }` - Logo image object
- `logoText?: string` - Text to display if no logo image (default: "Jay Bharat Restaurant")
- `logoPosition?: 'left' | 'center' | 'right'` - Logo alignment (default: 'center')
- `logoWidth?: number` - Logo width in pixels (default: 150)

### Menu Configuration
- `menuItems?: MenuItem[]` - Array of navigation menu items
- `menuType?: 'dropdown' | 'mega' | 'drawer'` - Menu display type (default: 'dropdown')

### Header Behavior
- `stickyHeader?: boolean` - Enable sticky header on scroll (default: true)
- `showBorder?: boolean` - Show bottom border (default: true)

### Styling
- `backgroundColor?: string` - Header background color (default: '#edc56d')
- `textColor?: string` - Text color (default: '#37241e')
- `hoverColor?: string` - Hover state color (default: '#bc9256')
- `borderColor?: string` - Border color (default: '#7e5039')

### Features
- `enableSearch?: boolean` - Enable search functionality (default: true)
- `enableAccount?: boolean` - Show account icon (default: true)
- `enableCart?: boolean` - Show cart icon (default: true)
- `cartCount?: number` - Number to display in cart badge (default: 0)

### Layout
- `paddingTop?: number` - Top padding in pixels (default: 12)
- `paddingBottom?: number` - Bottom padding in pixels (default: 12)

### WhatsApp Integration
- `whatsappNumber?: string` - WhatsApp number for contact (default: '919876543210')
- `whatsappMessage?: string` - Pre-filled message text
- `showWhatsApp?: boolean` - Show WhatsApp widget (default: true)

## MenuItem Interface

```typescript
interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}
```

## Makeswift Registration

To use this component in Makeswift, you'll need to register it. Here's how:

### 1. Install Makeswift Runtime

```bash
npm install @makeswift/runtime
```

### 2. Create Registration File

```typescript
// makeswift/register-components.ts
import { registerComponent } from '@makeswift/runtime/react';
import { 
  Text, 
  Image, 
  Link, 
  List,
  Checkbox,
  Number,
  Select,
  Color 
} from '@makeswift/runtime/controls';
import { MakeswitHeader } from '~/components/jay-bharat-sections/makeswift-header';

registerComponent(MakeswitHeader, {
  type: 'jay-bharat-header',
  label: 'Jay Bharat Header',
  props: {
    // Logo props
    logo: Image({ label: 'Logo Image' }),
    logoText: Text({ label: 'Logo Text', defaultValue: 'Jay Bharat Restaurant' }),
    logoPosition: Select({
      label: 'Logo Position',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ],
      defaultValue: 'center'
    }),
    logoWidth: Number({ label: 'Logo Width (px)', defaultValue: 150, min: 50, max: 400 }),

    // Menu props
    menuItems: List({
      label: 'Menu Items',
      type: {
        label: Text({ label: 'Label' }),
        href: Link({ label: 'Link' }),
        children: List({
          label: 'Sub Items',
          type: {
            label: Text({ label: 'Label' }),
            href: Link({ label: 'Link' })
          }
        })
      },
      getItemLabel: (item) => item.label || 'Menu Item'
    }),
    
    // Header behavior
    stickyHeader: Checkbox({ label: 'Sticky Header', defaultValue: true }),
    showBorder: Checkbox({ label: 'Show Bottom Border', defaultValue: true }),
    
    // Colors
    backgroundColor: Color({ label: 'Background Color', defaultValue: '#edc56d' }),
    textColor: Color({ label: 'Text Color', defaultValue: '#37241e' }),
    hoverColor: Color({ label: 'Hover Color', defaultValue: '#bc9256' }),
    borderColor: Color({ label: 'Border Color', defaultValue: '#7e5039' }),
    
    // Features
    enableSearch: Checkbox({ label: 'Enable Search', defaultValue: true }),
    enableAccount: Checkbox({ label: 'Enable Account', defaultValue: true }),
    enableCart: Checkbox({ label: 'Enable Cart', defaultValue: true }),
    cartCount: Number({ label: 'Cart Count', defaultValue: 0, min: 0 }),
    
    // Layout
    paddingTop: Number({ label: 'Padding Top (px)', defaultValue: 12, min: 0, max: 50 }),
    paddingBottom: Number({ label: 'Padding Bottom (px)', defaultValue: 12, min: 0, max: 50 }),
    
    // WhatsApp
    whatsappNumber: Text({ label: 'WhatsApp Number', defaultValue: '919876543210' }),
    whatsappMessage: Text({ 
      label: 'WhatsApp Message', 
      defaultValue: 'Hi, I would like to order from Jay Bharat Restaurant' 
    }),
    showWhatsApp: Checkbox({ label: 'Show WhatsApp Widget', defaultValue: true }),
  }
});
```

### 3. Import in Makeswift Configuration

```typescript
// pages/_app.tsx or your Makeswift setup file
import '../makeswift/register-components';
```

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Props**: Use the color and styling props
2. **CSS Variables**: Override the CSS custom properties
3. **Tailwind**: Add custom classes via className prop (if extended)
4. **Global CSS**: Target specific elements with CSS selectors

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports responsive design breakpoints

## Migration from Shopify

This component replicates the functionality from:
- `sections/header.liquid`
- `snippets/header-search.liquid`
- `snippets/header-drawer.liquid`
- `snippets/header-mega-menu.liquid`
- `snippets/header-dropdown-menu.liquid`
- `assets/component-list-menu.css`
- `assets/component-search.css`
- `assets/component-cart-notification.css`

All Liquid variables have been converted to React props, and Shopify-specific functionality has been adapted for BigCommerce/general e-commerce use.
