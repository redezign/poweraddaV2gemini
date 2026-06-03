"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, ChevronDown, Award, Zap, PhoneCall } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const serviceLinks = [
    { name: "Solar Energy Solutions", href: "/services/solar" },
    { name: "Automotive Batteries", href: "/services/automotive-batteries" },
    { name: "Inverter Batteries", href: "/services/inverter-batteries" },
    { name: "Energy Storage Systems", href: "/services/energy-storage" },
    { name: "Wind Energy Solutions", href: "/services/wind" }
  ];

  const mainLinks = [
    { name: "About Us", href: "/about" },
    { name: "Savings Calculator", href: "/calculator" },
    { name: "Vendor Partnership", href: "/vendor" },
    { name: "Insights Panel", href: "/insights" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="bg-emerald-600 text-white p-1.5 rounded-lg shadow-sm group-hover:bg-emerald-500 transition-colors">
              <Zap size={20} className="fill-white" />
            </div>
            <div className="leading-tight">
              <span className="text-xl font-sans font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                Power<span className="text-emerald-600 group-hover:text-slate-900 transition-colors">Adda</span>
              </span>
              <span className="block text-[8px] font-mono tracking-wider text-slate-500 font-bold uppercase">
                Powering Homes, Mobility & Sustainable Future.
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1 font-sans text-xs font-bold text-slate-700 tracking-wide">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`px-3 py-2 rounded-md hover:text-emerald-600 text-[11px] uppercase flex items-center space-x-1 select-none ${
                  pathname.startsWith("/services") ? "text-emerald-600 font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>Services</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-64 rounded-xl bg-white border border-slate-100 shadow-xl py-2 z-50 origin-top-left transition-all"
                >
                  {serviceLinks.map((subLink) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      onClick={() => setServicesDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                        pathname === subLink.href ? "bg-emerald-50/50 text-emerald-600 font-semibold" : ""
                      }`}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 my-1"></div>
                  <Link
                    href="/services"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block px-4 py-2 text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 hover:text-emerald-600"
                  >
                    View All Services &rarr;
                  </Link>
                </div>
              )}
            </div>

            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md transition-all text-[11px] uppercase hover:text-emerald-600 hover:bg-slate-50 ${
                  pathname === link.href ? "text-emerald-600 font-bold" : "text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center space-x-2">
            <a
              href="/api/export-project"
              className="inline-flex items-center justify-center bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 font-sans font-bold text-[10px] uppercase tracking-wider py-2.5 px-3 rounded-lg transition-all"
              title="Click 'Open in New Tab' at top right of preview screen first, as browsers block downloads in iframes"
            >
              📥 Download ZIP
            </a>
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center bg-slate-900 border border-slate-900 text-white hover:bg-slate-800 font-sans font-bold text-[10px] uppercase tracking-wider py-2.5 px-3 rounded-lg transition-all shadow-sm"
            >
              Get Free Quote
            </Link>
            <Link
              href="/contact#contact-form-section"
              className="inline-flex items-center justify-center bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100/80 font-sans font-bold text-[10px] uppercase tracking-wider py-2.5 px-3 rounded-lg transition-all"
            >
              <PhoneCall size={12} className="mr-1.5" />
              Talk to Expert
            </Link>
          </div>

          {/* MOBILE BURGER TRIGGER */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1.5 text-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <span className="block px-2 text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Our Energy Solutions
            </span>
            {serviceLinks.map((subLink) => (
              <Link
                key={subLink.href}
                href={subLink.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === subLink.href
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {subLink.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 my-2"></div>

          <div className="space-y-1">
            <span className="block px-2 text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Company
            </span>
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "bg-slate-50 text-emerald-600 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="/api/export-project"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-blue-50 border border-blue-100 text-blue-700 font-sans font-bold text-xs py-2.5 rounded-lg mb-2"
            >
              📥 Download Project Source ZIP
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-slate-900 text-white font-sans font-bold text-xs py-2.5 rounded-lg"
            >
              Free Quote
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-emerald-50 border border-emerald-100 text-emerald-700 font-sans font-bold text-xs py-2.5 rounded-lg"
            >
              Interactive Chat
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
