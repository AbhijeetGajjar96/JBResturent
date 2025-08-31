'use client';

import { forwardRef, useEffect, useState } from 'react';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';

interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
}

// WhatsApp button removed for local development

// Header Drawer Component (Mobile Menu)
const HeaderDrawer = ({ links }: { links: Array<{ label: string; href: string }> }) => (
  <div className="header-drawer small-hide medium-hide">
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
  </div>
);

// Header Search Component
const HeaderSearch = ({ inputId }: { inputId: string }) => (
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
                placeholder="Search" 
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
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export const HeaderSection = forwardRef<React.ComponentRef<'div'>, Props>(
  ({ navigation, banner }, ref) => {
    const [bannerElement, setBannerElement] = useState<HTMLElement | null>(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const [links, setLinks] = useState<Array<{ label: string; href: string }>>([]);

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
            }
          } catch (error) {
            console.warn('Could not extract navigation links:', error);
            // Fallback to empty links if navigation data is unavailable
            setLinks([]);
          }
        };
        extractLinks();
      }
    }, [navigation]);

    return (
      <div ref={ref}>
        {/* CSS imports for header styling */}
        <link rel="stylesheet" href="/styles/header-main.css" />
        
        {/* Banner */}
        {banner && <Banner ref={setBannerElement} {...banner} />}
        
        {/* Header with CSS Classes and Inline Fallback Styles */}
        <div 
          data-sticky-type="always" 
          className="section-header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: '#ffffff',
            borderBottom: '2px solid #e5e7eb',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <div 
            className="header-wrapper"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 20px'
            }}
          >
            <header 
              className="header"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 0',
                minHeight: '80px'
              }}
            >
              {/* Header Drawer (Mobile Menu) */}
              <HeaderDrawer links={links} />
              
              {/* Header Search for top-center logo position */}
              <HeaderSearch inputId="Search-In-Modal-1" />
              
              {/* Logo - Top section (not middle-center) */}

              
              {/* Navigation Menu - Dropdown style */}
              <HeaderDropdownMenu links={links} />
              
              {/* Logo - Middle section (middle-center position) */}
              <div 
                className="header__heading"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                }}
              >
                <a href="/" className="header__heading-link link link--text focus-inset">
                  <div 
                    className="header__heading-logo-wrapper"
                    style={{ textAlign: 'center' }}
                  >
                    <span 
                      className="h2"
                      style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#e67e22',
                        margin: 0
                      }}
                    >
                      🍽️ JBResturent
                    </span>
                  </div>
                </a>
              </div>
              
              {/* Header Icons - Exact Shopify structure */}
              <div 
                className="header__icons"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div className="desktop-localization-wrapper">
                  {/* Country/Language selectors can be added here */}
                </div>
                
                {/* Header Search */}
                <HeaderSearch inputId="Search-In-Modal" />
                
                {/* Account */}
                <a 
                  href="/login" 
                  className="header__icon header__icon--account link focus-inset"
                  style={{
                    padding: '8px 12px',
                    color: '#6b7280',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Account
                </a>
                
                {/* Cart */}
                <a 
                  href="/cart" 
                  className="header__icon header__icon--cart link focus-inset" 
                  id="cart-icon-bubble"
                  style={{
                    padding: '8px 12px',
                    color: '#6b7280',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    fontSize: '14px',
                    fontWeight: '500',
                    position: 'relative'
                  }}
                >
                  Cart
                  {/* Cart count bubble */}
                  <div 
                    className="cart-count-bubble"
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontSize: '12px',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span aria-hidden="true">0</span>
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
