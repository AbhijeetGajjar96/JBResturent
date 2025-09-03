'use client';

import { ReactNode } from 'react';

interface RichTextBlock {
  id: string;
  type: 'heading' | 'caption' | 'text' | 'button';
  heading?: string;
  headingSize?: 'h0' | 'h1' | 'h2' | 'hxl';
  caption?: string;
  text?: string;
  textStyle?: 'subtitle' | 'caption-with-letter-spacing';
  textSize?: 'small' | 'medium' | 'large';
  buttonLabel?: string;
  buttonLink?: string;
  buttonStyle?: 'primary' | 'secondary';
}

interface RichTextProps {
  id?: string;
  blocks: RichTextBlock[];
  colorScheme?: string;
  contentAlignment?: 'left' | 'center' | 'right';
  desktopContentPosition?: 'left' | 'center' | 'right';
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  className?: string;
  children?: ReactNode;
}

export function RichText({
  id = 'jay-bharat-rich-text',
  blocks,
  colorScheme = 'scheme-1',
  contentAlignment = 'center',
  desktopContentPosition = 'center',
  fullWidth = false,
  paddingTop = 40,
  paddingBottom = 52,
  className = '',
  children
}: RichTextProps) {
  const containerClasses = `
    isolate
    ${fullWidth ? '' : 'page-width'}
    ${className}
  `.trim();

  const richTextClasses = `
    rich-text content-container color-${colorScheme} gradient
    ${fullWidth ? 'rich-text--full-width content-container--full-width' : ''}
    section-${id}-padding
  `.trim();

  const wrapperClasses = `
    rich-text__wrapper rich-text__wrapper--${desktopContentPosition}
    ${fullWidth ? 'page-width' : ''}
  `.trim();

  const blocksClasses = `rich-text__blocks ${contentAlignment}`;

  const renderBlock = (block: RichTextBlock, index: number) => {
    const baseClasses = 'scroll-trigger animate--slide-in';
    const cascadeStyle = { '--animation-order': index + 1 };

    switch (block.type) {
      case 'heading':
        return (
          <h2
            key={block.id}
            className={`rich-text__heading rte inline-richtext ${block.headingSize || 'h1'} ${baseClasses}`}
            style={cascadeStyle}
            data-cascade
          >
            {block.heading}
          </h2>
        );

      case 'caption':
        return (
          <p
            key={block.id}
            className={`rich-text__caption ${block.textStyle || 'subtitle'} ${block.textStyle || 'subtitle'}--${block.textSize || 'medium'} ${baseClasses}`}
            style={cascadeStyle}
            data-cascade
          >
            {block.caption}
          </p>
        );

      case 'text':
        return (
          <div
            key={block.id}
            className={`rich-text__text rte ${baseClasses}`}
            style={cascadeStyle}
            data-cascade
            dangerouslySetInnerHTML={{ __html: block.text || '' }}
          />
        );

      case 'button':
        return (
          <div
            key={block.id}
            className={`rich-text__buttons ${baseClasses}`}
            style={cascadeStyle}
            data-cascade
          >
            <a
              href={block.buttonLink || '#'}
              className={`button ${block.buttonStyle === 'secondary' ? 'button--secondary' : 'button--primary'}`}
              role="button"
            >
              {block.buttonLabel}
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={containerClasses}>
      <div className={richTextClasses}>
        <div className={wrapperClasses}>
          <div className={blocksClasses}>
            {blocks.map((block, index) => renderBlock(block, index))}
            {children}
          </div>
        </div>
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

        .rich-text {
          z-index: 1;
        }

        .rich-text__wrapper {
          display: flex;
          justify-content: center;
          width: calc(100% - 4rem / var(--font-body-scale));
        }

        .rich-text:not(.rich-text--full-width) .rich-text__wrapper {
          margin: auto;
          width: calc(100% - 8rem / var(--font-body-scale));
        }

        .rich-text__blocks {
          width: 100%;
        }

        @media screen and (min-width: 750px) {
          .rich-text__wrapper {
            width: 100%;
          }

          .rich-text__wrapper--left {
            justify-content: flex-start;
          }

          .rich-text__wrapper--right {
            justify-content: flex-end;
          }

          .rich-text__blocks {
            max-width: 50rem;
          }
        }

        @media screen and (min-width: 990px) {
          .rich-text__blocks {
            max-width: 78rem;
          }
        }

        .rich-text__blocks * {
          overflow-wrap: break-word;
        }

        .rich-text__blocks > * {
          margin-top: 0;
          margin-bottom: 0;
        }

        .rich-text__blocks > * + * {
          margin-top: 2rem;
        }

        .rich-text__blocks > * + a {
          margin-top: 3rem;
        }

        .rich-text__buttons {
          display: inline-flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          width: 100%;
          max-width: 45rem;
          word-break: break-word;
        }

        .rich-text__buttons--multiple > * {
          flex-grow: 1;
          min-width: 22rem;
        }

        .rich-text__buttons + .rich-text__buttons {
          margin-top: 1rem;
        }

        .rich-text__blocks.left .rich-text__buttons {
          justify-content: flex-start;
        }

        .rich-text__blocks.right .rich-text__buttons {
          justify-content: flex-end;
        }

        .rich-text__heading {
          margin-bottom: 0;
        }

        .rich-text__caption {
          margin: 0;
        }

        .rich-text__text {
          margin: 0;
        }

        .rich-text__text p {
          margin: 1rem 0;
        }

        .rich-text__text p:first-child {
          margin-top: 0;
        }

        .rich-text__text p:last-child {
          margin-bottom: 0;
        }

        /* Text styles */
        .subtitle {
          font-size: 1.8rem;
          line-height: 1.4;
          color: rgba(var(--color-foreground), 0.75);
        }

        .caption-with-letter-spacing {
          font-size: 1.2rem;
          letter-spacing: 0.07rem;
          text-transform: uppercase;
          color: rgba(var(--color-foreground), 0.75);
        }

        .subtitle--small,
        .caption-with-letter-spacing--small {
          font-size: 1.4rem;
        }

        .subtitle--medium,
        .caption-with-letter-spacing--medium {
          font-size: 1.6rem;
        }

        .subtitle--large,
        .caption-with-letter-spacing--large {
          font-size: 1.8rem;
        }
      `}</style>
    </div>
  );
}
