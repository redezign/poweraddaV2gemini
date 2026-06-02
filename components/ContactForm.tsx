"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, Send, Loader2 } from "lucide-react";
import TurnstileWidget from "./TurnstileWidget";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [service, setService] = useState("Solar Energy Solutions");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

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

    // Client-side validations
    if (!name || !phone || !email) {
      setErrorStatus("Name, phone, and email are required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          name,
          phone,
          email,
          city,
          message,
          serviceInterestedIn: service,
          turnstileToken: token
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccess(true);
        // Clear fields
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setErrorStatus(resData.error || "Form submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Contact Form error:", err);
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
          Inquiry Submitted Successfully!
        </h3>
        <p className="text-sm text-slate-600 font-light leading-relaxed">
          Thank you for reaching out to PowerAdda. Your request has been queued in our system and an energy advisor will contact you shortly via phone or email.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="bg-emerald-600 text-white font-sans font-semibold text-xs py-2 px-5 rounded-lg hover:bg-emerald-700 transition-all shadow"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-xl space-y-5 max-w-xl mx-auto">
      <div className="space-y-1.5 mb-2">
        <h3 className="text-lg font-sans font-semibold text-slate-800">
          Send Us an Inquiry
        </h3>
        <p className="text-xs text-slate-500 font-light">
          Fill out this form to connect with our clean energy consultants in Mumbai and across India.
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
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Anand Sen"
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
            placeholder="e.g. +91 98765 43210"
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
            placeholder="e.g. anand@company.com"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            City *
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
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          Service Interested In
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
        >
          {servicesList.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
          Message / Requirement
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your specific power backup or backup storage requirements..."
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
            <span>Submitting Lead...</span>
          </>
        ) : (
          <>
            <Send size={14} />
            <span>Send Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
