"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-react";
import TurnstileWidget from "./TurnstileWidget";

export default function RequestQuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [serviceRequired, setServiceRequired] = useState("Solar Energy Solutions");
  const [budgetRange, setBudgetRange] = useState("₹50,000 - ₹2,00,000");
  const [projectDetails, setProjectDetails] = useState("");
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const budgetOptions = [
    "Under ₹50,000",
    "₹50,000 - ₹2,00,000",
    "₹2,00,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "₹10,00,000 - ₹25,00,000",
    "Over ₹25,00,000"
  ];

  const servicesList = [
    "Solar Energy Solutions",
    "Automotive Batteries",
    "Inverter Batteries",
    "Energy Storage Systems",
    "Wind Energy Solutions"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorStatus(null);

    // Visual validations
    if (!name || !phone || !email || !projectDetails) {
      setErrorStatus("Name, phone, email, and project details are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "quote",
          name,
          phone,
          email,
          company,
          city,
          serviceRequired,
          budgetRange,
          projectDetails,
          turnstileToken: token
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccess(true);
        // Clear inputs
        setName("");
        setPhone("");
        setEmail("");
        setCompany("");
        setProjectDetails("");
      } else {
        setErrorStatus(resData.error || "Quote request failed. Please check your fields and try again.");
      }
    } catch (err: any) {
      console.error("Quote Form error:", err);
      setErrorStatus("A network error occurred. Please verify your connections.");
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
          Quote Request Received!
        </h3>
        <p className="text-sm text-slate-600 font-light leading-relaxed">
          Your direct quotation request has been compiled. Our industrial-scale engineering desk will analyze your specifications and generate an initial design model and proposal within 24 working hours.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="bg-emerald-600 text-white font-sans font-semibold text-xs py-2 px-5 rounded-lg hover:bg-emerald-700 transition-all shadow"
        >
          Submit New Quote Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xl space-y-5 max-w-2xl mx-auto">
      <div className="space-y-1 mb-2">
        <h3 className="text-lg font-sans font-semibold text-slate-800">
          Request a Custom Proposal
        </h3>
        <p className="text-xs text-slate-500 font-light">
          Specify your power demands and budget to obtain competitive commercial pricing and system models.
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
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anand Kulkarni"
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
            placeholder="+91 99999 99999"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@domain.com"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Company Name (Optional)
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Tech Mumbai"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            City of Project *
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Pune, Navi Mumbai"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Service Required
          </label>
          <select
            value={serviceRequired}
            onChange={(e) => setServiceRequired(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          >
            {servicesList.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          Budget Allocation
        </label>
        <select
          value={budgetRange}
          onChange={(e) => setBudgetRange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
        >
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          Project Details & Power Demands *
        </label>
        <textarea
          rows={3}
          required
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          placeholder="Please mention system size required, daily electricity load, structure details, etc."
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium resize-none"
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
            <span>Processing Specifications...</span>
          </>
        ) : (
          <>
            <Send size={14} />
            <span>Submit Proposal Request</span>
          </>
        )}
      </button>
    </form>
  );
}
