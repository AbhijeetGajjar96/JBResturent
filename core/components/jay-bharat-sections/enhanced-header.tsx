'use client';

import { forwardRef, useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import { HeaderAnnouncementBar } from './header-announcement-bar';
import { WhatsAppWidget } from './whatsapp-widget';

interface NavigationLink {
  label: string;
  href: string;
  groups?: NavigationGroup[];
}

interface NavigationGroup {
  label: string;
  links: NavigationLink[];
}

interface BigCommerceLink {
  label: string;
  href: string;
  groups?: Array<{
    label?: string;
    href?: string;
    links: Array<{ label: string; href: string; }>;
  }>;
}

interface EnhancedHeaderProps {
  navigation: {
    accountHref?: string;
    accountLabel?: string;
    cartHref?: string;
    cartLabel?: string;
    searchHref?: string;
    searchParamName?: string;
    searchInputPlaceholder?: string;
    searchSubmitLabel?: string;
    links?: NavigationLink[] | BigCommerceLink[] | any;
    logo?: { src: string; alt: string };
    logoHref?: string;
    logoLabel?: string;
    cartCount?: number;
    mobileMenuTriggerLabel?: string;
    openSearchPopupLabel?: string;
    activeLocaleId?: string;
    locales?: Array<{ id: string; label: string }>;
    currencies?: Array<{ id: string; label: string; isDefault?: boolean }>;
    activeCurrencyId?: string;
  };
  stickyHeaderType?: 'none' | 'on-scroll-up' | 'always' | 'reduce-logo-size';
  logoPosition?: 'top-left' | 'top-center' | 'middle-left' | 'middle-center';
  mobileLogoPosition?: 'center' | 'left';
  colorScheme?: string;
  menuColorScheme?: string;
  showLineSeparator?: boolean;
  enableCountrySelector?: boolean;
  enableLanguageSelector?: boolean;
  enableCustomerAvatar?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  marginBottom?: number;
  className?: string;
}

export const EnhancedHeader = forwardRef<HTMLDivElement, EnhancedHeaderProps>(
  ({
    navigation,
    stickyHeaderType = 'on-scroll-up',
    logoPosition = 'middle-left',
    mobileLogoPosition = 'center',
    colorScheme = 'scheme-1',
    menuColorScheme = 'scheme-1',
    showLineSeparator = true,
    enableCountrySelector = false,
    enableLanguageSelector = false,
    enableCustomerAvatar = true,
    paddingTop = 20,
    paddingBottom = 20,
    marginBottom = 0,
    className = ''
  }, ref) => {
    const [isScrolledPast, setIsScrolledPast] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const headerRef = useRef<HTMLElement>(null);

    // Sticky header logic
    useEffect(() => {
      if (stickyHeaderType === 'none') return;

      let lastScrollY = window.scrollY;
      let headerBounds = { bottom: 0 };

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (headerRef.current) {
          const rect = headerRef.current.getBoundingClientRect();
          headerBounds.bottom = rect.bottom + currentScrollY;
        }

        if (currentScrollY > headerBounds.bottom) {
          setIsScrolledPast(true);
        } else {
          setIsScrolledPast(false);
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Set initial header bounds
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        headerBounds.bottom = rect.bottom + window.scrollY;
      }

      return () => window.removeEventListener('scroll', handleScroll);
    }, [stickyHeaderType]);

    // Header height CSS variable
    useEffect(() => {
      if (headerRef.current) {
        const updateHeaderHeight = () => {
          document.documentElement.style.setProperty(
            '--header-height', 
            `${headerRef.current?.offsetHeight || 0}px`
          );
        };

        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);
        
        return () => window.removeEventListener('resize', updateHeaderHeight);
      }
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim() && navigation.searchHref) {
        const searchUrl = `${navigation.searchHref}?${navigation.searchParamName || 'q'}=${encodeURIComponent(searchQuery)}`;
        window.location.href = searchUrl;
      }
    };

    const stickyClasses = stickyHeaderType !== 'none' ? 'sticky-header' : '';
    const headerWrapperClasses = `
      header-wrapper color-${colorScheme} gradient
      ${showLineSeparator ? 'header-wrapper--border-bottom' : ''}
      ${className}
    `.trim();

    const headerClasses = `
      header header--${logoPosition} header--mobile-${mobileLogoPosition} page-width
      ${navigation.links?.length ? 'header--has-menu' : ''}
      ${enableCountrySelector || enableLanguageSelector ? 'header--has-localizations' : ''}
      ${isScrolledPast ? 'scrolled-past-header' : ''}
    `.trim();

    const renderLogo = () => (
      <a 
        href={navigation.logoHref || '/'} 
        className="header__heading-link link link--text focus-inset"
      >
        {navigation.logo?.src ? (
          <div className="header__heading-logo-wrapper">
            <img
              src={navigation.logo.src}
              alt={navigation.logo.alt || 'Logo'}
              className="header__heading-logo"
              width="250"
              height="auto"
              loading="eager"
            />
          </div>
        ) : (
          <span className="h2">Jay Bharat Restaurant</span>
        )}
      </a>
    );

    const renderNavigation = () => {
      if (!navigation.links?.length) return null;

      return (
        <nav className="header__inline-menu">
          <ul className="list-menu list-menu--inline" role="list">
            {navigation.links.map((link, index) => (
              <li key={index} className="list-menu__item">
                <a 
                  href={link.href}
                  className="header__menu-item list-menu__item--link link link--text focus-inset"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
    };

    const renderMobileMenu = () => (
      <div className="menu-drawer-container">
        <button
          className="header__icon header__icon--menu header__icon--summary link focus-inset"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={navigation.mobileMenuTriggerLabel || 'Toggle navigation'}
          aria-expanded={isMenuOpen}
        >
          <span className="svg-wrapper">
            {isMenuOpen ? (
              <svg viewBox="0 0 18 17" className="icon icon-close">
                <path d="m.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268-7.418 7.417Z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 14 10" className="icon icon-hamburger">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 1h14v1H0V1zm0 4h14v1H0V5zm14 4H0v1h14V9z"/>
              </svg>
            )}
          </span>
        </button>

        {isMenuOpen && (
          <div className="menu-drawer motion-reduce gradient color-scheme-1">
            <div className="menu-drawer__inner-container">
              <nav className="mobile-facets__navigation">
                <ul className="mobile-facets__list list-unstyled" role="list">
                  {navigation.links?.map((link, index) => (
                    <li key={index} className="mobile-facets__item">
                      <a 
                        href={link.href}
                        className="mobile-facets__link link--text focus-inset"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    );

    const renderSearch = () => (
      <div className="header__search">
        <button
          className="header__icon header__icon--search link focus-inset modal__toggle"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label={navigation.openSearchPopupLabel || 'Open search'}
        >
          <span className="svg-wrapper">
            <svg viewBox="0 0 18 19" className="icon icon-search">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18zm.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7l-5.41-5.4Z"/>
            </svg>
          </span>
        </button>

        {isSearchOpen && (
          <div className="search-modal modal__content gradient" role="dialog" aria-modal="true">
            <div className="search-modal__content">
              <form onSubmit={handleSearchSubmit} className="search search-modal__form">
                <div className="field">
                  <input
                    type="search"
                    name={navigation.searchParamName || 'q'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={navigation.searchInputPlaceholder || 'Search...'}
                    className="search__input field__input"
                    autoFocus
                  />
                  <label className="field__label">Search</label>
                  <button
                    type="submit"
                    className="search__button field__button"
                    aria-label={navigation.searchSubmitLabel || 'Search'}
                  >
                    <span className="svg-wrapper">
                      <svg viewBox="0 0 18 19" className="icon icon-search">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.03 11.68A5.784 5.784 0 1 1 2.85 3.5a5.784 5.784 0 0 1 8.18 8.18zm.26 1.12a6.78 6.78 0 1 1 .72-.7l5.4 5.4a.5.5 0 1 1-.71.7l-5.41-5.4Z"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
              <button
                className="modal__close-button link link--text focus-inset"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <span className="svg-wrapper">
                  <svg viewBox="0 0 18 17" className="icon icon-close">
                    <path d="m.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268-7.418 7.417Z"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    );

    const renderCartIcon = () => (
      <a 
        href={navigation.cartHref || '/cart'} 
        className="header__icon header__icon--cart link focus-inset"
        aria-label={navigation.cartLabel || 'Cart'}
      >
        <span className="svg-wrapper">
          {(navigation.cartCount || 0) > 0 ? (
            <svg viewBox="0 0 40 40" className="icon icon-cart">
              <path d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8h-3.16M15.75 11.8V9a7.5 7.5 0 1 1 15 0v2.8m0 0h-15"/>
            </svg>
          ) : (
            <svg viewBox="0 0 40 40" className="icon icon-cart-empty">
              <path d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8h-3.16M15.75 11.8V9a7.5 7.5 0 1 1 15 0v2.8m0 0h-15"/>
            </svg>
          )}
        </span>
        {(navigation.cartCount || 0) > 0 && (
          <div className="cart-count-bubble">
            <span aria-hidden="true">{navigation.cartCount}</span>
          </div>
        )}
      </a>
    );

    const renderAccountIcon = () => (
      <a
        href={navigation.accountHref || '/account'}
        className="header__icon header__icon--account link focus-inset"
        aria-label={navigation.accountLabel || 'Account'}
      >
        <span className="svg-wrapper">
          <svg viewBox="0 0 18 19" className="icon icon-account">
            <path fillRule="evenodd" clipRule="evenodd" d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2.5 14.5A3.5 3.5 0 0 1 6 11h6a3.5 3.5 0 0 1 3.5 3.5v1a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-1zm3.5-2.5a2.5 2.5 0 0 0-2.5 2.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1A2.5 2.5 0 0 0 12 12H6z"/>
          </svg>
        </span>
      </a>
    );

    return (
      <>
        <div className={stickyClasses} data-sticky-type={stickyHeaderType}>
          <div className={headerWrapperClasses}>
            {/* Announcement Bar */}
            <HeaderAnnouncementBar />
            
            <header ref={headerRef} className={headerClasses}>
              {/* Mobile Menu */}
              {renderMobileMenu()}

              {/* Logo - Left/Top Position */}
              {(logoPosition === 'top-left' || logoPosition === 'middle-left') && (
                <div className="header__heading">
                  {renderLogo()}
                </div>
              )}

              {/* Navigation */}
              {renderNavigation()}

              {/* Logo - Center Position */}
              {(logoPosition === 'top-center' || logoPosition === 'middle-center') && (
                <div className="header__heading header__heading--center">
                  {renderLogo()}
                </div>
              )}

              {/* Header Icons */}
              <div className="header__icons">
                {/* Localization */}
                {(enableCountrySelector || enableLanguageSelector) && (
                  <div className="desktop-localization-wrapper">
                    {enableCountrySelector && (
                      <select className="localization-selector" aria-label="Select country">
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="IN">India</option>
                      </select>
                    )}
                    {enableLanguageSelector && (
                      <select className="localization-selector" aria-label="Select language">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="es">Español</option>
                      </select>
                    )}
                  </div>
                )}

                {/* Search */}
                {renderSearch()}

                {/* Account */}
                {renderAccountIcon()}

                {/* Cart */}
                {renderCartIcon()}
              </div>
            </header>
          </div>
        </div>

        {/* WhatsApp Widget */}
        <WhatsAppWidget />

        {/* Styles */}
        <style jsx>{`
          .header-wrapper {
            position: relative;
            z-index: 3;
          }

          .header-wrapper--border-bottom {
            border-bottom: 0.1rem solid rgba(var(--color-border), 0.08);
          }

          .sticky-header {
            position: sticky;
            top: 0;
            z-index: 4;
          }

          .header {
            display: flex;
            align-items: center;
            padding: ${paddingTop * 0.5}px 3rem ${paddingBottom * 0.5}px 3rem;
            margin-bottom: ${marginBottom * 0.75}px;
            position: relative;
          }

          @media screen and (min-width: 750px) {
            .header {
              margin-bottom: ${marginBottom}px;
            }
          }

          @media screen and (min-width: 990px) {
            .header {
              padding-top: ${paddingTop}px;
              padding-bottom: ${paddingBottom}px;
            }
          }

          .header--middle-left,
          .header--top-left {
            justify-content: space-between;
          }

          .header--middle-center,
          .header--top-center {
            justify-content: center;
            text-align: center;
          }

          .header__heading {
            margin: 0;
          }

          .header__heading--center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          .header__heading-link {
            text-decoration: none;
            color: rgb(var(--color-foreground));
          }

          .header__heading-logo-wrapper {
            display: inline-block;
          }

          .header__heading-logo {
            max-width: 250px;
            height: auto;
            ${stickyHeaderType === 'reduce-logo-size' && isScrolledPast ? 'width: 75%;' : ''}
          }

          .header__inline-menu {
            display: none;
          }

          @media screen and (min-width: 990px) {
            .header__inline-menu {
              display: block;
              margin: 0 2rem;
            }
          }

          .list-menu {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .list-menu--inline {
            display: inline-flex;
            flex-wrap: wrap;
            gap: 2rem;
          }

          .list-menu__item {
            display: flex;
            align-items: center;
          }

          .header__menu-item {
            text-decoration: none;
            padding: 0.5rem 0;
            color: rgb(var(--color-foreground));
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .header__menu-item:hover {
            color: rgb(var(--color-base-accent-1));
          }

          .menu-drawer-container {
            display: flex;
            align-items: center;
          }

          @media screen and (min-width: 990px) {
            .menu-drawer-container {
              display: none;
            }
          }

          .header__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4.4rem;
            height: 4.4rem;
            color: rgb(var(--color-foreground));
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .header__icon:hover {
            color: rgb(var(--color-base-accent-1));
          }

          .header__icons {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
          }

          .svg-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
          }

          .icon {
            width: 100%;
            height: 100%;
            fill: currentColor;
            stroke: currentColor;
          }

          .cart-count-bubble {
            position: absolute;
            top: 0.8rem;
            right: 0.8rem;
            background: rgb(var(--color-base-accent-1));
            color: rgb(var(--color-base-text));
            border-radius: 50%;
            width: 1.8rem;
            height: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 600;
          }

          .menu-drawer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgb(var(--color-background));
            z-index: 5;
            overflow-y: auto;
          }

          .menu-drawer__inner-container {
            padding: 2rem;
            max-width: 37.5rem;
          }

          .mobile-facets__list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .mobile-facets__item {
            border-bottom: 0.1rem solid rgba(var(--color-border), 0.08);
          }

          .mobile-facets__link {
            display: block;
            padding: 1.5rem 0;
            text-decoration: none;
            color: rgb(var(--color-foreground));
            font-size: 1.8rem;
          }

          .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgb(var(--color-background));
            z-index: 5;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding-top: 8rem;
          }

          .search-modal__content {
            width: 100%;
            max-width: 50rem;
            padding: 0 2rem;
          }

          .search {
            position: relative;
          }

          .field {
            position: relative;
            margin-bottom: 2rem;
          }

          .field__input {
            width: 100%;
            padding: 1.5rem 6rem 1.5rem 1.5rem;
            border: 0.1rem solid rgba(var(--color-border), 0.08);
            border-radius: 0.4rem;
            background: transparent;
            font-size: 1.6rem;
            color: rgb(var(--color-foreground));
          }

          .field__input:focus {
            outline: 0.2rem solid rgb(var(--color-base-accent-1));
            outline-offset: 0.1rem;
            border-color: rgb(var(--color-base-accent-1));
          }

          .field__label {
            position: absolute;
            top: 0.5rem;
            left: 1.5rem;
            font-size: 1.2rem;
            color: rgba(var(--color-foreground), 0.6);
            pointer-events: none;
          }

          .search__button {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            color: rgb(var(--color-foreground));
            cursor: pointer;
            padding: 1rem;
          }

          .modal__close-button {
            position: absolute;
            top: 2rem;
            right: 2rem;
            background: transparent;
            border: none;
            color: rgb(var(--color-foreground));
            cursor: pointer;
            padding: 1rem;
          }

          .localization-selector {
            background: transparent;
            border: 0.1rem solid rgba(var(--color-border), 0.08);
            border-radius: 0.4rem;
            padding: 0.5rem 1rem;
            color: rgb(var(--color-foreground));
            font-size: 1.2rem;
            margin-right: 0.5rem;
          }

          .focus-inset:focus {
            outline: 0.2rem solid rgb(var(--color-base-accent-1));
            outline-offset: 0.1rem;
          }

          .visually-hidden {
            position: absolute !important;
            overflow: hidden;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            border: 0;
            clip: rect(0 0 0 0);
          }

          @media screen and (max-width: 989px) {
            .small-hide {
              display: none;
            }
          }

          @media screen and (max-width: 749px) {
            .medium-hide {
              display: none;
            }
          }
        `}</style>

        {/* Sticky Header Script */}
        <Script id="sticky-header-script" strategy="afterInteractive">
          {`
            if (typeof StickyHeader === 'undefined') {
              class StickyHeader extends HTMLElement {
                constructor() {
                  super();
                }

                connectedCallback() {
                  this.header = document.querySelector('.section-header');
                  this.headerIsAlwaysSticky = this.getAttribute('data-sticky-type') === 'always' || this.getAttribute('data-sticky-type') === 'reduce-logo-size';
                  this.headerBounds = {};

                  this.setHeaderHeight();
                  window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

                  if (this.headerIsAlwaysSticky) {
                    this.header.classList.add('shopify-section-header-sticky');
                  }

                  this.currentScrollTop = 0;
                  this.preventReveal = false;

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
              }

              customElements.define('sticky-header', StickyHeader);
            }
          `}
        </Script>
      </>
    );
  }
);

EnhancedHeader.displayName = 'EnhancedHeader';
