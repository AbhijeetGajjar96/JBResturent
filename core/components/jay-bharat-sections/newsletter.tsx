'use client';

import { useState, FormEvent } from 'react';

interface NewsletterProps {
  id?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  colorScheme?: string;
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  className?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

export function Newsletter({
  id = 'jay-bharat-newsletter',
  title = "Stay Updated",
  subtitle = "Subscribe to get special offers and updates from Jay Bharat Restaurant",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  colorScheme = 'scheme-1',
  fullWidth = false,
  paddingTop = 40,
  paddingBottom = 52,
  className = '',
  onSubmit
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setIsSuccess(false);
      return;
    }

    if (!email.includes('@')) {
      setMessage('Please enter a valid email address');
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      
      setMessage('Thank you for subscribing!');
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const containerClasses = `
    newsletter color-${colorScheme} gradient
    ${fullWidth ? 'newsletter--full-width' : ''}
    section-${id}-padding
    ${className}
  `.trim();

  return (
    <div className={containerClasses}>
      <div className={`newsletter__wrapper ${fullWidth ? 'page-width' : ''}`}>
        <div className="newsletter__content">
          {title && (
            <h2 className="newsletter__heading inline-richtext h1">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <div className="newsletter__subheading rte">
              <p>{subtitle}</p>
            </div>
          )}

          <form 
            className="newsletter-form" 
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="newsletter-form__field-wrapper">
              <div className="field">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="field__input"
                  required
                  disabled={isLoading}
                />
                <label className="field__label" htmlFor="email">
                  Email
                </label>
              </div>
              
              <button
                type="submit"
                className="newsletter-form__button field__button button button--primary"
                disabled={isLoading}
                aria-label="Subscribe to newsletter"
              >
                {isLoading ? 'Subscribing...' : buttonText}
              </button>
            </div>

            {message && (
              <div 
                className={`newsletter-form__message ${isSuccess ? 'form__message--success' : 'form__message--error'}`}
                role="alert"
              >
                {isSuccess && (
                  <svg 
                    className="icon icon-success" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                )}
                {!isSuccess && (
                  <svg 
                    className="icon icon-error" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                )}
                <span>{message}</span>
              </div>
            )}
          </form>
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

        .newsletter {
          text-align: center;
          isolation: isolate;
        }

        .newsletter__wrapper {
          max-width: 76rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .newsletter__content {
          max-width: 50rem;
          margin: 0 auto;
        }

        .newsletter__heading {
          margin: 0 0 2rem 0;
        }

        .newsletter__subheading {
          margin: 0 0 3rem 0;
        }

        .newsletter__subheading p {
          margin: 0;
          font-size: 1.6rem;
          line-height: 1.5;
          color: rgba(var(--color-foreground), 0.75);
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .newsletter-form__field-wrapper {
          display: flex;
          width: 100%;
          max-width: 50rem;
          gap: 1rem;
        }

        .field {
          position: relative;
          flex: 1;
        }

        .field__input {
          width: 100%;
          padding: 1.5rem 1rem 0.5rem;
          border: 0.1rem solid rgba(var(--color-foreground), 0.2);
          border-radius: var(--inputs-radius);
          background-color: rgb(var(--color-background));
          color: rgb(var(--color-foreground));
          font-size: 1.6rem;
          transition: border-color 0.2s ease;
        }

        .field__input:focus {
          outline: none;
          border-color: rgb(var(--color-foreground));
          box-shadow: 0 0 0 0.1rem rgb(var(--color-foreground));
        }

        .field__input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .field__label {
          position: absolute;
          top: 0.8rem;
          left: 1rem;
          font-size: 1.2rem;
          color: rgba(var(--color-foreground), 0.6);
          pointer-events: none;
          transition: all 0.2s ease;
        }

        .field__input:focus + .field__label,
        .field__input:not(:placeholder-shown) + .field__label {
          top: 0.4rem;
          font-size: 1rem;
        }

        .newsletter-form__button {
          padding: 1rem 2rem;
          border: none;
          border-radius: var(--buttons-radius);
          background-color: rgb(var(--color-button));
          color: rgb(var(--color-button-text));
          font-size: 1.4rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 12rem;
          white-space: nowrap;
        }

        .newsletter-form__button:hover:not(:disabled) {
          opacity: 0.9;
        }

        .newsletter-form__button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .newsletter-form__message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 0.4rem;
          font-size: 1.4rem;
          line-height: 1.4;
        }

        .form__message--success {
          background-color: rgba(46, 125, 50, 0.1);
          color: rgb(46, 125, 50);
          border: 0.1rem solid rgba(46, 125, 50, 0.2);
        }

        .form__message--error {
          background-color: rgba(211, 47, 47, 0.1);
          color: rgb(211, 47, 47);
          border: 0.1rem solid rgba(211, 47, 47, 0.2);
        }

        .icon {
          width: 1.6rem;
          height: 1.6rem;
          flex-shrink: 0;
        }

        @media screen and (max-width: 749px) {
          .newsletter-form__field-wrapper {
            flex-direction: column;
          }

          .newsletter-form__button {
            width: 100%;
          }

          .newsletter__wrapper {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}
