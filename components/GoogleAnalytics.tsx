"use client";

import React from "react";
import Script from "next/script";

export default function GoogleAnalytics() {
  const analyticsId = process.env.GOOGLE_ANALYTICS_ID;

  if (!analyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
