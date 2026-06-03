"use client";

import React, { useState } from "react";
import { 
  Phone, Mail, MapPin, MessageSquare, ChevronDown, 
  HelpCircle, ChevronUp, ExternalLink, Battery, Sun, Wind, Handshake, Shield 
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const contactOptions = [
    {
      title: "WhatsApp Channel Support",
      value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+91 8655559777",
      desc: "Live immediate technical chat coordination with on-call system engineers.",
      href: `https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918655559777").replace(/[^0-9+]/g, "")}?text=Hi%20PowerAdda!%20I%20need%20help%20with%20a%20battery%2C%20solar%2C%20or%20inverter%20solution.%20Can%20you%20assist%3F`,
      label: "Open WhatsApp Chat",
      color: "border-emerald-100 hover:border-emerald-300 text-emerald-700 bg-emerald-50/50"
    },
    {
      title: "General Procurement Mailbox",
      value: "info@poweradda.com",
      desc: "Submit vendor catalog files, specification briefs, or commercial tenders directly.",
      href: "mailto:info@poweradda.com",
      label: "Send Business Email",
      color: "border-blue-100 hover:border-blue-300 text-blue-700 bg-blue-50/50"
    }
  ];

  const serviceCategoriesOverview = [
    { name: "Solar Energy Solutions", desc: "Residential micro-generation rooftop grid systems." },
    { name: "Automotive Batteries", desc: "High-cranking replacement lines for passenger and cargo fleets." },
    { name: "Inverter Batteries", desc: "Durable deep-cycle tubular cells for frequent home backups." },
    { name: "Energy Storage Systems", desc: "Smart commercial lithium storage blocks for peak load shaving." },
    { name: "Wind Energy Solutions", desc: "Coastal micro turbine projects and multi-source hybrid grids." }
  ];

  // Comprehensive FAQ list answering exact questions requested
  const faqs = [
    {
      category: "Solar Energy",
      icon: Sun,
      question: "How long does a standard rooftop solar deployment take in Mumbai?",
      answer: "A standard residential or commercial solar installation takes roughly 3 to 5 weeks. This timeline includes structural concrete load checks, hardware logistics delivery, physical mounting of aluminum frames and panels, and final bi-directional net-metering configuration with distribution companies (MSEDCL/Adani/Tata Power)."
    },
    {
      category: "Batteries",
      icon: Battery,
      question: "What is the warranty standard on tubular inverter batteries?",
      answer: "PowerAdda coordinates high-performing tall tubular inverter batteries that feature certified manufacturers' warranties ranging from 36 months up to 60+ months. These premium tubular grids offer deep discharge recovery and excellent water retention characteristics."
    },
    {
      category: "Energy Storage",
      icon: Shield,
      question: "Can a Lithium ESS (BESS) fully replace commercial diesel generator sets?",
      answer: "Yes. Advanced Lithium Iron Phosphate (LiFePO4) battery storage systems serve as silent, pollution-free alternatives to conventional diesel generator sets. A BESS provides millisecond-level power transitions to keep servers stable, eliminating fuel purchase needs, routine maintenance, and diesel fume emissions."
    },
    {
      category: "Wind Energy",
      icon: Wind,
      question: "Are micro wind turbines viable on standard rooftops in coastal Maharashtra?",
      answer: "Micro wind or vertical-axis turbines are highly viable in areas with consistent wind patterns, such as coastal towns, hill stations, and elevated agricultural campuses. Combining vertical turbines with solar panels creates a stable 24/7 hybrid clean grid."
    },
    {
      category: "Vendor Partnerships",
      icon: Handshake,
      question: "What compliance parameters must suppliers meet to join PowerAdda's registry?",
      answer: "Suppliers, installers, and manufacturers must provide matching business references, GST registration details, technical certificates validating material safety (such as IEC, BIS, or UL standards), and a proven 3-year track record of clean EPC deployment."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
        <span className="bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold border border-emerald-100">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Connect with PowerAdda Advising Desk
        </h1>
        <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          Whether you need domestic solar calculations or high-density backup layouts, we are available to assist you.
        </p>
      </section>

      {/* CORE CONTACT LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT COLUMN: INFO AND DIRECT CTAs */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Direct Channels & Offices
            </h2>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              We coordinate technical designs and hardware distribution across Mumbai, Thane, Ratnagiri, Pune, and India-wide centers. Contact our Andheri West office directly.
            </p>
          </div>

          {/* Quick Channels */}
          <div className="space-y-4">
            {contactOptions.map((opt, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all shadow-sm ${opt.color}`}
              >
                <div className="space-y-1.5">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-extrabold text-slate-800">
                    {opt.title}
                  </h3>
                  <p className="text-base font-bold text-slate-900 font-sans tracking-tight">
                    {opt.value}
                  </p>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
                <a
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 hover:underline"
                >
                  <span>{opt.label}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>

          {/* Address Details */}
          <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4 text-xs font-medium text-slate-600">
            <div className="flex items-start space-x-3">
              <MapPin size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-slate-800">Andheri West (HQ)</span>
                <span className="block text-slate-500 font-light mt-0.5 max-w-xs">
                  Nr. Vicino Mall, New Link Road, Oshiwara, Andheri West, Mumbai, Maharashtra 400102
                </span>
              </div>
            </div>
          </div>

          {/* Service Categories Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-extrabold">Active Services</span>
            <div className="divide-y divide-slate-100 text-xs">
              {serviceCategoriesOverview.map((item, id) => (
                <div key={id} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.name}</span>
                    <span className="text-[11px] text-slate-400 font-light block">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INQUIRY FORM */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      {/* COMPREHENSIVE FAQS SECTION */}
      <section className="bg-slate-50/50 border-t border-slate-100 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
              Inquiry Center
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Frequently Answered Solutions Metrics
            </h2>
            <p className="text-slate-500 text-xs font-light">
              Read technical parameters before initiating custom solar structural design reviews.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {faqs.map((faq, idx) => {
              const Icon = faq.icon;
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left text-xs md:text-sm font-sans font-bold text-slate-800 py-2 focus:outline-none focus:text-emerald-600 transition-colors"
                  >
                    <span className="flex items-center space-x-2.5">
                      <Icon size={16} className="text-emerald-500 shrink-0" />
                      <span>[{faq.category}] {faq.question}</span>
                    </span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div className="pl-6.5 pr-4 pb-2 pt-1 text-xs text-slate-500 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
