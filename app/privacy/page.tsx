import React from "react";
import Link from "next/link";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Privacy Policy", url: "https://poweradda.com/privacy" }
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-8 font-sans">
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="space-y-2">
        <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">Standard Disclosures</span>
        <h1 className="text-3xl font-display font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-400 font-mono">Last Updated: June 2026</p>
      </div>

      <div className="text-xs md:text-sm text-slate-600 space-y-6 font-light leading-relaxed">
        <p>
          At PowerAdda, available under poweradda.com, safeguarding consumer private metrics is a major focus. This Privacy Policy clarifies what collection models we maintain and how we utilize detailed lead variables.
        </p>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Information Storage and Routing
        </h2>
        <p>
          When you fill out our contact, quotation, or vendor onboarding forms, we request specific data (e.g., Name, email address, phone, structural requirements). These variables are strictly validated, processed on our serverless API, and routed to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Our consolidated sales log (Google Sheets database).</li>
          <li>Accredited local dispatch centers so technicians can schedule assessments on-site.</li>
          <li>Automatic administrator alerts managed through Resend.</li>
        </ul>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Security Controls & Turns Protecting Systems
        </h2>
        <p>
          We employ Cloudflare Turnstile to prevent automated script spamming, protecting form endpoints. Standard rate limiting prevents high-frequency form abuse. Your data remains fully secure on standard cloud platforms.
        </p>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Contact Disclosures
        </h2>
        <p>
          For regulatory inquiries about correct data sanitization, please reach out directly: info@poweradda.com.
        </p>
      </div>
    </div>
  );
}
