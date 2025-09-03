'use client';

import React, { useEffect, useState } from 'react';

// Types for menu items and social links
interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok';
  url: string;
  label: string;
}

interface MakeswitHeaderProps {
  // Logo configuration
  logo?: { src: string; alt: string };
  logoText?: string;
  logoPosition?: 'left' | 'center' | 'right';
  logoWidth?: number;
  
  // Menu configuration
  menuItems?: MenuItem[];
  menuType?: 'dropdown' | 'mega' | 'drawer';
  
  // Header behavior
  stickyHeader?: boolean;
  showBorder?: boolean;
  
  // Colors and styling
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  borderColor?: string;
  
  // Social links
  socialLinks?: SocialLink[];
  showSocialLinks?: boolean;
  
  // Customer features
  enableSearch?: boolean;
  enableAccount?: boolean;
  enableCart?: boolean;
  cartCount?: number;
  
  // Layout settings
  paddingTop?: number;
  paddingBottom?: number;
  
  // WhatsApp integration
  whatsappNumber?: string;
  whatsappMessage?: string;
  showWhatsApp?: boolean;
}

const MakeswitHeader: React.FC<MakeswitHeaderProps> = ({
  logo,
  logoText = "Jay Bharat Restaurant",
  logoPosition = "center",
  logoWidth = 150,
  menuItems = [
    { label: "Menu", href: "/menu" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { 
      label: "Order Online", 
      href: "/order",
      children: [
        { label: "Delivery", href: "/delivery" },
        { label: "Pickup", href: "/pickup" },
        { label: "Catering", href: "/catering" }
      ]
    }
  ],
  menuType = 'dropdown',
  stickyHeader = true,
  showBorder = true,
  backgroundColor = '#edc56d',
  textColor = '#37241e',
  hoverColor = '#bc9256',
  borderColor = '#7e5039',
  enableSearch = true,
  enableAccount = true,
  enableCart = true,
  cartCount = 0,
  paddingTop = 12,
  paddingBottom = 12,
  whatsappNumber = '919876543210',
  whatsappMessage = 'Hi, I would like to order from Jay Bharat Restaurant',
  showWhatsApp = true,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sticky header behavior
  useEffect(() => {
    if (!stickyHeader) return;

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyHeader]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const headerClasses = `
    header-wrapper color-scheme-1 gradient
    ${showBorder ? 'border-b-2' : ''}
    ${stickyHeader ? 'sticky top-0 z-50' : ''}
    ${isSticky ? 'shadow-lg' : ''}
    transition-all duration-300
  `;

  const headerStyle = {
    backgroundColor,
    borderBottomColor: showBorder ? borderColor : 'transparent',
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`,
  };

  const renderLogo = () => {
    const logoContent = logo ? (
      <img
        alt={logo.alt || logoText}
        className="header__heading-logo motion-reduce"
        src={logo.src}
        style={{ width: `${logoWidth}px`, height: 'auto' }}
      />
    ) : (
      <span
        className="text-2xl font-bold"
        style={{
          color: textColor,
          fontFamily: 'var(--font-heading-family, "Libre Baskerville", serif)',
        }}
      >
        {logoText}
      </span>
    );

    const alignmentClass = logoPosition === 'center' ? 'text-center' : logoPosition === 'right' ? 'text-right' : 'text-left';
    
    return (
      <div className={`header__heading ${alignmentClass}`}>
        <a href="/" className="header__heading-link link link--text focus-inset">
          {logoContent}
        </a>
      </div>
    );
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.children && item.children.length > 0) {
      return (
        <li key={index} className="list-menu__item relative">
          <details className="mega-menu group">
            <summary
              className="header__menu-item list-menu__item link focus-inset flex cursor-pointer items-center gap-1"
              style={{ color: textColor }}
            >
              <span>{item.label}</span>
              <svg
                fill="none"
                height="6"
                viewBox="0 0 10 6"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </summary>
            <div className="mega-menu__content invisible absolute left-0 top-full min-w-48 rounded-md bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-open:visible group-open:opacity-100">
              <ul className="mega-menu__list space-y-2">
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <a
                      className="mega-menu__link block rounded px-3 py-2 transition-colors hover:bg-gray-100"
                      href={child.href}
                      style={{ color: textColor }}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </li>
      );
    }

    return (
      <li key={index} className="list-menu__item">
        <a
          className="header__menu-item list-menu__item link link--text focus-inset rounded px-4 py-2 transition-colors"
          href={item.href}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = hoverColor;
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = textColor;
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          style={{ color: textColor }}
        >
          <span>{item.label}</span>
        </a>
      </li>
    );
  };

  const renderSearch = () => {
    if (!enableSearch) return null;

    return (
      <div className="header-search relative">
        <button
          className="header__icon header__icon--search link focus-inset rounded p-2 transition-colors"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = hoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = textColor;
          }}
          style={{ color: textColor }}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 18 19">
            <path
              fillRule="evenodd"
              d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.72l5.4 5.4a.5.5 0 11-.71.7l-5.41-5.38z"
            />
          </svg>
          <span className="visually-hidden">Search</span>
        </button>
        
        {isSearchOpen && (
          <div className="search-modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Search</h2>
                <button
                  className="rounded p-2 hover:bg-gray-100"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 7.293l2.146-2.147a.5.5 0 01.708.708L8.707 8l2.147 2.146a.5.5 0 01-.708.708L8 8.707l-2.146 2.147a.5.5 0 01-.708-.708L7.293 8 5.146 5.854a.5.5 0 01.708-.708L8 7.293z"/>
                  </svg>
                </button>
              </div>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search our menu..."
                type="text"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAccount = () => {
    if (!enableAccount) return null;

    return (
      <a
        className="header__icon header__icon--account link focus-inset rounded p-2 transition-colors"
        href="/account"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
        style={{ color: textColor }}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 18 19">
          <path
            clipRule="evenodd"
            d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM2.5 14.5A3.5 3.5 0 0 1 6 11h6a3.5 3.5 0 0 1 3.5 3.5v1a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-1zm3.5-2.5a2.5 2.5 0 0 0-2.5 2.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1A2.5 2.5 0 0 0 12 12H6z"
            fillRule="evenodd"
          />
        </svg>
        <span className="visually-hidden">Account</span>
      </a>
    );
  };

  const renderCart = () => {
    if (!enableCart) return null;

    return (
      <a
        className="header__icon header__icon--cart link focus-inset relative rounded p-2 transition-colors"
        href="/cart"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
        style={{ color: textColor }}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 40 40">
          <path d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8h-3.16M15.75 11.8V9a7.5 7.5 0 1 1 15 0v2.8m0 0h-15" />
        </svg>
        <span className="visually-hidden">Cart</span>
        {cartCount > 0 && (
          <div className="cart-count-bubble absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            <span aria-hidden="true">{cartCount < 100 ? cartCount : '99+'}</span>
            <span className="visually-hidden">{`${cartCount} items in cart`}</span>
          </div>
        )}
      </a>
    );
  };

  const renderWhatsApp = () => {
    if (!showWhatsApp) return null;

    return (
      <div className="whatsapp_fix fixed bottom-10 right-5 z-50">
        <a
          className="flex items-center rounded-full bg-white px-4 py-2 shadow-lg transition-shadow hover:shadow-xl"
          href={`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="WhatsApp"
            className="h-8 w-8"
            src="https://cdn.shopify.com/s/files/1/0790/5889/5154/files/whatsapp_icon_22271a5f-abce-4891-ae16-688c59f72375.png?v=1689142834"
          />
        </a>
      </div>
    );
  };

  return (
    <>
      <div className={headerClasses} style={headerStyle}>
        <header className="header header--middle-center header--mobile-center mx-auto flex max-w-7xl items-center justify-between px-4">
          
          {/* Mobile menu button */}
          <button
            className="rounded p-2 transition-colors md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: textColor }}
          >
            <svg fill="currentColor" height="16" viewBox="0 0 20 16" width="20">
              <path d="M0 1h20v2H0V1zm0 6h20v2H0V7zm0 6h20v2H0v-2z" />
            </svg>
            <span className="visually-hidden">Menu</span>
          </button>

          {/* Logo */}
          {renderLogo()}

          {/* Desktop Navigation */}
          <nav className="header__inline-menu hidden md:block">
            <ul className="list-menu list-menu--inline flex items-center space-x-6">
              {menuItems.map(renderMenuItem)}
            </ul>
          </nav>

          {/* Header Icons */}
          <div className="header__icons flex items-center space-x-2">
            {renderSearch()}
            {renderAccount()}
            {renderCart()}
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu border-t md:hidden" style={{ borderTopColor: borderColor }}>
            <nav className="px-4 py-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      className="block rounded px-3 py-2 transition-colors"
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: textColor }}
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <a
                              className="block rounded px-3 py-1 text-sm transition-colors"
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{ color: textColor }}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* WhatsApp Widget */}
      {renderWhatsApp()}
    </>
  );
};

// Note: To register this component with Makeswift, you would need to:
// 1. Install @makeswift/runtime 
// 2. Import registerComponent and the control types
// 3. Add the registration code in your Makeswift configuration
// 
// Example registration (when Makeswift is properly set up):
// registerComponent(MakeswitHeader, {
//   type: 'jay-bharat-header',
//   label: 'Jay Bharat Header',
//   props: {
//     logo: Image({ label: 'Logo Image' }),
//     logoText: Text({ label: 'Logo Text', defaultValue: 'Jay Bharat Restaurant' }),
//     // ... other props
//   }
// });

export { MakeswitHeader };
