'use client';

import { useEffect } from 'react';

export function ScriptLoader() {
  useEffect(() => {
    // Load global.js which contains custom element definitions
    const globalScript = document.createElement('script');
    globalScript.src = '/styles/global.js';
    globalScript.async = true;
    document.head.appendChild(globalScript);

    // Load other necessary JavaScript files
    const cartScript = document.createElement('script');
    cartScript.src = '/styles/cart.js';
    cartScript.async = true;
    document.head.appendChild(cartScript);

    const cartDrawerScript = document.createElement('script');
    cartDrawerScript.src = '/styles/cart-drawer.js';
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
