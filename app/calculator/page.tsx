import React from "react";
import { Metadata } from "next";
import { Calculator, HelpCircle, FileText, CheckCircle, Info } from "lucide-react";
import SavingsCalculator from "@/components/SavingsCalculator";
import ContactForm from "@/components/ContactForm";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBreadcrumbSchema } from "@/lib/schema-utils";

export const metadata: Metadata = {
  title: "Calculate Your Savings | Interactive Energy & Solar ROI Tool",
  description: "Use PowerAdda's interactive energy calculator to estimate installation capacity, monthly/lifetime savings, and ROI for Solar PV panels, Lithium Energy Storage Systems (BESS), and Inverter Backups in Mumbai & India.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://poweradda.com" },
    { name: "Interactive Savings Tool", url: "https://poweradda.com/calculator" }
  ]);

  const faqs = [
    {
      q: "How accurate are these savings and payback (ROI) forecasts?",
      a: "Our calculator utilizes standard irradiance coefficients in Western Maharashtra (average 4.5 peak sun-hours daily) and regional distributor tariff slabs (e.g., MSEDCL, Tata Power, Adani, BEST). While these are highly precise, conservative templates, final savings might vary based on your structural shading from neighboring buildings, layout angles, and seasonal climate factors. On-site technical audits stabilize these numbers into legal guarantees."
    },
    {
      q: "What is Net Metering and why does it affect solar payback cycles?",
      a: "In Maharashtra under MERC net-metering guidelines, any excess clean solar energy your rooftop generates that is not consumed in your property is automatically exported back to the utility grid. Your distributor awards you credits that offset your nighttime grid consumption. This credits dynamic makes grid-tied solar extremely lucrative, bringing down ROI payback cycles to under 4-5 years."
    },
    {
      q: "Why is a Lithium BESS capital cost higher than tubular inverter setups?",
      a: "Lithium Iron Phosphate (LiFePO4) Energy Storage Systems (BESS) are industrial-grade platforms offering 10 to 15 years of robust lifespans (4,000+ deep cycles) and ultra-rapid switching (sub-10 milliseconds). Lead-acid tubular systems are designed for home back-ups with regular lifespans of 5-7 years and slower switching. High thermal management and peak load shaving/TOD benefits make BESS more viable for heavier commercial or industrial profiles."
    },
    {
      q: "Can a battery or solar system fully replace my commercial diesel generators?",
      a: "Yes, our high-density Lithium BESS configurations are specifically engineered to serve as silent, zero-emission replacements for polluting diesel generator sets. BESS offers immediate millisecond power transitions to safeguard sensitive IT servers during brownouts, completely bypassing routine generator maintenance and fuel/diesel purchasing cycles."
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28 py-10 md:py-16">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full font-bold border border-emerald-100">
            <Calculator size={11} />
            <span>Independent Energy Analytics</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Calculate Your Clean Energy Savings & Payback
          </h1>
          <p className="text-slate-600 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Input your location and current energy usage to analyze the financial feasibility, capacity specifications, and carbon offset ratings for Solar Rooftops, Lithium Storage (BESS), and Inverter Batteries.
          </p>
        </div>
      </section>

      {/* DYNAMIC CALCULATOR INTERACTIVE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator />
      </section>

      {/* DETAILED ROADMAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
            Technical Audit Framework
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
            From Online Calculations To Physical Grid Integrations
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
            While digital estimators establish primary metrics, we follow a rigorous physical auditing process before dispatching any hardware. Our goal is to ensure a smooth, certified execution cycle that respects your structural boundaries:
          </p>

          <div className="space-y-4 pt-2">
            {[
              {
                title: "Load Profile Assessment",
                desc: "We analyze your 12-month utility log files to identify peak load surges, reactive power issues, and optimal sizing limits."
              },
              {
                title: "Structural & Shadow Mapping",
                desc: "Our structural engineers run building weight-load audits and perform shadow drone mapping to maximize solar panel layouts."
              },
              {
                title: "Regulatory MERC Submissions",
                desc: "From initial capacity feasibility registry to local utility net-metering approvals and physical meter installations."
              }
            ].map((step, idx) => (
              <div key={idx} className="flex space-x-3.5">
                <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-1.5 rounded-lg h-fit shrink-0">
                  <CheckCircle size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-widest">{step.title}</h4>
                  <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVEALING FAQS */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <HelpCircle size={16} className="text-emerald-600" />
            <h3 className="text-xs font-sans font-extrabold text-slate-800 uppercase tracking-widest">
              Pricing & Technical FAQ
            </h3>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-xs font-sans font-bold text-slate-850">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM AS WELL */}
      <section id="contact-form-section" className="bg-slate-50 border-t border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
              Free Physical Audit
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900">
              Apply For a Technical Proposal
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Submit your average consumption, classification details, or specific generator backup concerns. Our technical advisors will run solar shading simulations or draft load distribution maps, delivering a free detailed report.
            </p>

            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start space-x-3.5">
              <Info size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-sans font-extrabold text-slate-800 uppercase tracking-widest">Immediate Expert Call</h4>
                <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                  Connect direct with an engineer to resolve net metering tariffs and structural roof loads.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
