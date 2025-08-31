'use client';

import { forwardRef, useEffect, useState } from 'react';
import Headroom from 'react-headroom';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';

interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
}

// WhatsApp floating button component
const WhatsAppButton = () => (
  <div className="whatsapp_fix active" aria-hidden="false">
    <a href="https://api.whatsapp.com/send?phone=919876543210&text=Hi, I would like to order from JBResturent">
      <img 
        src="https://cdn.shopify.com/s/files/1/0790/5889/5154/files/whatsapp_icon_22271a5f-abce-4891-ae16-688c59f72375.png?v=1689142834" 
        alt="WhatsApp"
      />
    </a>
  </div>
);

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [isFloating, setIsFloating] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      if (!bannerElement) return;

      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          setBannerHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(bannerElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, [bannerElement]);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsScrolled(scrollTop > 100);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div ref={ref}>
        {/* CSS imports for Shopify-style components */}
        <link rel="stylesheet" href="/styles/component-list-menu.css" />
        <link rel="stylesheet" href="/styles/component-search.css" />
        <link rel="stylesheet" href="/styles/component-menu-drawer.css" />
        <link rel="stylesheet" href="/styles/component-cart-notification.css" />
        <link rel="stylesheet" href="/styles/component-price.css" />
        <link rel="stylesheet" href="/styles/component-mega-menu.css" />
        <link rel="stylesheet" href="/styles/header-enhanced.css" />
        
        {/* WhatsApp Button */}
        <WhatsAppButton />
        
        {/* Banner */}
        {banner && <Banner ref={setBannerElement} {...banner} />}
        
        {/* Sticky Header with Shopify-style behavior */}
        <Headroom
          onUnfix={() => setIsFloating(false)}
          onUnpin={() => setIsFloating(true)}
          pinStart={bannerHeight}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease',
            transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)',
          }}
        >
          <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header header--middle-center page-width">
              {/* Logo - Center positioned */}
              <div className="header__heading">
                <a href="/" className="header__heading-link link link--text focus-inset">
                  <div className="header__heading-logo-wrapper">
                    <span className="h2">JBResturent</span>
                  </div>
                </a>
              </div>
              
              {/* Navigation Menu */}
              <div className="header__menu">
                <Navigation {...navigation} isFloating={isFloating} />
              </div>
              
              {/* Header Icons */}
              <div className="header__icons">
                {/* Search */}
                <div className="header__icon header__icon--search">
                  <button className="search-toggle" aria-label="Search">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19 19L13 13M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                {/* Account */}
                <a href="/login" className="header__icon header__icon--account link focus-inset">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 17V15C16 13.9391 15.5786 12.9217 14.8284 12.1716C14.0783 11.4214 13.0609 11 12 11H8C6.93913 11 5.92172 11.4214 5.17157 12.1716C4.42143 12.9217 4 13.9391 4 15V17M12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="visually-hidden">Account</span>
                </a>
                
                {/* Cart */}
                <a href="/cart" className="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="visually-hidden">Cart</span>
                  {/* Cart count bubble */}
                  <div className="cart-count-bubble">
                    <span aria-hidden="true">0</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Headroom>
        
        {/* Sticky Header JavaScript functionality */}
        <script dangerouslySetInnerHTML={{
          __html: `
            class StickyHeader extends HTMLElement {
              constructor() {
                super();
              }

              connectedCallback() {
                this.header = document.querySelector('.header-wrapper');
                this.currentScrollTop = 0;
                this.preventReveal = false;
                
                this.onScrollHandler = this.onScroll.bind(this);
                window.addEventListener('scroll', this.onScrollHandler, false);
              }

              disconnectedCallback() {
                window.removeEventListener('scroll', this.onScrollHandler);
              }

              onScroll() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > this.currentScrollTop && scrollTop > 100) {
                  this.header.classList.add('scrolled-past-header');
                  if (!this.preventReveal) {
                    requestAnimationFrame(this.hide.bind(this));
                  }
                } else if (scrollTop < this.currentScrollTop && scrollTop > 100) {
                  this.header.classList.add('scrolled-past-header');
                  if (!this.preventReveal) {
                    requestAnimationFrame(this.reveal.bind(this));
                  }
                } else if (scrollTop <= 100) {
                  this.header.classList.remove('scrolled-past-header');
                  requestAnimationFrame(this.reset.bind(this));
                }

                this.currentScrollTop = scrollTop;
              }

              hide() {
                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
              }

              reveal() {
                this.header.classList.add('shopify-section-header-sticky', 'animate');
                this.header.classList.remove('shopify-section-header-hidden');
              }

              reset() {
                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
              }
            }

            if (!customElements.get('sticky-header')) {
              customElements.define('sticky-header', StickyHeader);
            }
          `
        }} />
      </div>
    );
  },
);

HeaderSection.displayName = 'HeaderSection';
