import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://qttn.net';
const SITE_NAME = 'Ismail Qattan';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo-dark.png`;

interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

export function SEO({ title, description, canonicalPath, ogImage }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
}
