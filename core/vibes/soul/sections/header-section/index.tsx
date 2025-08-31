'use client';

import { forwardRef, useEffect, useState } from 'react';
import Headroom from 'react-headroom';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';

interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
}

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [isFloating, setIsFloating] = useState(false);

    useEffect(() => {
      if (!bannerElement) return;

      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const entry of entries) {
          setBannerHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(bannerElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, [bannerElement]);

    return (
      <div ref={ref}>
        {banner && <Banner ref={setBannerElement} {...banner} />}
        
        {/* Main Header Container */}
        <Headroom
          onUnfix={() => setIsFloating(false)}
          onUnpin={() => setIsFloating(true)}
          pinStart={bannerHeight}
        >
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                
                {/* Logo Section */}
                <div className="flex-shrink-0">
                  <a href="/" className="flex items-center">
                    <div className="text-2xl font-bold text-gray-900">
                      JBResturent
                    </div>
                  </a>
                </div>
                
                {/* Navigation Section */}
                <div className="flex-1 flex justify-center">
                  <Navigation {...navigation} isFloating={isFloating} />
                </div>
                
                {/* Right Section - Additional elements can go here */}
                <div className="flex-shrink-0">
                  {/* Placeholder for additional header elements */}
                </div>
                
              </div>
            </div>
          </header>
        </Headroom>
      </div>
    );
  },
);

HeaderSection.displayName = 'HeaderSection';
