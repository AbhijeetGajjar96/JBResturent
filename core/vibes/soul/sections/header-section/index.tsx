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

// Header Drawer Component (Mobile Menu)
const HeaderDrawer = () => (
  <div className="header-drawer small-hide medium-hide">
    <details id="Details-menu-drawer-container" className="menu-drawer-container">
      <summary className="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu" role="button" aria-expanded="false">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M1 1H17M1 9H17M1 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      <div id="menu-drawer" className="menu-drawer motion-reduce">
        <div className="menu-drawer__inner-container">
          <div className="menu-drawer__navigation-container">
            <nav className="menu-drawer__navigation">
              <ul className="menu-drawer__menu has-submenu list-menu">
                <li>
                  <a href="/" className="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/menu" className="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="/about" className="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </details>
  </div>
);

// Header Search Component
const HeaderSearch = ({ inputId }: { inputId: string }) => (
  <div className="header__search small-hide medium-hide">
    <details>
      <summary className="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-label="Search" aria-expanded="false">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17 17L13 13M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      <div className="search-modal modal__content gradient" role="dialog" aria-modal="true" aria-label="Search">
        <div className="modal__overlay"></div>
        <div className="search-modal__content" tabIndex={-1}>
          <form className="search-modal__form" action="/search" method="get" role="search">
            <div className="field">
              <input 
                className="search__input field__input" 
                id={inputId}
                name="q" 
                defaultValue="" 
                placeholder="Search" 
                role="combobox" 
                aria-expanded="false" 
                aria-owns="predictive-search-results" 
                aria-controls="predictive-search-results" 
                aria-haspopup="listbox" 
                aria-autocomplete="list" 
                aria-label="Search" 
                aria-labelledby="Search-In-Modal"
              />
              <label className="field__label" htmlFor={inputId}>Search</label>
              <button type="submit" className="search__button field__button" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17 17L13 13M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </details>
  </div>
);

