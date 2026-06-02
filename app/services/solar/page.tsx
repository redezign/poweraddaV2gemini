import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, CheckSquare, Zap, Shield, ArrowRight, HelpCircle } from "lucide-react";
import SavingsCalculator from "@/components/SavingsCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-utils";

export default function SolarServicePage() {
  const serviceSchema = getServiceSchema(
    "Solar Energy Solutions",
    "Residential, Commercial & Industrial Solar Rooftop systems with Net Metering support, EPC and professional maintenance across India."
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Services", url: "https://poweradda.com/services" },
    { name: "Solar Energy Solutions", url: "https://poweradda.com/services/solar" }
  ]);

  const solutions = [
    {
      title: "Residential Solar",
      desc: "Tailored rooftop installations designed to cut household utility bills by up to 90% while accessing grid stability rules."
    },
    {
      title: "Commercial Solar",
      desc: "High-yield monocrystalline systems helping commercial properties, office towers, and malls manage expensive tiered tariffs."
    },
    {
      title: "Industrial Solar",
      desc: "Heavy-duty industrial rooftop arrays engineered to withstand coastal winds, providing continuous generation for factories."
    },
    {
      title: "Rooftop Solar",
      desc: "Engineered structures optimized to utilize existing under-occupied flat concrete spaces across suburban Mumbai."
    },
    {
      title: "Ground Mounted Systems",
      desc: "Large-scale arrays customized for vacant plots, agricultural setups, and industrial campuses with peak irradiance focus."
    },
    {
      title: "Solar EPC Services",
      desc: "Turn-key Engineering, Procurement, and Construction covering site load tests, layout planning, hardware, and safety wiring."
    },
    {
      title: "Solar O&M Services",
      desc: "Preventative Operations & Maintenance including daily output tracking, string checks, automatic alerts, and cleaning."
    },
    {
      title: "Net Metering Assistance",
      desc: "Detailed regulatory filing coordination with MSEDCL, Tata Power, Adani and BEST to ensure seamless power export credit routing."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HERO HERO TITLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-12 text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full font-bold border border-emerald-100">
            Primary Division
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Solar Energy Solutions & EPC Excellence
          </h1>
          <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-xl mx-auto">
            PowerAdda designs and delivers professional rooftop and ground-mounted solar installations for residential, commercial, and industrial facilities in Mumbai and pan-India locations.
          </p>
        </div>
      </section>

      {/* COMPREHENSIVE TEXT BREAKOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 relative w-full h-[300px] md:h-[450px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://picsum.photos/seed/solarsite/600/500"
            alt="Accredited solar structure construction"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Unlocking Clean Power with Structural Intelligence
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            Transitioning to solar is a permanent infrastructural upgrade. PowerAdda takes care of every single step—running concrete load audits, assessing roof shading factors from neighboring flats, selecting premium materials, and handling all administrative submissions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {solutions.map((sol) => (
              <div key={sol.title} className="space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <CheckSquare size={16} />
                  <h3 className="text-sm font-sans font-extrabold text-slate-800">
                    {sol.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC CALCULATOR FOCUS */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Solar Cost Tool
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Obtain Instant Rooftop Capacity Estimates
            </h2>
          </div>
          <SavingsCalculator />
        </div>
      </section>

      {/* CTA DIVISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
            Apply Now
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold">
            Looking for a Solar Quote in Maharashtra or Pan-India?
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Submit your specific daily units and building location. Our administrative engineers will run a preliminary solar shading simulation and deliver a free structured proposal within 24 working hours.
          </p>
          <div className="pt-2 flex justify-center gap-3 flex-wrap">
            <Link
              href="/request-quote"
              className="bg-emerald-600 text-white font-sans font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Get Custom Quote
            </Link>
            <Link
              href="/contact#contact-form-section"
              className="bg-slate-800 text-white font-sans font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Consult with Engineer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
