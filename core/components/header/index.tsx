import { getLocale, getTranslations } from 'next-intl/server';
import { cache } from 'react';

import { Streamable } from '@/vibes/soul/lib/streamable';
import { GetLinksAndSectionsQuery, LayoutQuery } from '~/app/[locale]/(default)/page-data';
import { getSessionCustomerAccessToken } from '~/auth';
import { client } from '~/client';
import { graphql, readFragment } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { TAGS } from '~/client/tags';
import { logoTransformer } from '~/data-transformers/logo-transformer';
import { routing } from '~/i18n/routing';
import { getCartId } from '~/lib/cart';
import { getPreferredCurrencyCode } from '~/lib/currency';
import { SiteHeader as HeaderSection } from '~/lib/makeswift/components/site-header';

import { search } from './_actions/search';
import { switchCurrency } from './_actions/switch-currency';
import { HeaderFragment, HeaderLinksFragment } from './fragment';

// Shopify-style CSS imports
const HeaderStyles = () => (
  <>
    <link rel="stylesheet" href="/styles/component-list-menu.css" media="print" onLoad={(e) => (e.currentTarget.media = 'all')} />
    <link rel="stylesheet" href="/styles/component-search.css" media="print" onLoad={(e) => (e.currentTarget.media = 'all')} />
    <link rel="stylesheet" href="/styles/component-menu-drawer.css" media="print" onLoad={(e) => (e.currentTarget.media = 'all')} />
    <link rel="stylesheet" href="/styles/component-cart-notification.css" media="print" onLoad={(e) => (e.currentTarget.media = 'all')} />
    <link rel="stylesheet" href="/styles/component-price.css" media="print" onLoad={(e) => (e.currentTarget.media = 'all')} />
    <link rel="stylesheet" href="/styles/component-mega-menu.css" media="print" onLoad={(e) => (e.currentTarget.media = 'all')} />
  </>
);

// WhatsApp floating button component
const WhatsAppButton = () => (
  <div className="whatsapp_fix active" aria-hidden="false">
    <a href="https://api.whatsapp.com/send?phone=919876543210&text=Hi, I would like to order from JBResturent">
      <img src="https://cdn.shopify.com/s/files/1/0790/5889/5154/files/whatsapp_icon_22271a5f-abce-4891-ae16-688c59f72375.png?v=1689142834" alt="WhatsApp" />
    </a>
  </div>
);

// Enhanced header styles
const HeaderEnhancedStyles = () => (
  <style jsx global>{`
    .whatsapp_fix {
      position: fixed;
      bottom: 40px;
      right: 20px;
      z-index: 100;
      -webkit-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    
    .whatsapp_fix a {
      float: left;
      display: flex;
      align-items: center;
      position: relative;
      background: #fff;
      padding: 10px;
      padding-right: 14px;
      color: #000;
      font-size: 14px;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      text-decoration: none;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .whatsapp_fix a img {
      display: inline-block;
      width: 35px;
      flex: 0 0 40px;
    }
    
    .whatsapp_fix a span {
      white-space: nowrap;
    }
    
    @media only screen and (max-width: 480px) {
      .whatsapp_fix {
        right: 20px;
        bottom: 20px;
      }
      .whatsapp_fix a {
        padding: 8px;
        font-size: 11px;
        padding-right: 10px;
      }
      .whatsapp_fix a img {
        width: 30px;
      }
      .whatsapp_fix a span {
        padding-right: 20px;
      }
    }
    
    /* Enhanced header styles */
    header-drawer {
      justify-self: start;
      margin-left: -1.2rem;
    }
    
    .menu-drawer-container {
      display: flex;
    }
    
    .list-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .list-menu--inline {
      display: inline-flex;
      flex-wrap: wrap;
    }
    
    summary.list-menu__item {
      padding-right: 2.7rem;
    }
    
    .list-menu__item {
      display: flex;
      align-items: center;
      line-height: calc(1 + 0.3 / var(--font-body-scale, 1));
    }
    
    .list-menu__item--link {
      text-decoration: none;
      padding-bottom: 1rem;
      padding-top: 1rem;
      line-height: calc(1 + 0.8 / var(--font-body-scale, 1));
    }
    
    @media screen and (min-width: 750px) {
      .list-menu__item--link {
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
      }
    }
    
    /* Sticky header styles */
    .header {
      padding: 12px 3rem 12px 3rem;
    }
    
    .section-header {
      position: sticky;
      margin-bottom: 0px;
    }
    
    @media screen and (min-width: 750px) {
      .section-header {
        margin-bottom: 0px;
      }
    }
    
    @media screen and (min-width: 990px) {
      .header {
        padding-top: 12px;
        padding-bottom: 12px;
      }
    }
    
    /* Header wrapper styles */
    .header-wrapper {
      background: var(--color-background);
      border-bottom: 1px solid var(--color-border);
    }
    
    .header-wrapper--border-bottom {
      border-bottom: 1px solid var(--color-border);
    }
    
    /* Header icons styles */
    .header__icons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .header__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s ease;
    }
    
    .header__icon:hover {
      background-color: var(--color-background-hover);
    }
    
    /* Cart count bubble */
    .cart-count-bubble {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--color-accent);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }
    
    /* Search styles */
    .header-search {
      position: relative;
    }
    
    .header-search input {
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 0.25rem;
      width: 200px;
    }
    
    /* Logo styles */
    .header__heading-logo-wrapper {
      display: flex;
      align-items: center;
    }
    
    .header__heading-logo {
      max-height: 50px;
      width: auto;
    }
    
    /* Responsive adjustments */
    @media screen and (max-width: 990px) {
      header-drawer {
        display: block;
      }
      
      .header__icons {
        gap: 0.5rem;
      }
      
      .header-search input {
        width: 150px;
      }
    }
    
    @media screen and (max-width: 750px) {
      .header {
        padding: 8px 1rem 8px 1rem;
      }
      
      .header-search input {
        width: 120px;
      }
    }
  `}</style>
);

