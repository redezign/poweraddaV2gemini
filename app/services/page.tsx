import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Battery, Shield, Wind, Zap, ArrowRight } from "lucide-react";
import SavingsCalculator from "@/components/SavingsCalculator";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Services", url: "https://poweradda.com/services" }
  ]);

  const serviceCategories = [
    {
      title: "Solar Energy Solutions",
      slug: "solar",
      icon: Sun,
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      intro: "Save up to 90% on electricity bills using custom on-grid solar configurations.",
      details: [
        "Residential rooftop solar panels",
        "Commercial & industrial (C&I) installations",
        "Net metering permissions",
        "EPC engineering and routine O&M support"
      ],
      image: "https://picsum.photos/seed/solarlanding/500/350"
    },
    {
      title: "Automotive Batteries",
      slug: "automotive-batteries",
      icon: Zap,
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      intro: "Premium performance automotive cells with high cranking capacity and long warranties.",
      details: [
        "Car & SUV replacement batteries",
        "Heavy commercial truck batteries",
        "Expert on-site battery diagnostics",
        "Fast Andheri West delivery and installation"
      ],
      image: "https://picsum.photos/seed/autolanding/500/350"
    },
    {
      title: "Inverter Batteries",
      slug: "inverter-batteries",
      icon: Battery,
      bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Engineered heavy-duty tubular block batteries built for frequent local outages.",
      details: [
        "Deep-cycle heavy tubular models",
        "Compact flat-plate backup solutions",
        "Home backup custom setups",
        "Long-lasting power backup for small businesses"
      ],
      image: "https://picsum.photos/seed/inverterlanding/500/350"
    },
    {
      title: "Energy Storage Systems",
      slug: "energy-storage",
      icon: Shield,
      bg: "bg-slate-100 text-slate-800 border-slate-200",
      intro: "Scalable high-density lithium container arrays designed for key shaving operations.",
      details: [
        "Solar microgrid storage integrated arrays",
        "Peak load shaving and demand protection",
        "Noiseless, pollution-free diesel generator replacements",
        "Integrated central BMS safety protocols"
      ],
      image: "https://picsum.photos/seed/storagelanding/500/350"
    },
    {
      title: "Wind Energy Solutions",
      slug: "wind",
      icon: Wind,
      bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      intro: "Combined hybrid turbines harvesting coastal winds for stable output year-round.",
      details: [
        "Small-scale vertical axis arrays",
        "Wind resource assessments",
        "Feasibility and structural audits",
        "Combined wind-solar hybrid layouts"
      ],
      image: "https://picsum.photos/seed/windlanding/500/350"
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Core Solutions
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Comprehensive Power & Renewable Solutions
        </h1>
        <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
          PowerAdda coordinates high-performance green engineering, premium battery distribution, and comprehensive backup infrastructure across Indian regions.
        </p>
      </section>

      {/* DETAILED CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {serviceCategories.map((cat, idx) => {
          const Icon = cat.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={cat.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center border-b border-slate-100 pb-16 last:border-b-0 last:pb-0`}
            >
              <div className={`lg:col-span-5 ${isEven ? "lg:order-last" : ""} relative w-full h-[250px] md:h-[350px] bg-slate-50 rounded-2xl overflow-hidden shadow-md`}>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-710px) 100vw, 35vw"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className={`p-2.5 rounded-xl border w-fit ${cat.bg}`}>
                  <Icon size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
                  {cat.title}
                </h2>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  {cat.intro}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-light">
                  {cat.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/services/${cat.slug}`}
                    className="inline-flex items-center space-x-1.5 bg-slate-900 text-white font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    href="/request-quote"
                    className="inline-flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all"
                  >
                    Request Pricing
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CALCULATOR INTERACTIVE BLOCK */}
      <section className="bg-slate-50/50 border-y border-slate-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Clean Savings
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Calculate Your Custom System Cost & Design Options
            </h2>
          </div>
          <SavingsCalculator />
        </div>
      </section>
    </div>
  );
}
