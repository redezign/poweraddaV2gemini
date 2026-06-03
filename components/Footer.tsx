import React from "react";
import Link from "next/link";
import { Zap, Mail, Phone, MapPin, Building2, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: "About Company", href: "/about" },
    { name: "Partner Ecosystem", href: "/vendor" },
    { name: "Savings Calculator", href: "/calculator" },
    { name: "Insights Panel", href: "/insights" },
    { name: "Contact & Location", href: "/contact" },
    { name: "Sitemap Index", href: "/sitemap.xml" }
  ];

  const serviceCategories = [
    { name: "Solar Energy Solutions", href: "/services/solar" },
    { name: "Automotive Batteries", href: "/services/automotive-batteries" },
    { name: "Inverter Batteries", href: "/services/inverter-batteries" },
    { name: "Energy Storage Systems", href: "/services/energy-storage" },
    { name: "Wind Energy Solutions", href: "/services/wind" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800">
      {/* UPPER CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Logo & Corporate Detail */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="bg-emerald-600 text-white p-1 rounded-lg">
                <Zap size={18} className="fill-white" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Power<span className="text-emerald-500">Adda</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              PowerAdda is positioned as Mumbai’s trusted destination for power backup, renewable energy solutions, energy storage, high-density batteries, and industrial solar projects across India. Supporting clean transition with robust technology and deep expertise.
            </p>
            <div className="space-y-2 pt-2 text-xs font-medium">
              <div className="flex items-center space-x-2 text-slate-400">
                <Building2 size={14} className="text-emerald-500 shrink-0" />
                <span>Corp HQ: Nr. Vicino Mall, Oshiwara, Andheri West, Mumbai</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin size={14} className="text-emerald-500 shrink-0" />
                <span>Bhiwandi & Pan-India Dispatch Hubs</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone size={14} className="text-emerald-500 shrink-0" />
                <span>Support: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918655559777"}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Mail size={14} className="text-emerald-500 shrink-0" />
                <span>Procurement: info@poweradda.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-mono font-bold">
              Company Info
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors inline-flex items-center">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-mono font-bold">
              Power Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {serviceCategories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Area Coverage */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-white font-mono font-bold">
              Service Areas
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              We provide active engineering and vendor deliveries in:
            </p>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
              {["Mumbai", "Thane", "Navi Mumbai", "Pune", "Nashik", "Nagpur"].map((city) => (
                <span key={city} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOWER CONTAINER */}
      <div className="bg-slate-950 text-slate-500 text-xs py-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap- 
         <div className="space-y-1 text-center md:text-left">
  <div className="space-y-1 text-center md:text-left">
    <p className="text-slate-400">
      &copy; {currentYear} PowerAdda Energy Solutions
    </p>
    <p className="text-slate-500 text-[11px]">
      Automotive &bull; Inverter &bull; Solar &bull; Wind &bull; Energy Storage Systems
    </p>
    <p className="text-[10px] text-slate-500 font-light max-w-xl">
      PowerAdda is an independent consultant and system integration network. Standard energy performance, solar savings estimates, and battery payback lifespans depend on site conditions, regional weather patterns, and discom billing structures.
    </p>
  </div>  
   </div>
          <div className="flex items-center space-x-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-400 hover:text-emerald-400 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
