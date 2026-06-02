import React from "react";
import { Sparkles, FileSpreadsheet, Headset } from "lucide-react";
import RequestQuoteForm from "@/components/RequestQuoteForm";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function RequestQuotePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Request Quote", url: "https://poweradda.com/request-quote" }
  ]);

  return (
    <div className="space-y-16 py-10 md:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Conversion Desk
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Obtain Your Customized Technical Proposal
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          Provide your energy requirements, budget constraints, and site parameters below. We coordinate design blueprints and equipment pricing to deliver exact ROI estimates.
        </p>
      </section>

      {/* CONVERSION PANEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Value Points */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900">
            What Happens Next?
          </h2>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Following your submission, we handle all the heavy lifting to deliver competitive pricing options from our certified partner database.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-sm font-sans font-extrabold text-slate-800">1. Physical Site Estimation</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed">
                  We run rooftop shadow simulations based on local irradiance maps in Ratnagiri, Pune, Thane or Mumbai.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl shrink-0">
                <FileSpreadsheet size={16} />
              </div>
              <div>
                <h4 className="text-sm font-sans font-extrabold text-slate-800">2. Structured BOM (Bill of Materials)</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed">
                  You obtain certified documentation indicating exactly what panel brand (e.g. monocrystalline), structure steel alloy, and cables are proposed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl shrink-0">
                <Headset size={16} />
              </div>
              <div>
                <h4 className="text-sm font-sans font-extrabold text-slate-800">3. Local Subsidies & Approvals</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed">
                  We handle the complete application framework under current Maharashtra policy to ensure your net-metering works without hassle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7">
          <RequestQuoteForm />
        </div>
      </section>
    </div>
  );
}
