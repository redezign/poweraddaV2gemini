import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, HelpCircle, CheckCircle, ShieldAlert } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-utils";

export default function AutomotiveBatteriesPage() {
  const serviceSchema = getServiceSchema(
    "Automotive Batteries",
    "Premium, high-cranking replacement batteries for cars, SUVs, and heavy duty commercial fleets across Mumbai and India."
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Services", url: "https://poweradda.com/services" },
    { name: "Automotive Batteries", url: "https://poweradda.com/services/automotive-batteries" }
  ]);

  const items = [
    { title: "Car Batteries", desc: "A custom range of maintenance-free calcium-silver alloy batteries for compact & premium passenger cars." },
    { title: "SUV Batteries", desc: "Heavy mechanical stability and deep reserves configured to withstand extreme off-road driving and high heat." },
    { title: "Commercial Vehicles", desc: "Heavy-duty cells designed for non-stop fleets, logistics cargo trucks, and loaders." },
    { title: "Replacement Batteries", desc: "We provide hassle-free old block trade-ins with instant environmental recycling cashbacks." },
    { title: "Battery Testing", desc: "A rigorous point checkout assessing State of Charge (SoC), Cold Cranking Amps (CCA), and internal electrical impedance." },
    { title: "Battery Installation", desc: "A speedy physical setup managed by certified technicians supporting memory saver backups." }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Automotive Segment
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          High-Performance Automotive Batteries
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          PowerAdda coordinates high-performing initial-crank batteries engineered for maximum life, vibration containment, and zero maintenance in Indian driving conditions.
        </p>
      </section>

      {/* PRODUCT CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative w-full h-[300px] md:h-[400px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://picsum.photos/seed/autobattery/600/500"
            alt="Premium automotive batteries"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Durable Power for Mobility & Fleet Logistics
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            From dense city traffic to nationwide logistics runs, your vehicles demand clean, responsive electrical output. Our selected models are designed to minimize self-discharge and corrosion over a long service life.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {items.map((it, idx) => (
              <div key={idx} className="space-y-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Zap size={14} />
                  <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">
                    {it.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {it.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECYCLING NOTICE & BANNER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-sans font-bold text-slate-800">
                Eco-Friendly Scrap Battery Trade-In
              </h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Receive certified recycling discounts. Trade in your old, exhausted car or inverter blocks during delivery to obtain instant environmental rebates. Fully compliant with state pollution guidelines.
              </p>
            </div>
          </div>
          <Link
            href="/contact#contact-form-section"
            className="bg-slate-900 text-white font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors shrink-0 text-center w-full md:w-auto"
          >
            Apply Discount
          </Link>
        </div>
      </section>
    </div>
  );
}
