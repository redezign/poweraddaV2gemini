import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Battery, ShieldCheck, CheckCircle2, Award } from "lucide-react";
import SavingsCalculator from "@/components/SavingsCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-utils";

export default function InverterBatteriesPage() {
  const serviceSchema = getServiceSchema(
    "Inverter Batteries",
    "Heavy-duty tubular and flat plate backup batteries designed for homes and small businesses experiencing periodic grid instability."
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Services", url: "https://poweradda.com/services" },
    { name: "Inverter Batteries", url: "https://poweradda.com/services/inverter-batteries" }
  ]);

  const specs = [
    { title: "Tubular Batteries", desc: "Featuring heavy-duty tall tubular structures built to withstand deep charge and discharge cycles, with high thermal tolerances." },
    { title: "Flat Plate Batteries", desc: "Compact footprint and fast charging, best suited for areas with short, localized brownouts." },
    { title: "Home Backup Solutions", desc: "Reliable power storage designed to run household lights, fans, IT routing, and cooling safely." },
    { title: "Office Backup Solutions", desc: "Continuous backup to keep servers, retail checkout machines, and workspace lighting stable." },
    { title: "Battery Replacement", desc: "Easy, hassle-free upgrades with environmental recycling compliance and quick on-site testing." }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Inverter Backup Division
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Heavy-Duty Inverter Batteries
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          PowerAdda provides premium, long-cycle inverter batteries engineered to handle regular power outages with minimal maintenance requirements.
        </p>
      </section>

      {/* DETAIL CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 lg:order-last relative w-full h-[300px] md:h-[400px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://picsum.photos/seed/invertersite/600/500"
            alt="Double backup home inverter unit"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Durable Tubular Designs for Lasting Backup
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            Conventional batteries can suffer damage when deeply discharged during long grid outages. Our tall tubular models use thicker plates and premium separators, keeping your home or business running safely and reliably.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-100">
            {specs.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3.5">
                <div className="bg-emerald-50 text-emerald-600 p-1 rounded-lg shrink-0 mt-0.5">
                  <Battery size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-extrabold text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
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
              Inverter Backup Estimator
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Obtain Instant Home & Office Backup Sizing
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Analyze battery capacities in Ah, package configurations, and product lifespans.
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </section>
    </div>
  );
}
