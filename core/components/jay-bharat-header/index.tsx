import { cache } from 'react';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { getCartId, getSessionCustomerAccessToken } from '~/lib/auth';
import { getJayBharatNavigationLinks } from '~/lib/navigation-config';
import { logoTransformer } from '~/lib/logo-transformer';
import { routing } from '~/i18n/routing';
import { Streamable } from '@/vibes/soul/lib/streamable';
import { HeaderSection } from '@/vibes/soul/sections/header-section';

const HeaderQuery = graphql(`
  query JayBharatHeaderQuery {
    site {
      settings {
        storeName
        logoV2 {
          __typename
          ... on StoreTextLogo {
            text
          }
          ... on StoreImageLogo {
            image {
              url: urlTemplate(lossy: true)
              altText
            }
          }
        }
      }
      currencies(first: 25) {
        edges {
          node {
            code
            isTransactional
            isDefault
          }
        }
      }
    }
  }
`);

const getCartCount = cache(async (cartId: string, customerAccessToken?: string) => {
  const { data: response } = await client.fetch({
    document: graphql(`
      query GetCartCount($cartId: String!) {
        site {
          cart(entityId: $cartId) {
            lineItems {
              totalQuantity
            }
          }
        }
      }
    `),
    variables: { cartId },
    customerAccessToken,
    fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
  });

  return response.data.site.cart?.lineItems.totalQuantity ?? null;
});

const getHeaderData = cache(async () => {
  const { data: response } = await client.fetch({
    document: HeaderQuery,
    fetchOptions: { next: { revalidate } },
  });

  return response.data.site;
});

export const JayBharatHeader = async () => {
  const data = await getHeaderData();
  const logo = data.settings ? logoTransformer(data.settings) : '';

  const currencies = data.currencies.edges
    ? data.currencies.edges
        .filter(({ node }) => node.isTransactional)
        .map(({ node }) => ({
          id: node.code,
          label: node.code,
          isDefault: node.isDefault,
        }))
    : [];

  // Use custom navigation configuration
  const navigationLinks = getJayBharatNavigationLinks();

  const streamableLinks = Streamable.from(async () => {
    return navigationLinks.map((link) => ({
      label: link.label,
      href: link.href,
      groups: link.children?.map((child) => ({
        label: child.label,
        href: child.href,
        links: child.children?.map((grandChild) => ({
          label: grandChild.label,
          href: grandChild.href,
        })) || [],
      })) || [],
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

  const streamableActiveCurrencyId = Streamable.from(async () => {
    const customerAccessToken = await getSessionCustomerAccessToken();
    // You can implement currency detection logic here
    return currencies.find((currency) => currency.isDefault)?.id;
  });

  const locales = routing.locales.map((enabledLocales) => ({
    id: enabledLocales,
    label: enabledLocales.toLocaleUpperCase(),
  }));

  return (
    <HeaderSection
      navigation={{
        accountHref: '/account',
        cartCount: streamableCartCount,
        cartHref: '/cart',
        links: streamableLinks,
        logo: logo,
        logoHref: '/',
        logoLabel: data.settings?.storeName || 'Jay Bharat Restaurant',
        searchHref: '/search',
        locales,
        activeLocaleId: 'en', // You can make this dynamic
        currencies,
        activeCurrencyId: streamableActiveCurrencyId,
      }}
    />
  );
};
