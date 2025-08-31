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
                
                {/* Navigation Section - Centered */}
                <div className="flex-1 flex justify-center">
                  <Navigation {...navigation} isFloating={isFloating} />
                </div>
                
                {/* Center Section - Icons and Actions */}
                <div className="flex-shrink-0 flex items-center space-x-4">
                  {/* Search Icon */}
                  <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  
                  {/* Account Icon */}
                  <a href="/account" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </a>
                  
                  {/* Cart Icon */}
                  <a href="/cart" className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.3 2.3c-.3.4-.6.7-1.1.7H5.1c-.5 0-.8-.3-1.1-.7L1.7 13m0 0L7 13m0 0l4.7-4.7c.3-.4.6-.7 1.1-.7H18.9c.5 0 .8.3 1.1.7L22.3 13m0 0L7 13m0 0l4.7-4.7c.3-.4.6-.7 1.1-.7H18.9c.5 0 .8.3 1.1.7L22.3 13" />
                    </svg>
                    {/* Cart Count Badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </a>
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
