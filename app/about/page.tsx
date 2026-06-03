import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Shield, CheckCircle2, TrendingUp, Users, Leaf, ArrowRight } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "About Us", url: "https://poweradda.com/about" }
  ]);

  const coreValues = [
    {
      title: "Trust",
      desc: "Providing transparent calculations, certified hardware, and genuine warranty fulfillment across every engineering cycle."
    },
    {
      title: "Innovation",
      desc: "Leveraging state-of-the-art battery management (BMS) telemetry, microinverter performance, and modern high-density chemistries."
    },
    {
      title: "Sustainability",
      desc: "Removing noisy, polluting diesel engine back-ups from businesses and replacing them with zero-emission local arrays."
    },
    {
      title: "Customer Success",
      desc: "Delivering customized power solutions with reliable ROI calculations, fast communication, and local support."
    },
    {
      title: "Technical Excellence",
      desc: "Our systems are engineered by accredited personnel to ensure strict structural compliance and lasting efficiency."
    }
  ];

  const stats = [
    { label: "Active Suppliers & Installers", value: "85+" },
    { label: "Clean Infrastructure Installed", value: "1.2 MWp+" },
    { label: "Carbon Offsets Enabled (Annual)", value: "950 Tons" },
    { label: "Client Recommendation Rate", value: "99.4%" }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
            About PowerAdda
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Powering Smarter Energy Decisions
          </h1>
          <p className="text-slate-600 text-base md:text-lg lg:text-xl font-light leading-relaxed">
            PowerAdda was established as Mumbai&apos;s clean-energy consulting platform to simplify access to reliable power backup, renewable integration, high-density storage, and sustainable clean energy technologies across India.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative w-full h-[320px] md:h-[450px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://picsum.photos/seed/aboutstory/600/500"
            alt="PowerAdda team coordination"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            Bridging the Gap for Premium Renewable Operations
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            The decision to adopt clean energy or upgrade critical battery backup can often feel overwhelming. Conflicting brand specs, lack of price clarity, and uncertified installer pools represent constant barriers. PowerAdda was founded to bridge these exact gaps.
          </p>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            By acting as an independent, technical advisory ecosystem, we evaluate our clients&apos; unique electricity bills and roof patterns to suggest the ideal solar capacity, battery architecture, and inverters. We handle all approvals, safety inspections, and warranties seamlessly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">Our Philosophy</span>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Empowering businesses with structured, transparent, independent recommendations.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">Our Reach</span>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Operating a physical office in Andheri West, Mumbai, with coordinated logistics networks nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((st, idx) => (
              <div key={idx} className="text-center space-y-2">
                <span className="block text-3xl md:text-5xl font-display font-extrabold text-emerald-400">
                  {st.value}
                </span>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION, VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <Leaf size={24} />
          </div>
          <h3 className="text-xl font-sans font-bold text-slate-800">Our Strategic Mission</h3>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            To coordinate, audit, and simplify clean energy transitions. We want to enable homes, factories, and commercial centers to adopt high-performance rooftop solar arrays and backup storage configurations with minimal friction, maximum legal protection, and proven ROI support.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-sans font-bold text-slate-800">Our Corporate Vision</h3>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            To serve as India’s highest-rated consulting and system integration hub for customized battery and clean energy arrays. We intend to establish a verified partner database that standardizes quality guarantees and speeds up clean adoption across Indian metropolitan networks.
          </p>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
            Our Foundation
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900">
            Core Beliefs Anchoring Our Operations
          </h2>
          <p className="text-slate-500 text-sm font-light">
            We work towards high technical standards to ensure all customers receive lasting, reliable energy products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {coreValues.map((v) => (
            <div key={v.title} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-3">
              <h4 className="text-sm font-sans font-extrabold text-slate-800 uppercase tracking-wider">
                {v.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-900 rounded-3xl p-8 md:p-12 text-white flex flex-col lg:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-300 font-bold">
              Energy Assessment
            </span>
            <h2 className="text-2xl md:text-3.5xl font-display font-extrabold tracking-tight">
              Talk to an Expert Installer Today
            </h2>
            <p className="text-emerald-100 text-sm font-light leading-relaxed">
              Find out how easily your current property can accommodate high-performance rooftop solar panels or lithium backup. Get immediate feedback without complex forms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/contact#contact-form-section"
              className="inline-flex items-center justify-center space-x-2 bg-white text-slate-900 hover:bg-emerald-50 font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow text-center"
            >
              <span>Talk to an Energy Expert</span>
              <ArrowRight size={14} className="text-emerald-600" />
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all text-center border border-slate-800"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