// Header Dropdown Menu Component
const HeaderDropdownMenu = () => (
  <nav className="header__inline-menu">
    <ul className="list-menu list-menu--inline" role="list">
      <li>
        <a href="/" className="header__menu-item list-menu__item link link--text focus-inset">
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="/menu" className="header__menu-item list-menu__item link link--text focus-inset">
          <span>Menu</span>
        </a>
      </li>
      <li>
        <a href="/about" className="header__menu-item list-menu__item link link--text focus-inset">
          <span>About</span>
        </a>
      </li>
      <li>
        <a href="/contact" className="header__menu-item list-menu__item link link--text focus-inset">
          <span>Contact</span>
        </a>
      </li>
    </ul>
  </nav>
);

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [isFloating, setIsFloating] = useState(false);

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
        
        {/* Exact Shopify Header Structure */}
        <div data-sticky-type="always" className="section-header">
          <div className="header-wrapper color-scheme-1 gradient header-wrapper--border-bottom">
            <header className="header header--middle-center header--mobile-center page-width header--has-menu">
              {/* Header Drawer (Mobile Menu) */}
              <HeaderDrawer />
              
              {/* Header Search for top-center logo position */}
              <HeaderSearch inputId="Search-In-Modal-1" />
              
              {/* Logo - Top section (not middle-center) */}
              <div className="header__heading">
                <a href="/" className="header__heading-link link link--text focus-inset">
                  <div className="header__heading-logo-wrapper">
                    <span className="h2">JBResturent</span>
                  </div>
                </a>
              </div>
              
              {/* Navigation Menu - Dropdown style */}
              <HeaderDropdownMenu />
              
              {/* Logo - Middle section (middle-center position) */}
              <div className="header__heading">
                <a href="/" className="header__heading-link link link--text focus-inset">
                  <div className="header__heading-logo-wrapper">
                    <span className="h2">JBResturent</span>
                  </div>
                </a>
              </div>
              
              {/* Header Icons - Exact Shopify structure */}
              <div className="header__icons header__icons--localization header-localization">
                <div className="desktop-localization-wrapper">
                  {/* Country/Language selectors can be added here */}
                </div>
                
                {/* Header Search */}
                <HeaderSearch inputId="Search-In-Modal" />
                
                {/* Account */}
                <a href="/login" className="header__icon header__icon--account link focus-inset">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M16 17V15C16 13.9391 15.5786 12.9217 14.8284 12.1716C14.0783 11.4214 13.0609 11 12 11H8C6.93913 11 5.92172 11.4214 5.17157 12.1716C4.42143 12.9217 4 13.9391 4 15V17M12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="visually-hidden">Account</span>
                </a>
                
                {/* Cart */}
                <a href="/cart" className="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="visually-hidden">Cart</span>
                  {/* Cart count bubble */}
                  <div className="cart-count-bubble">
                    <span aria-hidden="true">0</span>
                  </div>
                </a>
              </div>
            </header>
          </div>
        </div>
        
        {/* Sticky Header JavaScript functionality */}
        <script dangerouslySetInnerHTML={{
          __html: `
            class StickyHeader extends HTMLElement {
              constructor() {
                super();
              }

              connectedCallback() {
                this.header = document.querySelector('.section-header');
                this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type') === 'always';
                this.headerBounds = {};
                this.currentScrollTop = 0;
                this.preventReveal = false;
                this.predictiveSearch = this.querySelector('predictive-search');

                this.setHeaderHeight();
                window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                if (this.headerIsAlwaysSticky) {
                  this.header.classList.add('shopify-section-header-sticky');
                }

                this.onScrollHandler = this.onScroll.bind(this);
                this.hideHeaderOnScrollUp = () => this.preventReveal = true;

                this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                window.addEventListener('scroll', this.onScrollHandler, false);

                this.createObserver();
              }

              setHeaderHeight() {
                document.documentElement.style.setProperty('--header-height', \`\${this.header.offsetHeight}px\`);
              }

              disconnectedCallback() {
                this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
                window.removeEventListener('scroll', this.onScrollHandler);
              }

              createObserver() {
                let observer = new IntersectionObserver((entries, observer) => {
                  this.headerBounds = entries[0].intersectionRect;
                  observer.disconnect();
                });

                observer.observe(this.header);
              }

              onScroll() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

                if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                  this.header.classList.add('scrolled-past-header');
                  if (this.preventHide) return;
                  requestAnimationFrame(this.hide.bind(this));
                } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
                  this.header.classList.add('scrolled-past-header');
                  if (!this.preventReveal) {
                    requestAnimationFrame(this.reveal.bind(this));
                  } else {
                    window.clearTimeout(this.isScrolling);

                    this.isScrolling = setTimeout(() => {
                      this.preventReveal = false;
                    }, 66);

                    requestAnimationFrame(this.hide.bind(this));
                  }
                } else if (scrollTop <= this.headerBounds.top) {
                  this.header.classList.remove('scrolled-past-header');
                  requestAnimationFrame(this.reset.bind(this));
                }

                this.currentScrollTop = scrollTop;
              }

              hide() {
                if (this.headerIsAlwaysSticky) return;
                this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
                this.closeMenuDisclosure();
                this.closeSearchModal();
              }

              reveal() {
                if (this.headerIsAlwaysSticky) return;
                this.header.classList.add('shopify-section-header-sticky', 'animate');
                this.header.classList.remove('shopify-section-header-hidden');
              }

              reset() {
                if (this.headerIsAlwaysSticky) return;
                this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
              }

              closeMenuDisclosure() {
                this.disclosures = this.disclosures || this.header.querySelectorAll('header-menu');
                this.disclosures.forEach(disclosure => disclosure.close());
              }

              closeSearchModal() {
                this.searchModal = this.searchModal || this.header.querySelector('details-modal');
                this.searchModal.close(false);
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
