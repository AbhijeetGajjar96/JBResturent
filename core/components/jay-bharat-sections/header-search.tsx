'use client';

import React, { useState, useRef, useEffect } from 'react';

interface HeaderSearchProps {
  inputId?: string;
  searchPlaceholder?: string;
  searchHref?: string;
  searchParamName?: string;
  searchSubmitLabel?: string;
  predictiveSearchEnabled?: boolean;
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  inputId = 'Search-In-Modal',
  searchPlaceholder = 'Search',
  searchHref = '/search',
  searchParamName = 'q',
  searchSubmitLabel = 'Search',
  predictiveSearchEnabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDetailsElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus input when opening
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const url = new URL(searchHref, window.location.origin);
      url.searchParams.set(searchParamName, searchTerm.trim());
      window.location.href = url.toString();
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
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

  return (
    <details 
      ref={modalRef}
      className={`header__search ${className}`}
      open={isOpen}
      onToggle={handleToggle}
    >
      <summary
        className="header__icon header__icon--search header__icon--summary link focus-inset modal__toggle"
        aria-haspopup="dialog"
        aria-label="Search"
        style={{ listStyle: 'none' }}
      >
        <span>
          <span className="svg-wrapper">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.72l5.4 5.4a.5.5 0 11-.71.71l-5.41-5.39z"
                fill="currentColor"
              />
            </svg>
          </span>
          {isOpen && (
            <span className="svg-wrapper header__icon-close">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 18 18" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1L1 17M1 1l16 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </span>
      </summary>
      
      {isOpen && (
        <div
          className="search-modal modal__content gradient"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="modal-overlay"></div>
          <div
            className="search-modal__content search-modal__content-bottom"
            tabIndex={-1}
          >
            <form 
              action={searchHref} 
              method="get" 
              role="search" 
              className="search search-modal__form"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <input
                  ref={inputRef}
                  className="search__input field__input"
                  id={inputId}
                  type="search"
                  name={searchParamName}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <label className="field__label" htmlFor={inputId}>
                  {searchPlaceholder}
                </label>
                <input type="hidden" name="options[prefix]" value="last" />
                
                {searchTerm && (
                  <button
                    type="button"
                    className="reset__button field__button"
                    aria-label="Clear search"
                    onClick={handleReset}
                  >
                    <span className="svg-wrapper">
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 18 18" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 1L1 17M1 1l16 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                )}
                
                <button 
                  className="search__button field__button" 
                  aria-label={searchSubmitLabel}
                  type="submit"
                >
                  <span className="svg-wrapper">
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 18 18" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.03 11.68A5.784 5.784 0 112.85 3.5a5.784 5.784 0 018.18 8.18zm.26 1.12a6.78 6.78 0 11.72-.72l5.4 5.4a.5.5 0 11-.71.71l-5.41-5.39z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              {predictiveSearchEnabled && (
                <div className="predictive-search predictive-search--header" tabIndex={-1}>
                  {isLoading && (
                    <div className="predictive-search__loading-state">
                      <div className="loading-spinner">
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 20 20" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3V1M10 19v-2M17 10h2M1 10h2M15.536 15.536L16.95 16.95M3.05 3.05l1.414 1.414M15.536 4.464L16.95 3.05M3.05 16.95l1.414-1.414"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
            
            <button
              type="button"
              className="search-modal__close-button modal__close-button link link--text focus-inset"
              aria-label="Close search"
              onClick={handleClose}
            >
              <span className="svg-wrapper">
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 18 18" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1L1 17M1 1l16 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .header__search {
          position: relative;
        }
        
        .header__icon--search {
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
        
        .header__icon--search:hover {
          color: var(--jay-bharat-golden-brown);
          transform: scale(1.1);
        }
        
        .search-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 10vh;
        }
        
        .search-modal__content {
          background: var(--jay-bharat-cream);
          border-radius: 8px;
          padding: 2rem;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          position: relative;
        }
        
        .search-modal__form {
          position: relative;
        }
        
        .field {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search__input {
          width: 100%;
          padding: 1rem 12rem 1rem 1rem;
          border: 2px solid var(--jay-bharat-golden-brown);
          border-radius: 4px;
          font-size: 1.1rem;
          background: white;
          color: var(--jay-bharat-dark-brown);
        }
        
        .search__input:focus {
          outline: none;
          border-color: var(--jay-bharat-dark-brown);
        }
        
        .field__label {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--jay-bharat-golden-brown);
          pointer-events: none;
          transition: all 0.3s ease;
        }
        
        .search__input:focus + .field__label,
        .search__input:not(:placeholder-shown) + .field__label {
          top: -0.5rem;
          font-size: 0.8rem;
          background: white;
          padding: 0 0.5rem;
        }
        
        .reset__button,
        .search__button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: var(--jay-bharat-golden-brown);
          border: none;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }
        
        .reset__button {
          right: 5rem;
          background: var(--jay-bharat-rich-brown);
        }
        
        .search__button {
          right: 1rem;
        }
        
        .reset__button:hover,
        .search__button:hover {
          transform: translateY(-50%) scale(1.1);
        }
        
        .search-modal__close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--jay-bharat-dark-brown);
          padding: 0.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .search-modal__close-button:hover {
          background: var(--jay-bharat-golden-yellow);
        }
        
        .predictive-search {
          margin-top: 1rem;
          min-height: 2rem;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 2rem;
        }
        
        .loading-spinner svg {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .svg-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .search-modal__content {
            width: 95%;
            padding: 1.5rem;
          }
          
          .search__input {
            padding-right: 10rem;
          }
        }
      `}</style>
    </details>
  );
};

export default HeaderSearch;
