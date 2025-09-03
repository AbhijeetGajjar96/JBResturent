'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface MultiColumnItem {
  id: string;
  title?: string;
  text?: string;
  image?: string;
  imageWidth?: 'full' | 'half' | 'third';
  linkLabel?: string;
  linkUrl?: string;
}

interface MultiColumnProps {
  id?: string;
  title?: string;
  items: MultiColumnItem[];
  columnsDesktop?: number;
  columnsMobile?: number;
  colorScheme?: string;
  backgroundStyle?: 'primary' | 'secondary' | 'none';
  textAlignment?: 'left' | 'center' | 'right';
  imageWidth?: 'full' | 'half' | 'third';
  swipeOnMobile?: boolean;
  showDesktopSlider?: boolean;
  buttonLabel?: string;
  buttonLink?: string;
  paddingTop?: number;
  paddingBottom?: number;
  className?: string;
  children?: ReactNode;
}

export function MultiColumn({
  id = 'jay-bharat-multicolumn',
  title,
  items,
  columnsDesktop = 3,
  columnsMobile = 1,
  colorScheme = 'scheme-1',
  backgroundStyle = 'none',
  textAlignment = 'center',
  imageWidth = 'full',
  swipeOnMobile = false,
  showDesktopSlider = false,
  buttonLabel,
  buttonLink,
  paddingTop = 36,
  paddingBottom = 36,
  className = '',
  children
}: MultiColumnProps) {
  const sectionClasses = `
    multicolumn color-${colorScheme} gradient
    ${backgroundStyle !== 'none' ? `background-${backgroundStyle}` : ''}
    ${!title ? 'no-heading' : ''}
    ${className}
  `.trim();

  const listClasses = `
    multicolumn-list contains-content-container
    grid grid--${columnsMobile}-col-tablet-down
    grid--${columnsDesktop}-col-desktop
    ${swipeOnMobile ? 'slider slider--tablet' : ''}
    ${showDesktopSlider ? 'slider--desktop' : ''}
  `.trim();

  return (
    <div className={sectionClasses}>
      <div 
        className={`page-width section-${id}-padding isolate scroll-trigger animate--slide-in`}
        data-cascade
      >
        {title && (
          <div className="title-wrapper-with-link title-wrapper--self-padded-mobile title-wrapper--no-top-margin multicolumn__title">
            <h2 className="title inline-richtext h1">
              {title}
            </h2>
            
            {buttonLabel && buttonLink && (
              <a href={buttonLink} className="link underlined-link large-up-hide">
                {buttonLabel}
              </a>
            )}
          </div>
        )}

        <div className={listClasses}>
          {items.map((item, index) => (
            <div 
              key={item.id}
              className={`multicolumn-list__item grid__item ${textAlignment}`}
            >
              <div className="multicolumn-card content-container">
                {item.image && (
                  <div className={`multicolumn-card__image-wrapper multicolumn-card__image-wrapper--${imageWidth}-width media`}>
                    <Image
                      src={item.image}
                      alt={item.title || `Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="multicolumn-card__image"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                
                <div className="multicolumn-card__info">
                  {item.title && (
                    <h3 className="inline-richtext">
                      {item.title}
                    </h3>
                  )}
                  
                  {item.text && (
                    <div className="rte">
                      <p>{item.text}</p>
                    </div>
                  )}
                  
                  {item.linkLabel && item.linkUrl && (
                    <a 
                      href={item.linkUrl}
                      className="link animate-arrow"
                    >
                      {item.linkLabel}
                      <span className="icon-wrap">
                        <svg 
                          viewBox="0 0 14 10" 
                          fill="none" 
                          aria-hidden="true" 
                          focusable="false" 
                          className="icon icon-arrow"
                        >
                          <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="m8.537.808 4.58 4.58a.75.75 0 0 1 0 1.06l-4.58 4.58a.75.75 0 0 1-1.06-1.06L10.94 6.5H1a.75.75 0 0 1 0-1.5h9.94L7.477 1.537a.75.75 0 0 1 1.06-1.06Z" 
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {buttonLabel && buttonLink && (
          <div className="center multicolumn__button">
            <a 
              href={buttonLink} 
              className="button button--primary"
              role="button"
            >
              {buttonLabel}
            </a>
          </div>
        )}

        {children}
      </div>

      <style jsx>{`
        .section-${id}-padding {
          padding-top: ${paddingTop * 0.75}px;
          padding-bottom: ${paddingBottom * 0.75}px;
        }

        @media screen and (min-width: 750px) {
          .section-${id}-padding {
            padding-top: ${paddingTop}px;
            padding-bottom: ${paddingBottom}px;
          }
        }

        .multicolumn-card__image-wrapper--third-width {
          width: 33%;
        }

        .multicolumn-card__image-wrapper--half-width {
          width: 50%;
        }

        .multicolumn-card__image-wrapper--full-width {
          width: 100%;
        }

        .multicolumn-list__item.center .multicolumn-card__image-wrapper:not(.multicolumn-card__image-wrapper--full-width) {
          margin-left: auto;
          margin-right: auto;
        }

        .multicolumn-card {
          background: rgb(var(--color-background));
          height: 100%;
          border-radius: var(--text-boxes-radius);
          border: var(--text-boxes-border-width) solid rgba(var(--color-foreground), var(--text-boxes-border-opacity));
          box-shadow: var(--text-boxes-shadow-horizontal-offset) var(--text-boxes-shadow-vertical-offset) var(--text-boxes-shadow-blur-radius) rgba(var(--color-shadow), var(--text-boxes-shadow-opacity));
        }

        .multicolumn-card__info {
          padding: 2.5rem;
        }

        .multicolumn-card__info h3 {
          margin: 0 0 1rem 0;
          line-height: calc(1 + 0.5 / max(1, var(--font-heading-scale)));
        }

        .multicolumn-card__info p {
          margin: 0;
        }

        .multicolumn-card__info .link {
          text-decoration: none;
          font-size: inherit;
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
        }

        .icon-wrap {
          margin-left: 0.8rem;
          white-space: nowrap;
        }

        .icon-arrow {
          width: 1.4rem;
          height: 1rem;
        }

        @media screen and (max-width: 749px) {
          .multicolumn-card__info {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
