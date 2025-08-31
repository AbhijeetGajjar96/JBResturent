'use client';

import { useEffect } from 'react';

export function ScriptLoader() {
  useEffect(() => {
    // Load global.js which contains custom element definitions for header
    const globalScript = document.createElement('script');
    globalScript.src = '/js/global.js';
    globalScript.async = true;
    document.head.appendChild(globalScript);

    // Load cart.js for cart functionality (cart count updates, cart interactions)
    const cartScript = document.createElement('script');
    cartScript.src = '/js/cart.js';
    cartScript.async = true;
    document.head.appendChild(cartScript);

    // Load cart-drawer.js for cart drawer functionality (clicking cart button)
    const cartDrawerScript = document.createElement('script');
    cartDrawerScript.src = '/js/cart-drawer.js';
    cartDrawerScript.async = true;
    document.head.appendChild(cartDrawerScript);

    return () => {
      // Cleanup scripts when component unmounts
      document.head.removeChild(globalScript);
      document.head.removeChild(cartScript);
      document.head.removeChild(cartDrawerScript);
    };
  }, []);

  return null; // This component doesn't render anything
}
