'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface ImageBannerProps {
  id?: string;
  image?: string;
  mobileImage?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  textAlignment?: 'left' | 'center' | 'right';
  contentPosition?: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  overlayOpacity?: number;
  height?: 'small' | 'medium' | 'large' | 'adapt';
  colorScheme?: string;
  className?: string;
  children?: ReactNode;
}

export function ImageBanner({
  id = 'jay-bharat-banner',
  image,
  mobileImage,
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  textAlignment = 'center',
  contentPosition = 'middle-center',
  overlayOpacity = 0.3,
  height = 'medium',
  colorScheme = 'scheme-1',
  className = '',
  children
}: ImageBannerProps) {
  const bannerClasses = `
    banner banner--${height} banner--content-align-${textAlignment} 
    banner--${contentPosition} color-${colorScheme} gradient
    ${className}
  `.trim();

  return (
    <div id={`Banner-${id}`} className={bannerClasses}>
      {/* Banner Media */}
      {image && (
        <div className="banner__media media">
          <Image
            src={image}
            alt={title || 'Banner Image'}
            fill
            className="banner__image"
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
          {/* Mobile Image */}
          {mobileImage && (
            <Image
              src={mobileImage}
              alt={title || 'Banner Image'}
              fill
              className="banner__image banner__image--mobile"
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
            />
          )}
        </div>
      )}

      {/* Banner Content */}
      <div className={`banner__content banner__content--${contentPosition} page-width`}>
        <div className="banner__box content-container content-container--full-width-mobile color-background-1 gradient">
          {subtitle && (
            <p className="banner__subtitle body">{subtitle}</p>
          )}
          
          {title && (
            <h1 className="banner__heading inline-richtext h0">
              {title}
            </h1>
          )}
          
          {description && (
            <div className="banner__text rte body">
              <p>{description}</p>
            </div>
          )}
          
          {(buttonText || secondaryButtonText) && (
            <div className="banner__buttons">
              {buttonText && buttonLink && (
                <a 
                  href={buttonLink} 
                  className="button button--primary"
                  role="button"
                >
                  {buttonText}
                </a>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <a 
                  href={secondaryButtonLink} 
                  className="button button--secondary"
                  role="button"
                >
                  {secondaryButtonText}
                </a>
              )}
            </div>
          )}
          
          {children}
        </div>
      </div>

      {/* Overlay */}
      <style jsx>{`
        #Banner-${id}::after {
          opacity: ${overlayOpacity};
        }
        
        .banner__image--mobile {
          display: none;
        }
        
        @media screen and (max-width: 749px) {
          .banner__image:not(.banner__image--mobile) {
            display: ${mobileImage ? 'none' : 'block'};
          }
          
          .banner__image--mobile {
            display: ${mobileImage ? 'block' : 'none'};
          }
        }
        
        .banner--small {
          min-height: 40rem;
        }
        
        .banner--medium {
          min-height: 56rem;
        }
        
        .banner--large {
          min-height: 72rem;
        }
        
        .banner--adapt {
          height: auto;
        }
        
        @media screen and (max-width: 749px) {
          .banner--small {
            min-height: 28rem;
          }
          
          .banner--medium {
            min-height: 34rem;
          }
          
          .banner--large {
            min-height: 39rem;
          }
        }
      `}</style>
    </div>
  );
}
