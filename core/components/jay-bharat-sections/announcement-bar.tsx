'use client';

import { useState, useEffect } from 'react';

interface AnnouncementBlock {
  id: string;
  text: string;
  link?: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
  pinterest?: string;
  snapchat?: string;
  tumblr?: string;
  vimeo?: string;
}

interface AnnouncementBarProps {
  id?: string;
  announcements: AnnouncementBlock[];
  colorScheme?: string;
  showLineSeparator?: boolean;
  showSocial?: boolean;
  socialLinks?: SocialLinks;
  autoRotate?: boolean;
  changeSlideSpeed?: number; // in seconds
  enableCountrySelector?: boolean;
  enableLanguageSelector?: boolean;
  className?: string;
}

export function AnnouncementBar({
  id = 'jay-bharat-announcement-bar',
  announcements,
  colorScheme = 'scheme-4',
  showLineSeparator = true,
  showSocial = false,
  socialLinks = {},
  autoRotate = false,
  changeSlideSpeed = 5,
  enableCountrySelector = false,
  enableLanguageSelector = false,
  className = ''
}: AnnouncementBarProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasSocialIcons = showSocial && Object.values(socialLinks).some(link => link);
  const hasLocalization = enableCountrySelector || enableLanguageSelector;
  const hasMultipleAnnouncements = announcements.length > 1;

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || !hasMultipleAnnouncements || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, changeSlideSpeed * 1000);

    return () => clearInterval(interval);
  }, [autoRotate, hasMultipleAnnouncements, isPaused, changeSlideSpeed, announcements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const utilityBarClasses = `
    utility-bar color-${colorScheme} gradient
    ${showLineSeparator && announcements.length > 0 ? 'utility-bar--bottom-border' : ''}
    ${showLineSeparator && showSocial && hasSocialIcons && announcements.length === 0 ? 'utility-bar--bottom-border-social-only' : ''}
    ${hasLocalization ? 'header-localization' : ''}
    ${className}
  `.trim();

  const gridClasses = `
    page-width utility-bar__grid
    ${(announcements.length > 0 && hasLocalization) || (showSocial && hasSocialIcons) ? 'utility-bar__grid--3-col' : ''}
    ${hasLocalization || (showSocial && hasSocialIcons) ? 'utility-bar__grid--2-col' : ''}
  `.trim();

  const renderSocialIcons = () => {
    if (!hasSocialIcons) return null;

    const socialIconsData = [
      { key: 'facebook', url: socialLinks.facebook, label: 'Facebook' },
      { key: 'instagram', url: socialLinks.instagram, label: 'Instagram' },
      { key: 'youtube', url: socialLinks.youtube, label: 'YouTube' },
      { key: 'tiktok', url: socialLinks.tiktok, label: 'TikTok' },
      { key: 'twitter', url: socialLinks.twitter, label: 'Twitter' },
      { key: 'pinterest', url: socialLinks.pinterest, label: 'Pinterest' },
      { key: 'snapchat', url: socialLinks.snapchat, label: 'Snapchat' },
      { key: 'tumblr', url: socialLinks.tumblr, label: 'Tumblr' },
      { key: 'vimeo', url: socialLinks.vimeo, label: 'Vimeo' }
    ].filter(social => social.url);

    return (
      <div className="list-social list-social--inline">
        <ul className="list-social__list list-unstyled" role="list">
          {socialIconsData.map((social) => (
            <li key={social.key} className="list-social__item">
              <a
                href={social.url}
                className="link list-social__link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`}
              >
                <svg className="icon icon--full-color" viewBox="0 0 24 24" fill="currentColor">
                  {social.key === 'facebook' && (
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  )}
                  {social.key === 'instagram' && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  )}
                  {social.key === 'youtube' && (
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  )}
                  {social.key === 'twitter' && (
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  )}
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSingleAnnouncement = (announcement: AnnouncementBlock) => {
    if (!announcement.text) return null;

    const content = (
      <p className="announcement-bar__message">
        <span>{announcement.text}</span>
        {announcement.link && (
          <svg className="icon icon-arrow" viewBox="0 0 14 10" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="m8.537.808 4.58 4.58a.75.75 0 0 1 0 1.06l-4.58 4.58a.75.75 0 0 1-1.06-1.06L10.94 6.5H1a.75.75 0 0 1 0-1.5h9.94L7.477 1.537a.75.75 0 0 1 1.06-1.06Z" fill="currentColor"/>
          </svg>
        )}
      </p>
    );

    return (
      <div 
        className={`announcement-bar ${showSocial ? 'announcement-bar--one-announcement' : ''}`}
        role="region"
        aria-label="Announcement"
      >
        {announcement.link ? (
          <a 
            href={announcement.link} 
            className="announcement-bar__link link link--text focus-inset animate-arrow"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    );
  };

  const renderMultipleAnnouncements = () => {
    return (
      <div 
        className="announcement-bar"
        role="region"
        aria-roledescription="Announcement carousel"
        aria-label="Announcement bar"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="announcement-bar-slider slider-buttons">
          <button
            type="button"
            className="slider-button slider-button--prev"
            onClick={prevSlide}
            aria-label="Previous announcement"
          >
            <span className="svg-wrapper">
              <svg className="icon icon-caret" viewBox="0 0 10 6" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"/>
              </svg>
            </span>
          </button>

          <div className="slider slider--everywhere" aria-live="polite" aria-atomic="true">
            <div 
              className="slideshow__slide slider__slide"
              role="group"
              aria-roledescription="Announcement"
              aria-label={`${currentSlide + 1} of ${announcements.length}`}
            >
              <div className="announcement-bar__announcement" role="region" aria-label="Announcement">
                {announcements[currentSlide]?.text && (
                  <>
                    {announcements[currentSlide].link ? (
                      <a 
                        href={announcements[currentSlide].link} 
                        className="announcement-bar__link link link--text focus-inset animate-arrow"
                      >
                        <p className="announcement-bar__message h5">
                          <span>{announcements[currentSlide].text}</span>
                          <svg className="icon icon-arrow" viewBox="0 0 14 10" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="m8.537.808 4.58 4.58a.75.75 0 0 1 0 1.06l-4.58 4.58a.75.75 0 0 1-1.06-1.06L10.94 6.5H1a.75.75 0 0 1 0-1.5h9.94L7.477 1.537a.75.75 0 0 1 1.06-1.06Z" fill="currentColor"/>
                          </svg>
                        </p>
                      </a>
                    ) : (
                      <p className="announcement-bar__message h5">
                        <span>{announcements[currentSlide].text}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="slider-button slider-button--next"
            onClick={nextSlide}
            aria-label="Next announcement"
          >
            <span className="svg-wrapper">
              <svg className="icon icon-caret" viewBox="0 0 10 6" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={utilityBarClasses}>
      <div className={gridClasses}>
        {renderSocialIcons()}
        
        {announcements.length === 1 && renderSingleAnnouncement(announcements[0])}
        {announcements.length > 1 && renderMultipleAnnouncements()}

        {/* Localization wrapper - placeholder for future implementation */}
        <div className="localization-wrapper">
          {enableCountrySelector && (
            <div className="localization-form small-hide medium-hide">
              <select className="localization-selector" aria-label="Select country">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="IN">India</option>
              </select>
            </div>
          )}
          
          {enableLanguageSelector && (
            <div className="localization-form small-hide medium-hide">
              <select className="localization-selector" aria-label="Select language">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Español</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .utility-bar {
          font-size: 1.2rem;
          line-height: 1.4;
          border: none;
          padding: 1rem 0;
        }

        .utility-bar--bottom-border {
          border-bottom: 0.1rem solid rgba(var(--color-foreground), 0.08);
        }

        .utility-bar--bottom-border-social-only {
          border-bottom: 0.1rem solid rgba(var(--color-foreground), 0.08);
        }

        .utility-bar__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          align-items: center;
        }

        .utility-bar__grid--2-col {
          grid-template-columns: 1fr auto;
        }

        .utility-bar__grid--3-col {
          grid-template-columns: auto 1fr auto;
        }

        .announcement-bar {
          text-align: center;
          overflow: hidden;
        }

        .announcement-bar--one-announcement {
          text-align: center;
        }

        .announcement-bar__message {
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .announcement-bar__link {
          text-decoration: none;
          color: inherit;
          display: inline-flex;
          align-items: center;
        }

        .announcement-bar__link:hover {
          text-decoration: underline;
        }

        .announcement-bar-slider {
          display: flex;
          align-items: center;
          position: relative;
        }

        .slider-button {
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-button:hover {
          opacity: 0.7;
        }

        .slider-button--prev .icon-caret {
          transform: rotate(90deg);
        }

        .slider-button--next .icon-caret {
          transform: rotate(-90deg);
        }

        .slider {
          flex: 1;
          overflow: hidden;
        }

        .slideshow__slide {
          width: 100%;
        }

        .icon {
          width: 1.4rem;
          height: 1.4rem;
        }

        .icon-arrow {
          width: 1.2rem;
          height: 0.8rem;
        }

        .icon-caret {
          width: 1rem;
          height: 0.6rem;
        }

        .list-social {
          margin: 0;
        }

        .list-social__list {
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .list-social__item {
          margin: 0;
        }

        .list-social__link {
          display: flex;
          align-items: center;
          color: inherit;
          text-decoration: none;
        }

        .list-social__link:hover {
          opacity: 0.7;
        }

        .list-social .icon {
          width: 1.8rem;
          height: 1.8rem;
        }

        .localization-wrapper {
          display: flex;
          gap: 1rem;
        }

        .localization-selector {
          background: transparent;
          border: 0.1rem solid rgba(var(--color-foreground), 0.2);
          border-radius: 0.4rem;
          padding: 0.5rem;
          color: inherit;
          font-size: 1.2rem;
        }

        @media screen and (max-width: 749px) {
          .utility-bar__grid--2-col,
          .utility-bar__grid--3-col {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
          }

          .small-hide {
            display: none;
          }
        }

        @media screen and (max-width: 989px) {
          .medium-hide {
            display: none;
          }
        }

        .animate-arrow {
          transition: transform 0.2s ease;
        }

        .animate-arrow:hover .icon-arrow {
          transform: translateX(0.2rem);
        }

        .focus-inset:focus {
          outline: 0.2rem solid rgba(var(--color-foreground), 0.5);
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
          word-wrap: normal !important;
        }
      `}</style>
    </div>
  );
}
