import { ResultOf } from 'gql.tada';

import { StoreLogoFragment } from '~/components/store-logo/fragment';

export const logoTransformer = (data: ResultOf<typeof StoreLogoFragment>) => {
  const { logoV2: logo } = data;

  if (logo.__typename === 'StoreTextLogo') {
    return logo.text;
  }

  // Replace {:size} with actual size for BigCommerce logo URLs
  const logoUrl = logo.image.url.replace('{:size}', '200x40');

  return { src: logoUrl, alt: logo.image.altText };
};
