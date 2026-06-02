import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, Cpu, Lightbulb, Zap, ArrowRight, HelpCircle } from "lucide-react";
import SavingsCalculator from "@/components/SavingsCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-utils";

export default function EnergyStoragePage() {
  const serviceSchema = getServiceSchema(
    "Energy Storage Systems (ESS)",
    "Modular lithium battery systems for commercial and industrial use, providing peak load shaving, diesel generator replacement, and grid integration."
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Services", url: "https://poweradda.com/services" },
    { name: "Energy Storage Systems", url: "https://poweradda.com/services/energy-storage" }
  ]);

  const systemsList = [
    {
      title: "Lithium Battery Systems",
      desc: "High-density Lithium Iron Phosphate (LiFePO4) storage cells equipped with automatic diagnostic monitors and state-of-charge tracking."
    },
    {
      title: "Commercial ESS",
      desc: "Providing peak shaving strategies and demand charge protection for commercial office towers, hospitals, and server rooms."
    },
    {
      title: "Industrial ESS",
      desc: "Containerized, high-capacity modular storage blocks built to handle heavy electric profiles and transient machinery starts."
    },
    {
      title: "Backup Power Storage",
      desc: "UPS-grade millisecond transition units replacing noisy, polluting diesel generator sets during grid blackouts."
    },
    {
      title: "Renewable Integration",
      desc: "Storing excess daytime solar energy to run commercial assets cleanly long after sunset to maximize local clean production."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Industrial Segment
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Lithium Energy Storage Systems (BESS)
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          PowerAdda provides containerized, liquid-cooled, and modular Lithium BESS installations designed to manage industrial loads and reduce energy costs.
        </p>
      </section>

      {/* DETAILED FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative w-full h-[300px] md:h-[450px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://picsum.photos/seed/energystorage/600/500"
            alt="Advanced containerized battery arrays"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Intelligent Energy Management for High-Demand Grids
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            Designed to replace loud, fuel-expensive diesel engines, battery storage systems help factories and commercial buildings reduce peak load surcharges while providing reliable backup during outages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {systemsList.map((sys, idx) => (
              <div key={idx} className="space-y-1.5 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Cpu size={14} />
                  <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wide">
                    {sys.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {sys.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC CALCULATOR FOCUS */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              BESS Sizing Estimator
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Obtain Instant Energy Storage Estimates
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Analyze lithium capacity requirements, pricing multipliers, and ROI.
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </section>
    </div>
  );
}
