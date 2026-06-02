"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-react";
import TurnstileWidget from "./TurnstileWidget";

export default function VendorRegistrationForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [productsOffered, setProductsOffered] = useState("Solar Panels / Inverters");
  const [website, setWebsite] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const vendorOfferings = [
    "Solar Panels / Inverters",
    "Tubular & Flat Plate Batteries",
    "Lithium Pack Assembly / BMS",
    "Wind Turbines or Electrical Machinery",
    "Solar Mounting Structures",
    "Installation & EPC Subcontracting Services"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorStatus(null);

    // Form validation
    if (!companyName || !contactPerson || !phone || !email || !businessDescription) {
      setErrorStatus("Company, contact person, phone, email, and description are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "vendor",
          companyName,
          contactPerson,
          phone,
          email,
          city,
          productsOffered,
          website,
          businessDescription,
          turnstileToken: token
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccess(true);
        // Reset states
        setCompanyName("");
        setContactPerson("");
        setPhone("");
        setEmail("");
        setWebsite("");
        setBusinessDescription("");
      } else {
        setErrorStatus(resData.error || "Vendor onboarding failed. Please check your inputs.");
      }
    } catch (err: any) {
      console.error("Vendor Onboarding error:", err);
      setErrorStatus("A network error occurred. Please test your connections.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full w-fit mx-auto">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-sans font-bold text-slate-800">
          Vendor Application Received!
        </h3>
        <p className="text-sm text-slate-600 font-light leading-relaxed">
          Thank you for applying to join the PowerAdda Partner Ecosystem. Our Procurement Desk will review your capabilities, business references, and certifications. We will reach back out to request formal catalogs and pricing decks.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="bg-emerald-600 text-white font-sans font-semibold text-xs py-2 px-5 rounded-lg hover:bg-emerald-700 transition-all shadow"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xl space-y-5 max-w-2xl mx-auto">
      <div className="space-y-1 mb-2">
        <h3 className="text-lg font-sans font-semibold text-slate-800">
          Partner Ecosystem Onboarding
        </h3>
        <p className="text-xs text-slate-500 font-light">
          Are you a certified manufacturer, distributor, or EPC contractor? Complete this form to join our nationwide dispatch & supply pool.
        </p>
      </div>

      {errorStatus && (
        <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-start space-x-2 border border-red-100">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Registered Company Name *
          </label>
          <input
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Sterling Solar Solutions Ltd"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Contact Person *
          </label>
          <input
            type="text"
            required
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            placeholder="e.g. Ramesh Patel (Director)"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Business Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="partners@company.com"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +91 22 4567 8901"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Corporate Headquarters City *
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Mumbai, Navi Mumbai"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Website (Optional)
          </label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourcompany.com"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          Primary Product / Service Offerings
        </label>
        <select
          value={productsOffered}
          onChange={(e) => setProductsOffered(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
        >
          {vendorOfferings.map((off) => (
            <option key={off} value={off}>
              {off}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          Business Description / Supply Footprint *
        </label>
        <textarea
          rows={3}
          required
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          placeholder="Briefly describe your production capacities, dispatch channels, active client list, or brands you deal with..."
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium resize-none cursor-text"
        />
      </div>

      <TurnstileWidget onVerify={(val) => setToken(val)} />

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 text-white font-sans font-bold text-xs py-3 rounded-lg hover:bg-emerald-700 transition-all shadow disabled:opacity-50 h-10"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            <span>Verifying Enterprise Credentials...</span>
          </>
        ) : (
          <>
            <Send size={14} />
            <span>Apply to Partner Ecosystem</span>
          </>
        )}
      </button>
    </form>
  );
}