const GetCartCountQuery = graphql(`
  query GetCartCountQuery($cartId: String) {
    site {
      cart(entityId: $cartId) {
        entityId
        lineItems {
          totalQuantity
        }
      }
    }
  }
`);

const getCartCount = cache(async (cartId: string, customerAccessToken?: string) => {
  const response = await client.fetch({
    document: GetCartCountQuery,
    variables: { cartId },
    customerAccessToken,
    fetchOptions: {
      cache: 'no-store',
      next: {
        tags: [TAGS.cart],
      },
    },
  });

  return response.data.site.cart?.lineItems.totalQuantity ?? null;
});

const getHeaderLinks = cache(async (customerAccessToken?: string) => {
  const { data: response } = await client.fetch({
    document: GetLinksAndSectionsQuery,
    customerAccessToken,
    // Since this query is needed on every page, it's a good idea not to validate the customer access token.
    // The 'cache' function also caches errors, so we might get caught in a redirect loop if the cache saves an invalid token error response.
    validateCustomerAccessToken: false,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  return readFragment(HeaderLinksFragment, response).site.categoryTree;
});

const getHeaderData = cache(async () => {
  const { data: response } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: { next: { revalidate } },
  });

  return readFragment(HeaderFragment, response).site;
});

export const Header = async () => {
  const t = await getTranslations('Components.Header');
  const locale = await getLocale();

  const data = await getHeaderData();

  const logo = data.settings ? logoTransformer(data.settings) : '';

  const locales = routing.locales.map((enabledLocales) => ({
    id: enabledLocales,
    label: enabledLocales.toLocaleUpperCase(),
  }));

  const currencies = data.currencies.edges
    ? data.currencies.edges
        // only show transactional currencies for now until cart prices can be rendered in display currencies
        .filter(({ node }) => node.isTransactional)
        .map(({ node }) => ({
          id: node.code,
          label: node.code,
          isDefault: node.isDefault,
        }))
    : [];

  const streamableLinks = Streamable.from(async () => {
    const customerAccessToken = await getSessionCustomerAccessToken();

    const categoryTree = await getHeaderLinks(customerAccessToken);

    /**  To prevent the navigation menu from overflowing, we limit the number of categories to 6.
   To show a full list of categories, modify the `slice` method to remove the limit.
   Will require modification of navigation menu styles to accommodate the additional categories.
   */
    const slicedTree = categoryTree.slice(0, 6);

    return slicedTree.map(({ name, path, children }) => ({
      label: name,
      href: path,
      groups: children.map((firstChild) => ({
        label: firstChild.name,
        href: firstChild.path,
        links: firstChild.children.map((secondChild) => ({
          label: secondChild.name,
          href: secondChild.path,
        })),
      })),
    }));
  });

  const streamableCartCount = Streamable.from(async () => {
    const cartId = await getCartId();
    const customerAccessToken = await getSessionCustomerAccessToken();

    if (!cartId) {
      return null;
    }

    return getCartCount(cartId, customerAccessToken);
  });

  const streamableActiveCurrencyId = Streamable.from(async (): Promise<string | undefined> => {
    const currencyCode = await getPreferredCurrencyCode();

    const defaultCurrency = currencies.find(({ isDefault }) => isDefault);

    return currencyCode ?? defaultCurrency?.id;
  });

  return (
    <>
      <HeaderStyles />
      <HeaderEnhancedStyles />
      <HeaderSection
        navigation={{
          accountHref: '/login',
          accountLabel: t('Icons.account'),
          cartHref: '/cart',
          cartLabel: t('Icons.cart'),
          searchHref: '/search',
          searchParamName: 'term',
          searchAction: search,
          searchInputPlaceholder: t('Search.inputPlaceholder'),
          searchSubmitLabel: t('Search.submitLabel'),
          links: streamableLinks,
          logo,
          mobileMenuTriggerLabel: t('toggleNavigation'),
          openSearchPopupLabel: t('Icons.search'),
          logoLabel: t('home'),
          cartCount: streamableCartCount,
          activeLocaleId: locale,
          locales,
          currencies,
          activeCurrencyId: streamableActiveCurrencyId,
          currencyAction: switchCurrency,
          switchCurrencyLabel: t('SwitchCurrency.label'),
        }}
      />
      <WhatsAppButton />
    </>
  );
};
