'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface MenuLink {
  label: string;
  href: string;
  links?: MenuLink[];
  current?: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface HeaderDrawerProps {
  menu?: MenuLink[];
  socialLinks?: SocialLink[];
  enableCustomerAvatar?: boolean;
  customerAccountUrl?: string;
  customerLoginUrl?: string;
  isLoggedIn?: boolean;
  customerName?: string;
  enableCountrySelector?: boolean;
  enableLanguageSelector?: boolean;
  breakpoint?: 'tablet' | 'desktop';
  className?: string;
}

export const HeaderDrawer: React.FC<HeaderDrawerProps> = ({
  menu = [],
  socialLinks = [],
  enableCustomerAvatar = true,
  customerAccountUrl = '/account',
  customerLoginUrl = '/login',
  isLoggedIn = false,
  customerName = '',
  enableCountrySelector = false,
  enableLanguageSelector = false,
  breakpoint = 'tablet',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const drawerRef = useRef<HTMLDetailsElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menuHandle: string) => {
    setOpenSubmenus(prev => 
      prev.includes(menuHandle)
        ? prev.filter(handle => handle !== menuHandle)
        : [...prev, menuHandle]
    );
  };

  const closeSubmenu = (menuHandle: string) => {
    setOpenSubmenus(prev => prev.filter(handle => handle !== menuHandle));
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setOpenSubmenus([]);
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const renderMenuItem = (link: MenuLink, index: number, level: number = 0) => {
    const menuHandle = `${link.label.toLowerCase().replace(/\s+/g, '-')}-${index}`;
    const hasSubmenu = link.links && link.links.length > 0;
    const isSubmenuOpen = openSubmenus.includes(menuHandle);

    if (hasSubmenu) {
      return (
        <li key={menuHandle}>
          <details open={isSubmenuOpen}>
            <summary
              className={`menu-drawer__menu-item list-menu__item link link--text focus-inset ${
                link.current ? 'menu-drawer__menu-item--active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(menuHandle);
              }}
            >
              {link.label}
              <span className="svg-wrapper">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.5 6L7.5 10L11.5 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            
            {isSubmenuOpen && (
              <div className="menu-drawer__submenu has-submenu gradient motion-reduce">
                <div className="menu-drawer__inner-submenu">
                  <button 
                    className="menu-drawer__close-button link link--text focus-inset"
                    onClick={() => closeSubmenu(menuHandle)}
                  >
                    <span className="svg-wrapper">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 6L6 10L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {link.label}
                  </button>
                  
                  <ul className="menu-drawer__menu list-menu" role="list">
                    {link.links?.map((childLink, childIndex) => 
                      renderMenuItem(childLink, childIndex, level + 1)
                    )}
                  </ul>
                </div>
              </div>
            )}
          </details>
        </li>
      );
    }

    return (
      <li key={menuHandle}>
        <Link
          href={link.href}
          className={`menu-drawer__menu-item list-menu__item link link--text focus-inset ${
            link.current ? 'menu-drawer__menu-item--active' : ''
          }`}
          onClick={closeDrawer}
        >
          {link.label}
        </Link>
      </li>
    );
  };

  const renderSocialLinks = () => {
    if (!socialLinks.length) return null;

    return (
      <ul className="list list-social list-unstyled" role="list">
        {socialLinks.map((social, index) => (
          <li key={index} className="list-social__item">
            <a href={social.url} className="list-social__link link" target="_blank" rel="noopener noreferrer">
              <span className="svg-wrapper">
                {getSocialIcon(social.platform)}
              </span>
              <span className="visually-hidden">{social.label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  };

  const getSocialIcon = (platform: string) => {
    const iconProps = { width: "18", height: "18", fill: "currentColor" };
    
    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      default:
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        );
    }
  };

  return (
    <div className={`header-drawer ${className}`} data-breakpoint={breakpoint}>
      <details 
        ref={drawerRef}
        className="menu-drawer-container" 
        open={isOpen}
        onToggle={toggleDrawer}
      >
        <summary
          className="header__icon header__icon--menu header__icon--summary link focus-inset"
          aria-label="Menu"
        >
          <span>
            {!isOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 6h14M3 12h14M3 18h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </summary>
        
        {isOpen && (
          <div className="gradient menu-drawer motion-reduce color-scheme-1">
            <div className="menu-drawer__inner-container">
              <div className="menu-drawer__navigation-container">
                <nav className="menu-drawer__navigation">
                  <ul className="menu-drawer__menu has-submenu list-menu" role="list">
                    {menu.map((link, index) => renderMenuItem(link, index))}
                  </ul>
                </nav>
                
                <div className="menu-drawer__utility-links">
                  {/* Customer Account Link */}
                  <Link
                    href={isLoggedIn ? customerAccountUrl : customerLoginUrl}
                    className="menu-drawer__account link focus-inset h5 medium-hide large-up-hide"
                    onClick={closeDrawer}
                  >
                    {enableCustomerAvatar && (
                      <span className="svg-wrapper">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M16 17v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 7a4 4 0 11-8 0 4 4 0 018 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                    {isLoggedIn ? (customerName || 'Account') : 'Log in'}
                  </Link>

                  {/* Localization Forms */}
                  {(enableCountrySelector || enableLanguageSelector) && (
                    <div className="menu-drawer__localization header-localization">
                      {enableCountrySelector && (
                        <div>
                          <h2 className="visually-hidden">Country/Region</h2>
                          <select className="localization-selector">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                          </select>
                        </div>
                      )}
                      
                      {enableLanguageSelector && (
                        <div>
                          <h2 className="visually-hidden">Language</h2>
                          <select className="localization-selector">
                            <option>English</option>
                            <option>Español</option>
                            <option>Français</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Social Links */}
                  {renderSocialLinks()}
                </div>
              </div>
            </div>
          </div>
        )}
      </details>
      
      <style jsx>{`
        .header-drawer {
          position: relative;
        }
        
        .header__icon--menu {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--jay-bharat-dark-brown);
          transition: all 0.3s ease;
        }
        
        .header__icon--menu:hover {
          color: var(--jay-bharat-golden-brown);
          transform: scale(1.1);
        }
        
        .menu-drawer-container {
          position: relative;
        }
        
        .localization-selector {
          background: var(--jay-bharat-cream);
          border: 1px solid var(--jay-bharat-golden-brown);
          border-radius: 4px;
          padding: 0.5rem;
          margin: 0.5rem 0;
          color: var(--jay-bharat-dark-brown);
          width: 100%;
        }
        
        .h5 {
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        @media screen and (min-width: 990px) {
          .header-drawer[data-breakpoint="tablet"] {
            display: none;
          }
        }
        
        @media screen and (min-width: 750px) {
          .medium-hide {
            display: none;
          }
        }
        
        @media screen and (min-width: 990px) {
          .large-up-hide {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderDrawer;
