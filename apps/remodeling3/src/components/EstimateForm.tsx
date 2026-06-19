import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Calendar, Clock, Send, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useMotionSettings } from './MotionContext';
import { EstimateRequest } from '../types';

export default function EstimateForm() {
  const { reducedMotion } = useMotionSettings();
  const [formData, setFormData] = useState<EstimateRequest>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: 'bathrooms',
    serviceArea: 'Salem',
    details: '',
    timeframe: 'flexible',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EstimateRequest, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);

  const serviceOptions = [
    { value: 'bathrooms', label: 'Luxury Bathroom Remodel' },
    { value: 'kitchens', label: 'Designer Kitchen Remodel' },
    { value: 'living-rooms', label: 'Living/Whole-Home Overhaul' },
    { value: 'tiles', label: 'Meticulous Custom Tile Work' },
    { value: 'plumbing-electrical', label: 'Plumbing & Electrical Update' },
    { value: 'handyman-repairs', label: 'Handyman & Repairs/Dryrot' },
  ];

  const serviceAreas = [
    { value: 'Salem', label: 'Salem (Core)' },
    { value: 'salem', label: 'Salem' },
    { value: 'picnic-point', label: 'Salem' },
    { value: 'salem', label: 'Salem' },
    { value: 'surrounding-counties', label: 'Other Adjacent Areas' }
  ];

  const timeframes = [
    { value: 'immediately', label: 'Immediately (< 2 weeks)' },
    { value: 'month', label: 'Within a month' },
    { value: 'quarter', label: 'Within 2-3 months' },
    { value: 'flexible', label: 'Flexible / Looking for quotes' }
  ];

  const validate = () => {
    const newErrors: Partial<Record<keyof EstimateRequest, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.details.trim()) newErrors.details = 'Please briefly describe your custom remodeling requirements';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof EstimateRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors progressively
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot.current?.value) {
      setSubmitted(true); // bot: act successful, drop silently
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          // Send human-readable labels so the admin reads cleanly.
          serviceType: serviceOptions.find((o) => o.value === formData.serviceType)?.label ?? formData.serviceType,
          serviceArea: serviceAreas.find((a) => a.value === formData.serviceArea)?.label ?? formData.serviceArea,
          timeframe: timeframes.find((t) => t.value === formData.timeframe)?.label ?? formData.timeframe,
          details: formData.details,
          source: 'remodeling3-vite',
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || 'Request failed');
      setSubmitted(true);
    } catch {
      setSubmitError('We could not send your request. Please call (503) 932-3975.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceType: 'bathrooms',
      serviceArea: 'Salem',
      details: '',
      timeframe: 'flexible',
    });
    setSubmitted(false);
  };

  return (
    <section id="estimate" className="py-24 sm:py-32 bg-accent-warm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-accent-amber" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber font-semibold">
              On-Site Assessment
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-accent-charcoal leading-none">
            Book Free{' '}
            <span className="font-serif italic text-accent-gold font-normal">
              Estimate
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-accent-charcoal/70 mt-6 leading-relaxed max-w-2xl">
            Isaac Talmage will inspect your bathroom, kitchen, or living room remodel, advising layouts, advising the best tile niches, stone colors, and lighting routes. Receive a detailed print estimate.
          </p>
        </div>

        {/* Splits: Left Side Info CTAs; Right Side Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT PANEL: PRIMARY PHONE & LOCALS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Primary Phone Block */}
            <div className="bg-accent-charcoal text-white rounded-3xl p-8 border border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="bg-accent-gold/20 text-accent-gold border border-accent-gold/30 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest font-bold uppercase">
                Fastest Connection
              </span>
              
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl mt-5 mb-3">
                Call Isaac Talmage Directly
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-accent-warm/75 leading-relaxed mb-6">
                Skip the web queues. Isaac Talmage carries his mobile phone on site. Call for immediate scheduling or general remodeling design queries.
              </p>

              <a
                href="tel:5039323975"
                className="inline-flex items-center gap-3 bg-accent-gold text-accent-charcoal hover:bg-white hover:text-accent-charcoal px-6 py-4 rounded-2xl font-mono text-sm sm:text-md font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                <Phone size={16} className="animate-bounce" />
                (503) 932-3975
              </a>

              <div className="flex gap-4 mt-8 pt-6 border-t border-white/10 font-mono text-[10px] text-white/50">
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-accent-gold" /> Closes 6:00 PM
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-accent-gold" /> Salem, WA
                </span>
              </div>
            </div>

            {/* Service Area Highlights Card */}
            <div className="bg-white border border-accent-stone rounded-3xl p-8 shadow-sm">
              <h4 className="font-heading font-extrabold text-md sm:text-lg text-accent-charcoal mb-4">
                Service Boundaries
              </h4>
              <p className="font-sans text-xs sm:text-sm text-accent-charcoal/75 leading-relaxed mb-6">
                Talmage Construction serves the Salem and select North King positions, prioritizing local response times:
              </p>

              <div className="grid grid-cols-2 gap-3.5">
                {[
                  'Salem (Core)',
                  'Salem',
                  'Salem',
                  'Salem',
                  'Salem Area',
                  'Salem Coast'
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-xs font-sans text-accent-charcoal/80">
                    <MapPin size={12} className="text-accent-amber shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: RICH CONTACT FORM (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-accent-stone rounded-3xl p-8 sm:p-12 shadow-xl relative min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    {/* Honeypot: hidden from people; bots fill it and get dropped */}
                    <input
                      ref={honeypot}
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
                    />
                    {/* Multi Row Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="flex flex-col">
                        <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Isaac Talmage M."
                          className={`w-full px-4 py-3 bg-accent-warm/50 border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                            errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-accent-stone focus:border-accent-amber focus:ring-accent-amber'
                          }`}
                        />
                        {errors.fullName && <span className="text-red-500 font-sans text-[11px] mt-1.5">{errors.fullName}</span>}
                      </div>

                      {/* Service selection */}
                      <div className="flex flex-col">
                        <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Service Discipline *</label>
                        <div className="relative">
                          <select
                            value={formData.serviceType}
                            onChange={(e) => handleInputChange('serviceType', e.target.value)}
                            className="w-full px-4 py-3 bg-accent-warm/50 border border-accent-stone rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:border-accent-amber focus:ring-accent-amber appearance-none cursor-pointer"
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-accent-charcoal/40">
                            ▼
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Email Input */}
                      <div className="flex flex-col">
                        <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="client@remodel.com"
                          className={`w-full px-4 py-3 bg-accent-warm/50 border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-accent-stone focus:border-accent-amber focus:ring-accent-amber'
                          }`}
                        />
                        {errors.email && <span className="text-red-500 font-sans text-[11px] mt-1.5">{errors.email}</span>}
                      </div>

                      {/* Phone Input */}
                      <div className="flex flex-col">
                        <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(425) 555-0199"
                          className={`w-full px-4 py-3 bg-accent-warm/50 border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:bg-white transition-all ${
                            errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-accent-stone focus:border-accent-amber focus:ring-accent-amber'
                          }`}
                        />
                        {errors.phone && <span className="text-red-500 font-sans text-[11px] mt-1.5">{errors.phone}</span>}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Area selection */}
                      <div className="flex flex-col">
                        <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Service Area *</label>
                        <div className="relative">
                          <select
                            value={formData.serviceArea}
                            onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                            className="w-full px-4 py-3 bg-accent-warm/50 border border-accent-stone rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:border-accent-amber focus:ring-accent-amber appearance-none cursor-pointer"
                          >
                            {serviceAreas.map((area) => (
                              <option key={area.value} value={area.value}>{area.label}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-accent-charcoal/40">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Timeframe option */}
                      <div className="flex flex-col">
                        <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Remodel Commencement *</label>
                        <div className="relative">
                          <select
                            value={formData.timeframe}
                            onChange={(e) => handleInputChange('timeframe', e.target.value)}
                            className="w-full px-4 py-3 bg-accent-warm/50 border border-accent-stone rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:border-accent-amber focus:ring-accent-amber appearance-none cursor-pointer"
                          >
                            {timeframes.map((time) => (
                              <option key={time.value} value={time.value}>{time.label}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-accent-charcoal/40">
                            ▼
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Project text details */}
                    <div className="flex flex-col">
                      <label className="font-mono text-[10px] uppercase font-bold tracking-wider text-accent-charcoal/60 mb-2">Project Brief & Custom Demands *</label>
                      <textarea
                        value={formData.details}
                        onChange={(e) => handleInputChange('details', e.target.value)}
                        placeholder="Please describe files, sizing, tile patterns, load barriers, plumbing changes..."
                        rows={4}
                        className={`w-full px-4 py-3 bg-accent-warm/50 border rounded-xl font-sans text-xs sm:text-sm focus:outline-none focus:ring-1 focus:bg-white transition-all resize-y ${
                          errors.details ? 'border-red-500 focus:ring-red-500' : 'border-accent-stone focus:border-accent-amber focus:ring-accent-amber'
                        }`}
                      />
                      {errors.details && <span className="text-red-500 font-sans text-[11px] mt-1.5">{errors.details}</span>}
                    </div>

                    {/* Email note explanation */}
                    <p className="font-mono text-[9px] text-accent-charcoal/45">
                      📧 Book requests dispatch instantly to Isaac Talmage M's corporate system proxying info@talmageconstruction.com
                    </p>

                    {/* Form submit button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-accent-charcoal text-white hover:bg-accent-amber font-sans text-xs uppercase tracking-widest font-extrabold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <>Inscribing details...</>
                      ) : (
                        <>
                          Request Free Consultation
                          <Send size={13} />
                        </>
                      )}
                    </button>

                    {submitError && (
                      <p role="alert" className="font-sans text-xs text-red-600 text-center">
                        {submitError}
                      </p>
                    )}

                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 h-full"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-6">
                      <Check size={32} strokeWidth={2.5} className="animate-bounce" />
                    </div>

                    <span className="bg-emerald-150 text-emerald-700 border border-emerald-300 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest font-bold uppercase mb-4">
                      Direct Request Dispatched!
                    </span>

                    <h3 className="font-heading font-extrabold text-2xl text-accent-charcoal mb-4">
                      Thank You, {formData.fullName}!
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-accent-charcoal/70 leading-relaxed max-w-md mb-8">
                      Your on-site consultation request for a <span className="font-semibold text-accent-amber">{serviceOptions.find(o => o.value === formData.serviceType)?.label}</span> has been securely delivered to Isaac Talmage. We will call you within 24 hours to confirm.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md border-t border-accent-stone pt-6 mb-8 text-left font-mono text-[11px] text-accent-charcoal/60">
                      <div>
                        <p className="uppercase text-[9px] text-accent-charcoal/40">Email Recorded</p>
                        <p className="font-sans font-medium text-accent-charcoal truncate">{formData.email}</p>
                      </div>
                      <div>
                        <p className="uppercase text-[9px] text-accent-charcoal/40">Schedule Target</p>
                        <p className="font-sans font-medium text-accent-charcoal">{timeframes.find(t => t.value === formData.timeframe)?.label}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 font-sans text-xs uppercase font-extrabold text-accent-amber hover:text-accent-charcoal transition-colors cursor-pointer"
                    >
                      Refactor details or send another request <ArrowRight size={13} />
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
