"use client";

import React, { useState, useMemo } from "react";
import { 
  Calculator, Sun, Zap, Leaf, RotateCcw, ArrowRight, 
  Boxes, Shield, Battery, Sparkles, AlertCircle, TrendingUp, Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const locations = [
  { value: "mumbai", label: "Mumbai Metro (MSEDCL/BEST/Adani)", rateMultiplier: 1.15 },
  { value: "maharashtra_other", label: "Rest of Maharashtra (MSEDCL)", rateMultiplier: 1.0 },
  { value: "india_metro", label: "Other Metro Cities (India)", rateMultiplier: 1.05 },
  { value: "india_rural", label: "Rest of India Slabs", rateMultiplier: 0.9 }
];

export default function SavingsCalculator() {
  const [propertyType, setPropertyType] = useState<"residential" | "commercial" | "industrial">("residential");
  const [location, setLocation] = useState<string>("mumbai");
  
  // Set default consumption values depending on Property Type
  const [consumption, setConsumption] = useState<number>(650);
  const [activeTab, setActiveTab] = useState<"overview" | "solar" | "bess" | "backup">("overview");

  // Dynamic slider range based on property selection
  const sliderConfig = useMemo(() => {
    switch (propertyType) {
      case "residential":
        return { min: 50, max: 2500, step: 25, defaultVal: 550 };
      case "commercial":
        return { min: 300, max: 15000, step: 100, defaultVal: 3500 };
      case "industrial":
        return { min: 1500, max: 75000, step: 500, defaultVal: 18000 };
      default:
        return { min: 50, max: 2500, step: 25, defaultVal: 550 };
    }
  }, [propertyType]);

  const calculations = useMemo(() => {
    // 1. Calculate Tariff & Monthly Grid Bill estimate
    let baseTariff = 10;
    if (propertyType === "residential") baseTariff = 9.2;
    if (propertyType === "commercial") baseTariff = 12.8;
    if (propertyType === "industrial") baseTariff = 8.1;

    const selectedLoc = locations.find(l => l.value === location);
    const multiplier = selectedLoc ? selectedLoc.rateMultiplier : 1.0;
    const tariffPerUnit = baseTariff * multiplier;
    const estimatedBill = Math.round(consumption * tariffPerUnit);

    // 2. Solar Energy Solutions (Solar PV System) Estimation
    // A 1 kW Solar system in MH/India generates ~120 kWh per month (approx 4 peak sun-hours/day)
    // Goal: Offset up to 85% of monthly consumption
    const neededSolarKw = Math.max(
      1.0, 
      parseFloat(((consumption * 0.85) / 120).toFixed(1))
    );
    // Base capital investment gets cheaper with system capacity
    let solarRatePerKw = 70000; // Residential / small setup
    if (neededSolarKw > 10) solarRatePerKw = 58000; // Commercial
    if (neededSolarKw > 50) solarRatePerKw = 46000; // Industrial

    const solarCost = Math.round(neededSolarKw * solarRatePerKw);
    const monthlySolarSavings = Math.round(consumption * 0.85 * tariffPerUnit);
    const annualSolarSavings = monthlySolarSavings * 12;
    const solarPaybackYears = Math.max(
      3.2,
      parseFloat((solarCost / annualSolarSavings).toFixed(1))
    );
    const solarRoiPercent = Math.round((annualSolarSavings / solarCost) * 100);
    const solarLifetimeSavings = annualSolarSavings * 25; // 25 year warranty line
    const annualCo2Saved = parseFloat(((consumption * 12 * 0.82) / 1000).toFixed(1)); // 0.82 kg CO2 per kWh
    const treesPlanted = Math.round(annualCo2Saved * 40);

    // 3. Energy Storage Systems (BESS - Lithium LiFePO4 Battery pack)
    // Sized to support peak-shaving / daily back-up of ~35% of daily consumption
    const neededBessKwh = Math.max(
      2.5,
      parseFloat(((consumption / 30) * 0.35).toFixed(1))
    );
    let bessKwhRate = 32000; 
    if (neededBessKwh > 15) bessKwhRate = 25000;
    if (neededBessKwh > 100) bessKwhRate = 19500;

    const bessCost = Math.round(neededBessKwh * bessKwhRate);
    // Peak load Time-of-Day (ToD) shifting & replacing diesel run hours saves ~₹8.5 per backed up kWh
    // Sizing factors: 28 cycles/month, 85% depth of discharge
    const monthlyBessSavings = Math.round(neededBessKwh * 28 * 0.85 * 9.2 * (propertyType === "industrial" ? 1.2 : 1.0));
    const annualBessSavings = monthlyBessSavings * 12;
    const bessPaybackYears = Math.max(
      4.5,
      parseFloat((bessCost / annualBessSavings).toFixed(1))
    );
    const bessRoiPercent = Math.round((annualBessSavings / bessCost) * 100);
    const bessLifetimeSavings = annualBessSavings * 10; // 10 Year Cell Warranty line

    // 4. Inverter Backup Battery Systems (Smart Home/Office Backup - Tubular Lead Acid/Lithium Packs)
    // Standard modular inverter systems rated in Ampere-Hours at 12V
    // Sized to safely store ~4 hours of basic emergency equipment loads
    const neededBatteryAh = Math.max(
      150,
      Math.round(((consumption / 30) * 0.45 * 1000 / 12) / 50) * 50
    );
    // Cost representing commercial high-load sine wave inverter + modular battery blocks
    const batteryCost = Math.round((neededBatteryAh / 150) * 16500 + 10000);
    // Safeguarding downtime productivity, shielding expensive equipment from spikes saves on repairs & operational loss
    const monthlyBatterySavings = Math.round((consumption / 30) * 4 * 1.8) + 1200;
    const annualBatterySavings = monthlyBatterySavings * 12;
    const batteryPaybackYears = Math.max(
      2.0,
      parseFloat((batteryCost / annualBatterySavings).toFixed(1))
    );
    const batteryRoiPercent = Math.round((annualBatterySavings / batteryCost) * 100);
    const batteryLifetimeSavings = annualBatterySavings * 6; // 6 years standard tubular cycle-life

    return {
      tariffPerUnit: parseFloat(tariffPerUnit.toFixed(2)),
      estimatedBill,
      solar: {
        capacityKw: neededSolarKw,
        cost: solarCost,
        monthlySaved: monthlySolarSavings,
        annualSaved: annualSolarSavings,
        paybackYears: isNaN(solarPaybackYears) ? 4.2 : solarPaybackYears,
        roiPercent: solarRoiPercent,
        lifetimeSaved: solarLifetimeSavings,
        co2Saved: annualCo2Saved,
        trees: treesPlanted
      },
      bess: {
        capacityKwh: neededBessKwh,
        cost: bessCost,
        monthlySaved: monthlyBessSavings,
        annualSaved: annualBessSavings,
        paybackYears: isNaN(bessPaybackYears) ? 5.5 : bessPaybackYears,
        roiPercent: bessRoiPercent,
        lifetimeSaved: bessLifetimeSavings
      },
      backup: {
        capacityAh: neededBatteryAh,
        cost: batteryCost,
        monthlySaved: monthlyBatterySavings,
        annualSaved: annualBatterySavings,
        paybackYears: isNaN(batteryPaybackYears) ? 2.5 : batteryPaybackYears,
        roiPercent: batteryRoiPercent,
        lifetimeSaved: batteryLifetimeSavings
      }
    };
  }, [propertyType, location, consumption]);

  const handleReset = () => {
    setPropertyType("residential");
    setLocation("mumbai");
    setConsumption(650);
    setActiveTab("overview");
  };

  return (
    <div id="savings-calculator" className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden max-w-6xl mx-auto font-sans">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-emerald-950 p-6 md:p-8 lg:p-10 text-white relative">
        <div className="absolute right-6 top-6 opacity-5 select-none pointer-events-none hidden md:block">
          <Calculator size={150} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30 font-bold flex items-center space-x-1">
            <Sparkles size={10} className="mr-1 animate-pulse" />
            <span>Interactive Clean-Power Modeler</span>
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mt-3 text-white">
          Calculate Your Sustainable Savings & ROI
        </h3>
        <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-3xl font-light leading-relaxed">
          Estimate capacity requirements, initial outlays, and long-term financial yield across multiple PowerAdda solutions. All algorithms match regional irradiance cycles, utility slabs, and commercial battery efficiency curves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        
        {/* INPUT PANEL (LEFT) */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>1. Configure Metrics</span>
            </span>
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-slate-400 hover:text-emerald-600 transition-colors flex items-center space-x-1 font-bold"
            >
              <RotateCcw size={10} className="mr-0.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wide block">
              Property Classification
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["residential", "commercial", "industrial"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  id={`calc-prop-btn-${type}`}
                  onClick={() => {
                    setPropertyType(type);
                    const defaultVal = type === "residential" ? 650 : type === "commercial" ? 3500 : 18000;
                    setConsumption(defaultVal);
                  }}
                  className={`py-2.5 px-1.5 text-[11px] font-bold rounded-xl border text-center transition-all capitalize cursor-pointer ${
                    propertyType === type
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wide block">
              Utility Tariff Territory
            </label>
            <select
              id="calc-location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs py-3 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Electricity Consumption */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wide block">
                Monthly Power Usage
              </label>
              <span className="text-emerald-700 font-mono font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                {consumption.toLocaleString("en-IN")} kWh / Month
              </span>
            </div>
            
            <input
              type="range"
              id="calc-consumption-slider"
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step}
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
            />
            
            <div className="flex justify-between text-[10px] text-slate-400 font-mono font-semibold">
              <span>{sliderConfig.min.toLocaleString("en-IN")} kWh</span>
              <span>{(sliderConfig.max / 2).toLocaleString("en-IN")} kWh</span>
              <span>{sliderConfig.max.toLocaleString("en-IN")}+ kWh</span>
            </div>
          </div>

          {/* Bill Preview Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 space-y-2 text-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Estimated Tariff rate:</span>
              <span className="font-mono font-bold text-slate-700 text-right">₹{calculations.tariffPerUnit}/unit</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
              <span className="text-slate-500 font-semibold text-xs">Estimated Current Monthly Bill:</span>
              <span className="font-sans font-extrabold text-lg text-slate-900 text-right">
                ₹{calculations.estimatedBill.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Callout */}
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start space-x-2.5">
            <Info size={14} className="text-blue-600 mt-0.5 shrink-0" />
            <p className="text-[10px] text-slate-500 leading-normal font-light">
              Are your actual bills higher due to power surges, heavy equipment or generator backing? Get customized audits with real-time logging.
            </p>
          </div>
        </div>

        {/* RESULTS PANEL (RIGHT) */}
        <div className="lg:col-span-7 p-6 md:p-8 bg-slate-50/30 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* TABS HEADER */}
            <div className="flex flex-wrap border-b border-slate-100 gap-1 pb-1">
              {[
                { id: "overview", label: "Overview Comparison", icon: Boxes },
                { id: "solar", label: "Solar System", icon: Sun },
                { id: "bess", label: "Energy Storage (BESS)", icon: Shield },
                { id: "backup", label: "Inverter Battery", icon: Battery },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    id={`calc-tab-btn-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-1.5 py-2.5 px-3.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-white text-slate-900 shadow border border-slate-100"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <TabIcon size={12} className={activeTab === tab.id ? "text-emerald-600" : "text-slate-400"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT WITH ANIMATION */}
            <div className="min-h-[350px]">
              <AnimatePresence mode="wait">
                
                {/* 1. OVERVIEW DASHBOARD */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4">
                      Direct Comparison & Feasibility Ratings
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Solar card */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/20 transition-all">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="p-2 rounded-xl bg-orange-50 text-orange-600">
                              <Sun size={14} />
                            </span>
                            <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              Best ROI
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-800">Rooftop Solar PV</h4>
                          <span className="block text-[10px] text-slate-400">Est. Investment</span>
                          <span className="block text-base font-extrabold text-slate-900 font-sans">
                            ₹{calculations.solar.cost.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-slate-100 mt-4 flex justify-between items-center">
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase font-mono">Payback</span>
                            <span className="block text-xs font-mono font-bold text-slate-700">~{calculations.solar.paybackYears} Yrs</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] text-slate-400 uppercase font-mono">Ann. Savings</span>
                            <span className="block text-xs font-bold text-emerald-600">₹{calculations.solar.annualSaved.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>

                      {/* BESS card */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden hover:border-blue-500/20 transition-all">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                              <Shield size={14} />
                            </span>
                            {propertyType !== "residential" ? (
                              <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                                High Demand
                              </span>
                            ) : (
                              <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full">
                                Eco Option
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-xs text-slate-800">Lithium BESS</h4>
                          <span className="block text-[10px] text-slate-400">Est. Investment</span>
                          <span className="block text-base font-extrabold text-slate-900 font-sans">
                            ₹{calculations.bess.cost.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-slate-100 mt-4 flex justify-between items-center">
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase font-mono">Payback</span>
                            <span className="block text-xs font-mono font-bold text-slate-700">~{calculations.bess.paybackYears} Yrs</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] text-slate-400 uppercase font-mono">Ann. Savings</span>
                            <span className="block text-xs font-bold text-emerald-600 font-sans">₹{calculations.bess.annualSaved.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Inverter battery card */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden hover:border-emerald-600/20 transition-all">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                              <Battery size={14} />
                            </span>
                            <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                              Fast Payback
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-800">Inverter Battery</h4>
                          <span className="block text-[10px] text-slate-400">Est. Investment</span>
                          <span className="block text-base font-extrabold text-slate-900 font-sans">
                            ₹{calculations.backup.cost.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-slate-100 mt-4 flex justify-between items-center">
                          <div>
                            <span className="block text-[9px] text-slate-400 uppercase font-mono">Payback</span>
                            <span className="block text-xs font-mono font-bold text-slate-700">~{calculations.backup.paybackYears} Yrs</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] text-slate-400 uppercase font-mono">Ann. Savings</span>
                            <span className="block text-xs font-bold text-emerald-700 font-sans">₹{calculations.backup.annualSaved.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Summary recommendations */}
                    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp size={15} className="text-emerald-400" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                          PowerAdda Recommendation Audit
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                        {propertyType === "industrial" 
                          ? `For industrial workloads of ${consumption.toLocaleString("en-IN")} kWh/month, a grid-tied Solar Rooftop PV array combined with a modular Lithium storage bank (BESS) represents the ideal blueprint. This configuration limits grid demand charges while offering a blended annual financial yield exceeding ₹${(calculations.solar.annualSaved + calculations.bess.annualSaved).toLocaleString("en-IN")} with complete grid stability.`
                          : propertyType === "commercial"
                          ? `With commercial tariffs average around ₹12.8/unit, installing a ${calculations.solar.capacityKw} kW Solar PV setup offers immediate utility offset of approximately ₹${calculations.solar.monthlySaved.toLocaleString("en-IN")} monthly. Standardizing with a backup Battery or Lithium ESS shuts down diesel operations.`
                          : `For standard residential properties consuming ${consumption} kWh/month, a ${calculations.solar.capacityKw} kW Solar array yields a massive lifetime financial savings of ₹${calculations.solar.lifetimeSaved.toLocaleString("en-IN")}. Adding a deep-discharge smart tubular inverter system shields your home during standard localized brownouts.`
                        }
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 2. SOLAR PV SYSTEM FOCUS */}
                {activeTab === "solar" && (
                  <motion.div
                    key="solar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Rooftop Net-Metered Solar PV Array
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Metric 1 */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Recommended System Rating</span>
                        <span className="text-2xl font-extrabold text-slate-950 font-sans block">
                          {calculations.solar.capacityKw} <span className="text-xs font-medium text-slate-500">kWp</span>
                        </span>
                        <p className="text-[10px] text-slate-500">
                          Generates approx. {Math.round(calculations.solar.capacityKw * 120)} kWh clean energy / Month
                        </p>
                      </div>

                      {/* Metric 2 */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Solar Investment</span>
                        <span className="text-2xl font-extrabold text-slate-950 font-sans block">
                          ₹{calculations.solar.cost.toLocaleString("en-IN")}
                        </span>
                        <p className="text-[10px] text-emerald-600 font-medium font-mono">
                          ROI Yield: {calculations.solar.roiPercent}% Annually
                        </p>
                      </div>
                    </div>

                    {/* Financial detailed board */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-3 gap-2 text-center">
                      <div className="border-r border-slate-100">
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">Monthly Saved</span>
                        <span className="block text-base font-bold text-emerald-600 font-sans mt-1">
                          ₹{calculations.solar.monthlySaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="border-r border-slate-100">
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">Yearly Revenue</span>
                        <span className="block text-base font-bold text-slate-800 font-sans mt-1">
                          ₹{calculations.solar.annualSaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">25-Yr Lifetime Saved</span>
                        <span className="block text-base font-bold text-blue-800 font-sans mt-1">
                          ₹{calculations.solar.lifetimeSaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Environmental Metrics */}
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100/70 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-emerald-700 bg-emerald-100 p-2.5 rounded-xl">
                          <Leaf size={16} />
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">Annual Carbon Neutrality</span>
                          <span className="text-xs font-semibold text-slate-700 block mt-0.5">
                            Offsets <span className="font-extrabold text-emerald-800">{calculations.solar.co2Saved} Metric Tons</span> of greenhouse gases
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] bg-emerald-600 text-white font-mono font-bold px-3 py-1.5 rounded-full shrink-0">
                        🌿 {calculations.solar.trees} Trees Planted
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. BESS SYSTEM FOCUS */}
                {activeTab === "bess" && (
                  <motion.div
                    key="bess"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Battery Energy Storage System (BESS - Lithium LiFePO4)
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Metric 1 */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Recommended BESS Storage Class</span>
                        <span className="text-2xl font-extrabold text-slate-950 font-sans block">
                          {calculations.bess.capacityKwh} <span className="text-xs font-medium text-slate-500">kWh</span>
                        </span>
                        <p className="text-[10px] text-slate-500">
                          Supports localized peak shaving, backup, and TOD timeshifting.
                        </p>
                      </div>

                      {/* Metric 2 */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Estimated Storage Capital</span>
                        <span className="text-2xl font-extrabold text-slate-950 font-sans block">
                          ₹{calculations.bess.cost.toLocaleString("en-IN")}
                        </span>
                        <p className="text-[10px] text-emerald-600 font-semibold font-mono">
                          ROI Yield: {calculations.bess.roiPercent}% Annually
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-3 gap-2 text-center">
                      <div className="border-r border-slate-100">
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">Monthly Saved</span>
                        <span className="block text-base font-bold text-emerald-600 font-sans mt-1">
                          ₹{calculations.bess.monthlySaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="border-r border-slate-100">
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">Annual Return</span>
                        <span className="block text-base font-bold text-slate-800 font-sans mt-1">
                          ₹{calculations.bess.annualSaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">10-Yr Cell Yield</span>
                        <span className="block text-base font-bold text-blue-800 font-sans mt-1">
                          ₹{calculations.bess.lifetimeSaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1.5">
                      <span className="text-[9px] font-mono font-bold bg-blue-100/70 text-blue-800 px-2 py-0.5 rounded uppercase tracking-wider w-fit block">
                        Diesel Replacement & Time-of-Use Benefits
                      </span>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        By deploying Lithium Iron Phosphate (LiFePO4) storage, commercial and industrial grids bypass polluting, expensive diesel runs (costing ₹22+ / kWh) and shave peak industrial electricity rates during daytime high demand blocks. It stabilizes sensitive computers/machinery with sub-10ms automatic switching.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 4. INVERTER BACKUP FOCUS */}
                {activeTab === "backup" && (
                  <motion.div
                    key="backup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Digital Tubular Inverter / Backup Battery Pack
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Metric 1 */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Recommended Backup Sizing</span>
                        <span className="text-2xl font-extrabold text-slate-950 font-sans block">
                          {calculations.backup.capacityAh} <span className="text-xs font-medium text-slate-500">Ah @ 12V</span>
                        </span>
                        <p className="text-[10px] text-slate-500">
                          Sized for up to 4-8 hours of lights, fans, router, and computer backups.
                        </p>
                      </div>

                      {/* Metric 2 */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Inverter & Battery Hard Cost</span>
                        <span className="text-2xl font-extrabold text-slate-950 font-sans block">
                          ₹{calculations.backup.cost.toLocaleString("en-IN")}
                        </span>
                        <p className="text-[10px] text-emerald-600 font-semibold font-mono">
                          ROI Yield: {calculations.backup.roiPercent}% Annually
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-3 gap-2 text-center">
                      <div className="border-r border-slate-100">
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">Monthly Saved</span>
                        <span className="block text-base font-bold text-emerald-600 font-sans mt-1">
                          ₹{calculations.backup.monthlySaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="border-r border-slate-100">
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">Yearly Return</span>
                        <span className="block text-base font-bold text-slate-800 font-sans mt-1">
                          ₹{calculations.backup.annualSaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-wider text-slate-400">6-Yr Lifespan Saved</span>
                        <span className="block text-base font-bold text-blue-800 font-sans mt-1">
                          ₹{calculations.backup.lifetimeSaved.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100/70 space-y-1.5">
                      <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full w-fit block">
                        Uptime & Productive Security Guarantee
                      </span>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-light">
                        Provides clean-frequency Pure Sine Wave backups protecting expensive household and office hardware against typical power fluctuations. Eliminates workspace disruptions during brownouts, supporting continuous internet, cooling, lights and operations.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CALL TO ACTION */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Solution Applied</span>
                <h4 className="text-xs font-bold text-slate-800">
                  {calculations.solar.capacityKw >= 50 
                    ? "Commercial/Industrial Solar-Microgrid Integration"
                    : calculations.solar.capacityKw >= 5 
                    ? "Premium Rooftop Solar PV & Lithium Backup Combination"
                    : "Residential Rooftop Solar & Sine Inverter Setup"
                  }
                </h4>
              </div>

              <a
                href="#contact-form-section"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("contact-form-section");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/contact#contact-form-section";
                  }
                }}
                className="inline-flex items-center space-x-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs tracking-wider uppercase font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer w-full sm:w-auto text-center justify-center shadow-lg"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ASSUMPTIONS & CRITERIA REVELATIONS (BOTTOM ACCORDION CARD) */}
      <div className="bg-slate-900 text-slate-400 p-6 md:p-8 border-t border-slate-800 font-sans space-y-4">
        <div className="flex items-center space-x-2 text-slate-200">
          <AlertCircle size={15} className="text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
            Structured Modeling Assumptions & Slabs
          </h4>
        </div>
        
        <p className="text-[10px] leading-relaxed text-slate-400 font-light">
          To maintain transparency and conservative estimates, calculations operate strictly on standard electricity tariff codes, geographic constraints, and physical battery cycle benchmarks in India. Physical solar structures, rooftop angles, shadow patterns, battery depth-of-discharges, and regulatory approvals will affect actual performance metrics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 text-[10px] leading-relaxed font-mono divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="space-y-1 md:pr-4">
            <span className="text-slate-200 font-bold block">☀ Solar Irradiance Hours</span>
            <p className="font-light">Estimated at 4.5 peak sun-hours daily in Western Maharashtra, averaging approx. 1,500 kWh yearly generation per kW capacity.</p>
          </div>
          <div className="space-y-1 md:px-4 pt-3 md:pt-0">
            <span className="text-slate-200 font-bold block">⚡ Utility Tariffs</span>
            <p className="font-light">Base rates: Residential (~₹9.20/kWh), Commercial (~₹12.80/kWh), Industrial (~₹8.10/kWh). Locations scale based on specific utility distribution slabs.</p>
          </div>
          <div className="space-y-1 md:px-4 pt-3 md:pt-0">
            <span className="text-slate-200 font-bold block">🔋 LFP Cycle Lifespans</span>
            <p className="font-light">BESS utilizes premium Lithium Iron Phosphate (LiFePO4) battery packs with 4,000+ deep charging cycles supporting full 10-year operational life.</p>
          </div>
          <div className="space-y-1 md:pl-4 pt-3 md:pt-0">
            <span className="text-slate-200 font-bold block">⛽ Diesel Replacements</span>
            <p className="font-light">Replacement metrics assume fuel cost of ₹92/litre, generator output of 3.3 kWh per litre, and ₹2.5/kWh maintenance expenses for old internal engines.</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-850 text-slate-500 text-[9px] text-center font-light">
          *Calculations are for reference and planning purposes only. Formal legal proposals are delivered strictly following physical on-site audits.
        </div>
      </div>
    </div>
  );
}
