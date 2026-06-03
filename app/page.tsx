import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sun, Shield, Star, Users, Award, Battery, 
  Wind, Lightbulb, Zap, ArrowRight, ArrowUpRight, 
  Sparkles, CheckCircle2, Factory, Home, HelpCircle 
} from "lucide-react";
import SavingsCalculator from "@/components/SavingsCalculator";
import ContactForm from "@/components/ContactForm";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/schema-utils";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function HomePage() {
  const latestInsights = BLOG_POSTS.slice(0, 3);

  const orgSchema = getOrganizationSchema();
  const localSchema = getLocalBusinessSchema();

  const services = [
    {
      title: "Solar Energy Solutions",
      desc: "Residential, commercial & industrial rooftop arrays, Net Metering and professional Solar EPC/O&M support.",
      href: "/services/solar",
      icon: Sun,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      accent: "hover:border-emerald-500"
    },
    {
      title: "Automotive Batteries",
      desc: "Premium, high-cranking capacity replacement batteries for cars, SUVs, and heavy duty commercial fleets across Mumbai.",
      href: "/services/automotive-batteries",
      icon: Zap,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      accent: "hover:border-blue-500"
    },
    {
      title: "Inverter Batteries",
      desc: "Robust tubular and flat plate technologies engineered for continuous home and micro-office backup during outages.",
      href: "/services/inverter-batteries",
      icon: Battery,
      color: "text-emerald-700 bg-emerald-50 border-emerald-100",
      accent: "hover:border-emerald-600"
    },
    {
      title: "Energy Storage Systems",
      desc: "High-density Lithium BESS solutions engineered for peak shaving, diesel containment, and high-frequency workloads.",
      href: "/services/energy-storage",
      icon: Shield,
      color: "text-slate-800 bg-slate-100 border-slate-200",
      accent: "hover:border-slate-800"
    },
    {
      title: "Wind Energy Solutions",
      desc: "Small-scale turbines, combined hybrid grids, and professional feasibility reports for high wind resource zones.",
      href: "/services/wind",
      icon: Wind,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      accent: "hover:border-indigo-500"
    }
  ];

  const valueProps = [
    {
      title: "End-to-End Execution",
      desc: "From regulatory documentation like MERC submissions to hardware dispatch, installation, and O&M cycles."
    },
    {
      title: "Trusted Vendor Ecosystem",
      desc: "Only certified tier-1 equipment manufacturers, ensuring full warranty and safety validation."
    },
    {
      title: "Technical Expertise",
      desc: "Engineering lead solutions with detailed electrical audits, structural layouts, and customized system selection."
    },
    {
      title: "Customized Recommendations",
      desc: "We analyze your bill and space parameters to build matching proposals, never pushing generic sizes."
    },
    {
      title: "Fast Response Times",
      desc: "Our localized Mumbai-Thane supply networks guarantee quick delivery, on-site diagnostics, and servicing."
    }
  ];

  const processSteps = [
    { num: "01", name: "Discover", desc: "Share your current electricity metrics, property blueprint, and backup goals." },
    { num: "02", name: "Consult", desc: "Receive technical engineering recommendations and initial capacity reports." },
    { num: "03", name: "Design", desc: "Detailed localized design plans mapping structural layout, shadowing, and billing benefits." },
    { num: "04", name: "Deploy", desc: "Professional logistics delivery, rapid mounting mechanics, safety checks, and net-metering setup." },
    { num: "05", name: "Support", desc: "Ongoing O&M support, system efficiency reviews, and immediate dispatch warranty response." }
  ];

  const featuredProjects = [
    {
      title: "85kWp Commercial Rooftop Solar Array",
      location: "Thane, Maharashtra",
      type: "Commercial solar net-metered",
      desc: "Complete monocrystalline setup integrated with regional MSEDCL grid. Cut operating electricity bill by 78% for this distribution facility.",
      image: "https://picsum.photos/seed/projectsolar/600/400"
    },
    {
      title: "20kWh Modular Lithium ESS Deployment",
      location: "Andheri West, Mumbai",
      type: "High-density commercial battery backup",
      desc: "Seamless UPS-grade lithium backup replacing an old, polluting 35kVA diesel generator set for a corporate corporate bank.",
      image: "https://picsum.photos/seed/projectstorage/600/400"
    },
    {
      title: "Wind-Solar Hybrid Coastal Microgrid",
      location: "Ratnagiri, Maharashtra Coast",
      type: "Remote Industrial Power",
      desc: "Combined 15kWp solar with coastal micro-turbines. Fully stabilized off-grid operational security for this storage enterprise.",
      image: "https://picsum.photos/seed/projectwind/600/400"
    }
  ];

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Schema Injection */}
      <SchemaMarkup schema={orgSchema} />
      <SchemaMarkup schema={localSchema} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-8 md:pt-16 pb-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-100 font-semibold shadow-sm">
              <Sparkles size={12} className="animate-pulse" />
              <span>Mumbai’s Energy Solutions Partner</span>
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Mumbai’s Trusted Destination for <span className="text-emerald-600">Clean Power</span> Solutions
            </h1>

            <p className="text-slate-600 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
              PowerAdda helps homeowners, businesses, and industries reduce energy costs through solar, battery, storage, and renewable energy solutions. Serving Mumbai, Thane, Navi Mumbai, and pan-India projects successfully.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg text-center"
              >
                <span>Get Free Quote</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact#contact-form-section"
                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all text-center"
              >
                Talk To Expert
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div>
                <span className="block text-2xl md:text-3xl font-extrabold text-slate-800">100%</span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  MERC Net Metering Compliance
                </span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-extrabold text-slate-800">Tier-1</span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  Certified Vendors Only
                </span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-extrabold text-slate-800">24/7</span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                  Local Support Dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Energy themed premium illustration/image */}
          <div className="lg:col-span-5 relative w-full h-[300px] md:h-[450px] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <Image
              src="https://picsum.photos/seed/solarpanel/700/600"
              alt="Premium Solar & Clean Power Infrastructure"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-w-710px) 100vw, 50vw"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Soft decorative visual overlay cards */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/50 shadow-lg flex items-center space-x-2.5 max-w-[200px]">
              <div className="bg-emerald-500 text-white p-2 rounded-lg">
                <Sun size={16} />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">Solar Yield</span>
                <span className="block text-xs font-bold text-slate-800">Optimal Sunlight Hours</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 shadow-lg flex items-center space-x-2.5 max-w-[200px] text-white">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <Battery size={16} />
              </div>
              <div>
                <span className="block text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">Battery SOH</span>
                <span className="block text-xs font-bold text-emerald-400">100% Operational Status</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white rounded-xl border border-slate-100 text-emerald-600 shadow-sm shrink-0">
              <Award size={18} />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Expert Guidance</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Qualified energy technicians matching products strictly to your specific bills and space parameters.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white rounded-xl border border-slate-100 text-emerald-600 shadow-sm shrink-0">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Reliable Partners</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Our database coordinates only with certified producers, ensuring secure and direct warranties.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white rounded-xl border border-slate-100 text-emerald-600 shadow-sm shrink-0">
              <Star size={18} />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Quality Products</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                We design with high-density cells, microinverter configurations, and durable grade structural alloys.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
            <div className="p-3 bg-white rounded-xl border border-slate-100 text-emerald-600 shadow-sm shrink-0">
              <Users size={18} />
            </div>
            <div>
              <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Mumbai & Pan-India</h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Andheri West Corporate Desk combined with broad localized supply centers and support channels nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
            Tailored Clean Power Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900">
            Premium Solutions For Residential, Business & Industrial Grids
          </h2>
          <p className="text-slate-500 text-sm font-light">
            Empower your infrastructure with high-efficiency energy models backed by strict warranties and structured design checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className={`group p-6 rounded-2xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between ${svc.accent} duration-300`}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl border w-fit ${svc.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-sans font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    href={svc.href}
                    className="inline-flex items-center space-x-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 group-hover:text-emerald-600 group-hover:underline transition-all"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* REVOLUTIONARY INTERACTIVE CALCULATOR */}
      <section className="bg-slate-50/50 border-y border-slate-100 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Instant ROI Modeler
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Calculate Your System Yield & Savings
            </h2>
            <p className="text-xs text-slate-500 font-light">
              We help you preview solar ROI parameters using actual location-based utility averages.
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </section>

      {/* WHY CHOOSE POWERADDA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative w-full h-[300px] md:h-[450px] bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-xl">
          <Image
            src="https://picsum.photos/seed/cleanenergy/600/500"
            alt="Quality solar panel construction"
            fill
            className="object-cover"
            sizes="(max-w-710px) 100vw, 40vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
            <div className="text-white">
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">PowerAdda Standard</span>
              <span className="text-sm font-sans font-bold block mt-1">Maximum Irradiance Performance</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
            Why Partner with PowerAdda
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 leading-tight">
            Bridging Consumers and Tier-1 Renewable Power Solutions Safely
          </h2>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            Selecting standard solar, batteries, and backup setups is often filled with complicated metrics and non-compliant vendors. PowerAdda takes care of this, validating safety, structure loads, and local net-metering.
          </p>

          <div className="space-y-4 pt-2">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="flex items-start space-x-3.5">
                <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg border border-emerald-100 shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-slate-800">{prop.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-light leading-relaxed max-w-xl">
                    {prop.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="bg-slate-900 text-white py-16 md:py-24 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Execution Path
            </span>
            <h2 className="text-3xl font-display font-extrabold tracking-tight">
              Our 5-Step System Delivery Framework
            </h2>
            <p className="text-slate-400 text-xs font-light">
              How we take you from traditional high-cost utility grid setups to high-yield local backup structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 relative">
            {processSteps.map((step, idx) => (
              <div key={idx} className="space-y-4 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-4xl font-display font-extrabold text-emerald-500/30 group-hover:text-emerald-500/60 transition-colors">
                    {step.num}
                  </span>
                  {idx < 4 && (
                    <span className="hidden lg:block absolute right-[-15%] top-4 text-emerald-500/20 font-bold">
                      &rarr;
                    </span>
                  )}
                </div>
                <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider">
                  {step.name}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
            Realized Solar & Battery Work
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900">
            Showcasing Microgrids, Storage Backups & Rooftop Projects
          </h2>
          <p className="text-slate-500 text-sm font-light">
            Explore a few of our representative physical integrations delivered across Maharashtra and coastal India hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-md flex flex-col justify-between">
              <div>
                <div className="relative w-full h-[200px]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-710px) 100vw, 30vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 text-slate-800 text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-slate-200 shadow">
                    {p.type}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-600 font-bold block uppercase">
                    📍 {p.location}
                  </span>
                  <h3 className="text-base font-sans font-bold text-slate-800">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
              Knowledge Hub
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900">
              Latest Insights & Technical Analysis
            </h2>
            <p className="text-slate-500 text-sm font-light">
              Read current commentary on solar net metering, battery safety, global energy corridors, and smart grids.
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center space-x-1 bg-slate-900 text-white font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <span>View All Insights</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestInsights.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="relative w-full h-[180px]">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-710px) 100vw, 30vw"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded uppercase">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <span className="block text-[10px] font-mono text-slate-400 font-medium">
                    {new Date(post.publishDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h3 className="text-sm font-sans font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 font-light leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 border-t border-slate-100 mt-2">
                <span>By {post.author.split(" ")[0]}</span>
                <span className="flex items-center">
                  Read &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white border-t border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "2,500+", label: "Batteries Installed", icon: "⚡" },
              { value: "4.6 ★", label: "Customer Rating", icon: "⭐" },
              { value: "Since 2024", label: "Serving Mumbai", icon: "📍" },
              { value: "3 Zones", label: "Mumbai · Thane · Navi Mumbai", icon: "🗺️" },
            ].map((stat) => (
              <div key={stat.label} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-display font-extrabold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 font-light">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Section Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
              What Customers Say
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">
              Trusted across Mumbai
            </h2>
            <p className="text-slate-500 text-sm font-light max-w-lg mx-auto">
              Real feedback from homeowners and businesses we've served across Western, Central, and Navi Mumbai.
            </p>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul M.",
                location: "Andheri West",
                service: "Car Battery",
                review: "Battery replaced at my doorstep in under 30 minutes. Genuine Amaron with proper invoice and warranty card. Team was professional and on time. Will definitely call again.",
              },
              {
                name: "Sneha P.",
                location: "Thane West",
                service: "Inverter Battery",
                review: "Got my inverter battery replaced same day. They checked the existing setup, recommended the right capacity, and installed it cleanly. No upselling, honest pricing.",
              },
              {
                name: "Arjun K.",
                location: "Navi Mumbai",
                service: "Solar Energy",
                review: "Very knowledgeable team. They explained the net metering process clearly and helped with the MSEDCL paperwork. System has been running smooth for months now.",
              },
              {
                name: "Meera D.",
                location: "Bandra",
                service: "Bike Battery",
                review: "Quick, affordable, and hassle-free. Technician came to my building, replaced the battery in 20 minutes. Good genuine product with warranty. Highly recommend.",
              },
              {
                name: "Suresh N.",
                location: "Powai",
                service: "Car Battery",
                review: "Called at 10am, technician arrived by noon. Old battery picked up, new one installed. Transparent pricing — exactly what was quoted, nothing extra. Excellent service.",
              },
              {
                name: "Fatima R.",
                location: "Kurla",
                service: "Inverter Battery",
                review: "Finally found a reliable battery service in Mumbai. The team was courteous, explained everything before starting work, and cleaned up after. Very happy with the experience.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200 space-y-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  "{review.review}"
                </p>

                {/* Reviewer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-sans font-bold text-slate-800">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.location}</p>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">
                    {review.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-xs text-slate-400 font-light">
            ⭐ Reviews collected from WhatsApp, Google, and direct customer feedback.
          </p>

        </div>
      </section>

      {/* LEAD CAPTURE SYSTEM */}
      {/* LEAD CAPTURE SYSTEM */}
      <section id="contact-form-section" className="bg-slate-50 border-t border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block">
              Direct Contact
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900">
              Schedule Your Free Solution Assessment
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
              Have specific backup challenges or planning rooftop solar? Speak with an accredited engineer to structure exact load calculations and optimal layouts. No charge, professional proposals are delivered quickly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start space-x-3">
                <div className="p-2 rounded bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 font-mono mt-0.5">
                  Step 1
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-widest">Connect with Advisor</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-light">
                    Submit your basic load and billing metrics cleanly.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start space-x-3">
                <div className="p-2 rounded bg-emerald-100 text-emerald-700 font-bold text-xs shrink-0 font-mono mt-0.5">
                  Step 2
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-widest">Obtain System Models</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-light">
                    Receive solar yield estimations, battery pack details and direct ROI predictions.
                  </p>
                </div>
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
