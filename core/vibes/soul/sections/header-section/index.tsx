'use client';

import { forwardRef, useEffect, useState } from 'react';

import { Streamable } from '@/vibes/soul/lib/streamable';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';


interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
  logo?: Streamable<string | { src: string; alt: string } | null>;
  logoHref?: string;
  logoLabel?: string;
  cartCount?: number;
  searchPlaceholder?: string;
}

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (!bannerElement) return;

      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const entry of entries) {
          // Handle banner height if needed
          // console.log('Banner resized:', entry.contentRect);
        }
      });

      resizeObserver.observe(bannerElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, [bannerElement]);

    return (
      <div className="w-full sticky top-0 z-50" ref={ref}>
        {/* Top Bar with Restaurant Info */}
        <div 
          className="bg-[#7e5039] text-white py-1 px-4 text-center text-sm"
          style={{ backgroundColor: '#7e5039' }} // From scheme-3
        >
          <p>🍽️ Authentic Indian Cuisine • Free Delivery on Orders Above ₹500 • Call: +91 98765 43210</p>
        </div>
        
        {banner && <Banner ref={setBannerElement} {...banner} />}
        <Navigation {...navigation} />
      </div>
    );
  },
);

HeaderSection.displayName = 'HeaderSection';
