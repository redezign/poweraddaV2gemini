import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wind, Shield, CheckCircle2, ChevronRight, MessageSquareQuote } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-utils";

export default function WindEnergyPage() {
  const serviceSchema = getServiceSchema(
    "Wind Energy Solutions",
    "Small wind systems, commercial turbine integrations, feasibility assessments, and hybrid project consulting for coastal and high-wind environments around India."
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Services", url: "https://poweradda.com/services" },
    { name: "Wind Energy Solutions", url: "https://poweradda.com/services/wind" }
  ]);

  const windServices = [
    {
      title: "Small Wind Systems",
      desc: "Designed using advanced vertical-axis micro turbines, delivering low-noise clean power for coastal properties and agricultural campuses."
    },
    {
      title: "Commercial Wind Projects",
      desc: "Comprehensive integration of megawatt-class wind turbines to supply continuous clean power to private distribution lines."
    },
    {
      title: "Wind Feasibility Studies",
      desc: "Detailed local wind velocity mapping, structural foundation tests, and predictive annual energy yield (AEP) modeling."
    },
    {
      title: "Project Consulting",
      desc: "Expert guidance through grid connectivity regulations, power purchase agreements (PPAs), and financial modeling."
    },
    {
      title: "O&M Services",
      desc: "Routine turbine checks, motor vibration monitoring, blade detailing, and rapid emergency support."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Wind Technology Core
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Wind & Wind-Solar Hybrid Solutions
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          PowerAdda designs and installs low-noise, highly efficient wind turbines and hybrid wind-solar systems for remote and high-wind locations.
        </p>
      </section>

      {/* DETAIL CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 lg:order-last relative w-full h-[300px] md:h-[450px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://picsum.photos/seed/windsite/600/500"
            alt="Commercial wind turbines"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Harnessing Coastal Wind Flow Resourcefully
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            While solar energy peaks during the day, wind resources often strengthen overnight. Combining vertical-axis turbines with solar panels can help coastal communities and industrial parks secure highly stable, 24/7 clean power.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            {windServices.map((sys, idx) => (
              <div key={idx} className="flex items-start space-x-3.5">
                <div className="bg-emerald-50 text-emerald-700 p-1 rounded-lg shrink-0 mt-0.5 animate-pulse">
                  <Wind size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-extrabold text-slate-800">{sys.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed">
                    {sys.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
