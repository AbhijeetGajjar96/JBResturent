'use client';

import { forwardRef, useEffect, useState } from 'react';

import { Banner } from '@/vibes/soul/primitives/banner';
import { Navigation } from '@/vibes/soul/primitives/navigation';

interface Props {
  navigation: React.ComponentPropsWithoutRef<typeof Navigation>;
  banner?: React.ComponentPropsWithoutRef<typeof Banner>;
}

// WhatsApp floating button component
const WhatsAppButton = () => (
  <div className="whatsapp_fix active" aria-hidden="false">
    <a href="#" className="whatsapp-link">
      <img 
        src="/images/whatsapp-icon.png" 
        alt="WhatsApp"
      />
    </a>
  </div>
);

// Header Drawer Component (Mobile Menu)
const HeaderDrawer = ({ links }: { links: Array<{ label: string; href: string }> }) => (
  <div style={{ display: 'block' }}>
    <details id="Details-menu-drawer-container" style={{ position: 'relative' }}>
      <summary style={{
        padding: '8px',
        cursor: 'pointer',
        color: '#6c757d',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
        listStyle: 'none'
      }} onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.color = '#495057';
      }} onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#6c757d';
      }} aria-label="Menu" role="button" aria-expanded="false">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M1 1H19M1 10H19M1 19H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      <div style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        minWidth: '200px',
        zIndex: 1000,
        padding: '10px 0'
      }}>
        <nav>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} style={{
                  display: 'block',
                  padding: '12px 20px',
                  textDecoration: 'none',
                  color: '#495057',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.color = '#e67e22';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#495057';
                }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </details>
  </div>
);

// Header Search Component
const HeaderSearch = ({ inputId }: { inputId: string }) => (
  <div style={{ position: 'relative' }}>
    <details>
      <summary style={{
        padding: '8px',
        cursor: 'pointer',
        color: '#6c757d',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
        listStyle: 'none'
      }} onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.color = '#495057';
      }} onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#6c757d';
      }} aria-label="Search" aria-expanded="false">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M21 21L16.65 16.65M19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      <div style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        minWidth: '300px',
        zIndex: 1000,
        padding: '20px'
      }} role="dialog" aria-modal="true" aria-label="Search">
        <form action="/search" method="get" role="search">
          <div style={{ position: 'relative' }}>
            <input 
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              id={inputId}
              name="q" 
              defaultValue="" 
              placeholder="Search for food, drinks..." 
              role="combobox" 
              aria-expanded="false" 
              aria-label="Search" 
            />
            <button type="submit" style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#6c757d'
            }} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M21 21L16.65 16.65M19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </details>
  </div>
);

// Header Dropdown Menu Component
const HeaderDropdownMenu = ({ links }: { links: Array<{ label: string; href: string }> }) => (
  <nav style={{ display: 'flex', alignItems: 'center' }}>
    <ul style={{
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '30px'
    }} role="list">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} style={{
            textDecoration: 'none',
            color: '#495057',
            fontSize: '16px',
            fontWeight: '500',
            padding: '10px 15px',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            display: 'block'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e67e22';
            e.currentTarget.style.color = 'white';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#495057';
          }}>
            {link.label}
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
        {/* CSS imports removed - using inline styles for better control */}
        
        {/* WhatsApp Button */}
        <WhatsAppButton />
        
        {/* Banner */}
        {banner && <Banner ref={setBannerElement} {...banner} />}
        
        {/* Professional Header with Proper Layout */}
        <header style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderBottom: '2px solid #dee2e6',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            {/* Top Row - Logo and Contact */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #e9ecef'
            }}>
              {/* Logo */}
              <div style={{ flex: '0 0 auto' }}>
                <a href="/" style={{ textDecoration: 'none', color: '#2c3e50' }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#e67e22'
                  }}>
                    🍽️ JBResturent
                  </div>
                </a>
              </div>
              
              {/* Contact Info - Can be made dynamic later */}
              <div style={{
                display: 'flex',
                gap: '20px',
                fontSize: '14px',
                color: '#6c757d'
              }}>
                {/* Contact info can be added here dynamically */}
              </div>
            </div>
            
            {/* Main Navigation Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0'
            }}>
              {/* Left - Mobile Menu */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <HeaderDrawer links={links} />
              </div>
              
              {/* Center - Navigation Menu */}
              <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                <HeaderDropdownMenu links={links} />
              </div>
              
              {/* Right - Header Icons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                {/* Search */}
                <HeaderSearch inputId="Search-In-Modal" />
                
                {/* Account */}
                <a href="/login" style={{
                  padding: '8px',
                  color: '#6c757d',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.color = '#495057';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6c757d';
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16 17V15C16 13.9391 15.5786 12.9217 14.8284 12.1716C14.0783 11.4214 13.0609 11 12 11H8C6.93913 11 5.92172 11.4214 5.17157 12.1716C4.42143 12.9217 4 13.9391 4 15V17M12 7C12 9.20914 10.2091 11 8 11C5.79086 11 4 9.20914 4 7C4 4.79086 5.79086 3 8 3C10.2091 3 12 4.79086 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                
                {/* Cart */}
                <a href="/cart" style={{
                  padding: '8px',
                  color: '#6c757d',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.color = '#495057';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6c757d';
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 16.6 18 16 18H8C7.4 18 7 17.6 7 17V13H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Cart count badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    0
                  </div>
                </a>
              </div>
            </div>
          </div>
        </header>
        
        {/* Sticky behavior handled by CSS position: sticky */}
      </div>
    );
  },
);

HeaderSection.displayName = 'HeaderSection';
