import { useEffect } from 'react';

export default function SeoHead({
  title = 'Free High-Quality Video & YouTube to MP3 Converter',
  description = 'Convert any video file (MP4, MOV, WebM, AVI, MKV) and YouTube link into pristine MP3 audio up to 320kbps. Fast, secure, completely free, and no sign-up required.',
  canonical = 'https://audivexa.com/'
}) {
  useEffect(() => {
    // Dynamic page title
    document.title = `${title} | Audivexa`;

    // Dynamic meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Dynamic OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${title} | Audivexa`);
    }
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // Dynamic Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, canonical]);

  return null;
}
