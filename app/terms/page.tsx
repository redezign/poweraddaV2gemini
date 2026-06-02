import React from "react";
import Link from "next/link";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function TermsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Terms & Conditions", url: "https://poweradda.com/terms" }
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-8 font-sans">
      <SchemaMarkup schema={breadcrumbSchema} />

      <div className="space-y-2">
        <span className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">Platform Conditions</span>
        <h1 className="text-3xl font-display font-extrabold text-slate-900">Terms & Conditions</h1>
        <p className="text-xs text-slate-400 font-mono">Effective: June 2026</p>
      </div>

      <div className="text-xs md:text-sm text-slate-600 space-y-6 font-light leading-relaxed">
        <p>
          Welcome to PowerAdda. By using our website and digital tools (including our Savings and ROI Calculator), you agree to these Terms and Conditions. If you do not accept these policies, please do not use our services.
        </p>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Savings Estimation Disclaimer
        </h2>
        <p>
          The metrics, payback timelines, of-grid capacities and environmental CO2 yields provided by our &quot;Calculate Your Savings&quot; tool are approximate estimates. They are designed for educational guidance and initial scoping, and do not constitute absolute structural guarantees. Real solar return models depend on weather patterns, shadow obstacles, equipment selection, and discom grid pricing adjustments under current Maharashtra policies.
        </p>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Submit Form Guidelines & Conduct
        </h2>
        <p>
          User is strictly forbidden from transferring fraudulent, malicious, or spam emails under our contact forms. All submissions must represent genuine, high-intent power requirements. System maintains automatic rate-limiting and logs IP footprints to prevent malicious form submissions.
        </p>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Governing Law
        </h2>
        <p>
          These conditions are governed by the laws of India, under the jurisdiction of the courts of Mumbai, Maharashtra.
        </p>

        <h2 className="text-base font-sans font-bold text-slate-800 uppercase tracking-wider mt-6 pt-4 border-t border-slate-100">
          Inquiries Support
        </h2>
        <p>
          Please email info@poweradda.com to resolve any operational doubts.
        </p>
      </div>
    </div>
  );
}
