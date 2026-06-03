export function getOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poweradda.com";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PowerAdda",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "alternateName": "PowerAdda Renewable Energy",
    "sameAs": [
      "https://www.facebook.com/poweradda",
      "https://twitter.com/poweradda",
      "https://www.linkedin.com/company/poweradda"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918655559777",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };
}

export function getLocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poweradda.com";
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PowerAdda",
    "image": [`${siteUrl}/images/hero-solar.jpg`],
    "@id": `${siteUrl}/#localbusiness`,
    "url": siteUrl,
    "telephone": process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918655559777",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Vicino Mall, Andheri West",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400102",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.151571,
      "longitude": 72.834216
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [],
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Mumbai"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Maharashtra"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ]
  };
}

export function getServiceSchema(name: string, description: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poweradda.com";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Clean Energy Solutions",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PowerAdda",
      "url": siteUrl
    },
    "name": name,
    "description": description,
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getArticleSchema(post: {
  title: string;
  description: string;
  publishDate: string;
  slug: string;
  author: string;
  featuredImage: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://poweradda.com";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": [post.featuredImage],
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "PowerAdda",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": `${siteUrl}/insights/${post.slug}`
  };
}
