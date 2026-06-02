"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
}

export default function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [dummyVerified, setDummyVerified] = useState(false);

  useEffect(() => {
    // If turnstile script is already available and we have a valid siteKey
    if (siteKey && (window as any).turnstile && containerRef.current) {
      try {
        (window as any).turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
        });
      } catch (err) {
        console.error("Failed to render Cloudflare Turnstile:", err);
      }
    } else if (!siteKey) {
      // Simulate dummy auto-verification for local dev environment
      const timer = setTimeout(() => {
        setDummyVerified(true);
        onVerify("dummy-local-sandbox-token-authenticated-ok");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [siteKey, loaded, onVerify]);

  const handleScriptLoad = () => {
    setLoaded(true);
    if (siteKey && (window as any).turnstile && containerRef.current) {
      try {
        (window as any).turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
        });
      } catch (err) {
        console.error("Failed to render Turnstile after script loaded:", err);
      }
    }
  };

  if (siteKey) {
    return (
      <div className="my-3">
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onLoad={handleScriptLoad}
          strategy="lazyOnload"
        />
        <div ref={containerRef} className="cf-turnstile"></div>
        <p className="text-[10px] text-slate-400 font-mono mt-1">
          Secured by Cloudflare Turnstile
        </p>
      </div>
    );
  }

  // Graceful fallback for local development or sandbox without keys
  return (
    <div className="my-2 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className={`w-2.5 h-2.5 rounded-full ${dummyVerified ? "bg-emerald-500 animate-pulse" : "bg-yellow-400"}`} />
        <span className="text-[11px] font-mono text-slate-600">
          {dummyVerified ? "Security Sandbox Verified" : "Validating Security Sandbox..."}
        </span>
      </div>
      <span className="text-[10px] bg-emerald-600/10 text-emerald-700 font-bold px-2 py-0.5 rounded uppercase font-mono">
        Turnstile OK
      </span>
    </div>
  );
}
