// Jay Bharat Restaurant - Shopify Section Components for BigCommerce Catalyst
// These components are React implementations of Shopify Liquid sections

export { WhatsAppWidget } from './whatsapp-widget';
export { ImageBanner } from './image-banner';
export { MultiColumn } from './multicolumn';
export { RichText } from './rich-text';
export { Newsletter } from './newsletter';
export { AnnouncementBar } from './announcement-bar';
export { 
  HeaderAnnouncementBar, 
  EnvConfiguredHeaderAnnouncementBar,
  TimeBasedHeaderAnnouncementBar,
  BigCommerceHeaderAnnouncementBar 
} from './header-announcement-bar';
export { EnhancedHeader } from './enhanced-header';
export { HeaderSearch } from './header-search';
export { HeaderDrawer } from './header-drawer';
export { MakeswitHeader } from './makeswift-header';

// Type definitions for common props
export interface SectionProps {
  id?: string;
  className?: string;
  colorScheme?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

export interface ContentBlock {
  id: string;
  type: string;
  settings?: Record<string, any>;
}

// Common section settings that match Shopify theme structure
export const SECTION_DEFAULTS = {
  colorSchemes: [
    'scheme-1',
    'scheme-2', 
    'scheme-3',
    'scheme-4',
    'scheme-5',
    'scheme-fffc6450-2dd2-4635-b662-cacd9bd74234'
  ],
  textAlignments: ['left', 'center', 'right'],
  contentPositions: [
    'top-left', 'top-center', 'top-right',
    'middle-left', 'middle-center', 'middle-right', 
    'bottom-left', 'bottom-center', 'bottom-right'
  ],
  headingSizes: ['h0', 'h1', 'h2', 'hxl'],
  bannerHeights: ['small', 'medium', 'large', 'adapt'],
  columnCounts: [1, 2, 3, 4, 5, 6],
  backgroundStyles: ['primary', 'secondary', 'none']
} as const;
