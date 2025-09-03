'use client';

import Script from 'next/script';

export function JayBharatScripts() {
  return (
    <>
      {/* Load all Shopify theme JavaScript files - Core functionality */}
      <Script
        src="/js/constants.js"
        strategy="afterInteractive"
        id="jay-bharat-constants"
      />
      <Script
        src="/js/pubsub.js"
        strategy="afterInteractive"
        id="jay-bharat-pubsub"
      />
      <Script
        src="/js/global.js"
        strategy="afterInteractive"
        id="jay-bharat-global"
      />
      
      {/* Animation and Visual Effects */}
      <Script
        src="/js/animations.js"
        strategy="afterInteractive"
        id="jay-bharat-animations"
      />
      
      {/* Cart Functionality */}
      <Script
        src="/js/cart.js"
        strategy="afterInteractive"
        id="jay-bharat-cart"
      />
      <Script
        src="/js/cart-notification.js"
        strategy="afterInteractive"
        id="jay-bharat-cart-notification"
      />
      <Script
        src="/js/cart-drawer.js"
        strategy="afterInteractive"
        id="jay-bharat-cart-drawer"
      />
      
      {/* Product Functionality */}
      <Script
        src="/js/product-form.js"
        strategy="afterInteractive"
        id="jay-bharat-product-form"
      />
      <Script
        src="/js/product-info.js"
        strategy="afterInteractive"
        id="jay-bharat-product-info"
      />
      <Script
        src="/js/product-modal.js"
        strategy="afterInteractive"
        id="jay-bharat-product-modal"
      />
      <Script
        src="/js/product-model.js"
        strategy="afterInteractive"
        id="jay-bharat-product-model"
      />
      <Script
        src="/js/quick-add.js"
        strategy="afterInteractive"
        id="jay-bharat-quick-add"
      />
      <Script
        src="/js/quick-add-bulk.js"
        strategy="afterInteractive"
        id="jay-bharat-quick-add-bulk"
      />
      <Script
        src="/js/quick-order-list.js"
        strategy="afterInteractive"
        id="jay-bharat-quick-order-list"
      />
      <Script
        src="/js/quantity-popover.js"
        strategy="afterInteractive"
        id="jay-bharat-quantity-popover"
      />
      <Script
        src="/js/price-per-item.js"
        strategy="afterInteractive"
        id="jay-bharat-price-per-item"
      />
      <Script
        src="/js/recipient-form.js"
        strategy="afterInteractive"
        id="jay-bharat-recipient-form"
      />
      
      {/* Search Functionality */}
      <Script
        src="/js/predictive-search.js"
        strategy="afterInteractive"
        id="jay-bharat-predictive-search"
      />
      <Script
        src="/js/search-form.js"
        strategy="afterInteractive"
        id="jay-bharat-search-form"
      />
      <Script
        src="/js/main-search.js"
        strategy="afterInteractive"
        id="jay-bharat-main-search"
      />
      <Script
        src="/js/facets.js"
        strategy="afterInteractive"
        id="jay-bharat-facets"
      />
      
      {/* UI Components and Interactions */}
      <Script
        src="/js/details-disclosure.js"
        strategy="afterInteractive"
        id="jay-bharat-details-disclosure"
      />
      <Script
        src="/js/details-modal.js"
        strategy="afterInteractive"
        id="jay-bharat-details-modal"
      />
      <Script
        src="/js/media-gallery.js"
        strategy="afterInteractive"
        id="jay-bharat-media-gallery"
      />
      <Script
        src="/js/magnify.js"
        strategy="afterInteractive"
        id="jay-bharat-magnify"
      />
      <Script
        src="/js/show-more.js"
        strategy="afterInteractive"
        id="jay-bharat-show-more"
      />
      <Script
        src="/js/share.js"
        strategy="afterInteractive"
        id="jay-bharat-share"
      />
      
      {/* Customer and Account Features */}
      <Script
        src="/js/customer.js"
        strategy="afterInteractive"
        id="jay-bharat-customer"
      />
      <Script
        src="/js/password-modal.js"
        strategy="afterInteractive"
        id="jay-bharat-password-modal"
      />
      
      {/* Localization and Forms */}
      <Script
        src="/js/localization-form.js"
        strategy="afterInteractive"
        id="jay-bharat-localization-form"
      />
      <Script
        src="/js/pickup-availability.js"
        strategy="afterInteractive"
        id="jay-bharat-pickup-availability"
      />
      
      {/* Theme Editor (for admin/customization) */}
      <Script
        src="/js/theme-editor.js"
        strategy="afterInteractive"
        id="jay-bharat-theme-editor"
      />
      
      {/* Initialize Jay Bharat specific functionality */}
      <Script
        id="jay-bharat-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Jay Bharat Restaurant - Initialize theme functionality
            document.addEventListener('DOMContentLoaded', function() {
              console.log('Jay Bharat Restaurant theme loaded');
              
              // Initialize animations if not already done
              if (typeof initializeScrollAnimationTrigger === 'function') {
                initializeScrollAnimationTrigger();
              }
              
              if (typeof initializeScrollZoomAnimationTrigger === 'function') {
                initializeScrollZoomAnimationTrigger();
              }
              
              // Add Jay Bharat specific hover effects
              const productCards = document.querySelectorAll('.product-card, .card, [class*="card"]');
              productCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                  card.style.transform = 'translateY(-5px)';
                  card.style.boxShadow = '0 10px 25px rgba(55, 36, 30, 0.15)';
                  card.style.transition = 'all 0.3s ease';
                });
                
                card.addEventListener('mouseleave', () => {
                  card.style.transform = 'translateY(0)';
                  card.style.boxShadow = '0 2px 10px rgba(55, 36, 30, 0.1)';
                });
              });
              
              // Enhance navigation with Jay Bharat styling
              const navLinks = document.querySelectorAll('nav a, .navigation a, [role="navigation"] a');
              navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                  link.style.backgroundColor = 'var(--jay-bharat-white)';
                  link.style.color = 'var(--jay-bharat-rich-brown)';
                  link.style.transition = 'all 0.3s ease';
                });
                
                link.addEventListener('mouseleave', () => {
                  link.style.backgroundColor = 'transparent';
                  link.style.color = 'var(--jay-bharat-dark-brown)';
                });
              });
              
              // Add fade-in animation to elements
              const elementsToAnimate = document.querySelectorAll('.fade-in-up, .product-card, .card');
              elementsToAnimate.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.transitionDelay = index * 0.1 + 's';
                
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                      observer.unobserve(entry.target);
                    }
                  });
                }, { threshold: 0.1 });
                
                observer.observe(element);
              });
            });
          `
        }}
      />
    </>
  );
}
