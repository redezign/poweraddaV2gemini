import React from "react";
import Image from "next/image";
import { Handshake, Shield, Truck, ClipboardList, HelpCircle } from "lucide-react";
import VendorRegistrationForm from "@/components/VendorRegistrationForm";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function VendorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Vendor Partnership", url: "https://poweradda.com/vendor" }
  ]);

  const valueProps = [
    {
      title: "Streamlined Procurement Flow",
      desc: "Our localized network forwards purchase orders matching your physical warehouses directly, lowering storage overheads."
    },
    {
      title: "Reliable Settlement Cycles",
      desc: "Standardized accounts interface with rapid corporate clearances so your manufacturing lines stay active."
    },
    {
      title: "Nationwide Logistics Coverage",
      desc: "Get access to bulk orders from Mumbai, Thane, Ratnagiri, and up to the north-eastern territories."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Partner Ecosystem
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Join the PowerAdda Partner Network
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          Are you an accredited manufacturer, distributor, or EPC contractor? Integrate with our platform to connect with high-intent corporate and residential projects.
        </p>
      </section>

      {/* ONBOARDING DETAIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Expand Your Service and Operational Reach
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            By joining the PowerAdda supplier ecosystem, you can access verified project pipelines directly without high business acquisition costs. We verify each client&apos;s physical parameters before sending you structured RFPs.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="flex items-start space-x-3.5">
                <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg shrink-0 mt-0.5">
                  <Handshake size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-extrabold text-slate-800">{prop.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed">
                    {prop.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100/80 mt-6">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">Important Notice</span>
            <p className="text-xs text-slate-600 font-light mt-1 leading-relaxed">
              PowerAdda maintains a strict vetting process. Vendors must provide proof of GST registration, certified hardware testing, and a minimum 3-year history of clean EPC project delivery.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <VendorRegistrationForm />
        </div>
      </section>
    </div>
  );
}
