'use client';

import { forwardRef, useEffect, useState } from 'react';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';
import { Logo } from '@/vibes/soul/primitives/logo';
import { Streamable } from '@/vibes/soul/lib/streamable';

interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
  logo?: Streamable<string | { src: string; alt: string } | null>;
  logoHref?: string;
  logoLabel?: string;
  cartCount?: number;
  searchPlaceholder?: string;
}

// WhatsApp button removed for local development

// Header Drawer Component (Mobile Menu)
const HeaderDrawer = ({ links }: { links: Array<{ label: string; href: string }> }) => (
  <header-drawer className="header-drawer small-hide medium-hide">
    <details id="Details-menu-drawer-container" className="menu-drawer-container">
      <summary className="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu" role="button" aria-expanded="false">
        Menu
      </summary>
      <div id="menu-drawer" className="menu-drawer motion-reduce">
        <div className="menu-drawer__inner-container">
          <div className="menu-drawer__navigation-container">
            <nav className="menu-drawer__navigation">
              <ul className="menu-drawer__menu has-submenu list-menu">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="menu-drawer__menu-item list-menu__item link link--text focus-inset">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </details>
  </header-drawer>
);

// Header Search Component
const HeaderSearch = ({ inputId, searchPlaceholder }: { inputId: string; searchPlaceholder?: string }) => (
  <div className="header__search small-hide medium-hide">
    <details>
      <summary className="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle" aria-label="Search" aria-expanded="false">
        Search
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
                placeholder={searchPlaceholder || "Search"} 
                role="combobox" 
                aria-expanded="false" 
                aria-label="Search" 
              />
              <label className="field__label" htmlFor={inputId}>Search</label>
              <button type="submit" className="search__button field__button" aria-label="Search">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </details>
  </div>
);

// Header Dropdown Menu Component
const HeaderDropdownMenu = ({ links }: { links: Array<{ label: string; href: string }> }) => (
  <nav className="header__inline-menu">
    <ul className="list-menu list-menu--inline" role="list">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="header__menu-item list-menu__item link link--text focus-inset">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner, logo, logoHref = '/', logoLabel = 'Home', cartCount, searchPlaceholder }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [links, setLinks] = useState<Array<{ label: string; href: string }>>([]);

    // Ensure links is always an array to prevent rendering errors
    const safeLinks = Array.isArray(links) ? links : [];
    
    // Ensure all props have safe defaults
    const safeLogoHref = logoHref || '/';
    const safeLogoLabel = logoLabel || 'Home';
    const safeCartCount = typeof cartCount === 'number' ? cartCount : 0;
    const safeSearchPlaceholder = searchPlaceholder || 'Search';

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

    // Extract links from navigation when it changes
    useEffect(() => {
      if (navigation?.links) {
        // Convert navigation links to the format we need
        const extractLinks = async () => {
          try {
            const navLinks = await navigation.links;
            if (Array.isArray(navLinks)) {
              setLinks(navLinks);
            } else {
              setLinks([]);
            }
          } catch (error) {
            console.warn('Could not extract navigation links:', error);
            setLinks([]);
          }
        };
        extractLinks();
      } else {
        setLinks([]);
      }
    }, [navigation]);

    return (
      <div ref={ref}>
        {/* Banner */}
        {banner && <Banner ref={setBannerElement} {...banner} />}
        
        {/* Shopify Header with proper CSS classes */}
        <div className="section-header">
          <div className="header-wrapper header-wrapper--border-bottom">
            <header className="header header--middle-center page-width header--has-menu">
              {/* Header Drawer (Mobile Menu) */}
              <HeaderDrawer links={safeLinks} />
              
              {/* Header Search for top-center logo position */}
              <HeaderSearch inputId="Search-In-Modal-1" searchPlaceholder={safeSearchPlaceholder} />
              
              {/* Navigation Menu - Dropdown style */}
              <HeaderDropdownMenu links={safeLinks} />
              
              {/* Logo - Middle section (middle-center position) */}
              <div className="header__heading">
                <a href={safeLogoHref} className="header__heading-link link link--text focus-inset">
                  <div className="header__heading-logo-wrapper">
                    <span className="h2">{safeLogoLabel}</span>
                  </div>
                </a>
              </div>
              
              {/* Header Icons - Exact Shopify structure */}
              <div className="header__icons">
                <div className="desktop-localization-wrapper">
                  {/* Country/Language selectors can be added here */}
                </div>
                
                {/* Header Search */}
                <HeaderSearch inputId="Search-In-Modal" searchPlaceholder={safeSearchPlaceholder} />
                
                {/* Account */}
                <a href="/login" className="header__icon header__icon--account link focus-inset">
                  <span className="visually-hidden">Account</span>
                  Account
                </a>
                
                {/* Cart */}
                <a href="/cart" className="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble">
                  <span className="visually-hidden">Cart</span>
                  Cart
                  {/* Cart count bubble */}
                  <div className="cart-count-bubble">
                    <span aria-hidden="true">{safeCartCount}</span>
                  </div>
                </a>
              </div>
            </header>
          </div>
        </div>
        
        {/* Sticky behavior handled by CSS position: sticky */}
      </div>
    );
  },
);

HeaderSection.displayName = 'HeaderSection';
