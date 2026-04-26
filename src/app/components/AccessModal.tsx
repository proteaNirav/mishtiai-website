import React, { useState } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle2, User, Building2, Target, Shield, FileCheck } from "lucide-react";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessModal({ isOpen, onClose }: AccessModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form state
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    workEmail: "",
    phone: "",
    // Step 2
    companyName: "",
    industry: "",
    companySize: "",
    role: "",
    // Step 3
    primaryUseCase: "",
    systemsInteract: "",
    // Step 4
    aiInProduction: "",
    requiresCompliance: "",
    timeline: "",
    // Step 5
    confirmation: false
  });

  const industries = [
    "Financial Services",
    "Healthcare",
    "Manufacturing",
    "Technology",
    "Government",
    "Energy & Utilities",
    "Retail",
    "Telecommunications",
    "Other"
  ];

  const companySizes = [
    "1-50 employees",
    "50-200 employees",
    "200-1,000 employees",
    "1,000+ employees"
  ];

  const roles = [
    "CTO / Chief Technology Officer",
    "Product Head / CPO",
    "IT Head / Director",
    "Engineering Lead",
    "Developer / Engineer",
    "Architect",
    "Other"
  ];

  const timelines = [
    "Immediate (within 30 days)",
    "1-3 months",
    "Exploring / Research phase"
  ];

  const steps = [
    { number: 1, title: "Identity", icon: User },
    { number: 2, title: "Organization", icon: Building2 },
    { number: 3, title: "Intent", icon: Target },
    { number: 4, title: "Maturity", icon: Shield },
    { number: 5, title: "Confirmation", icon: FileCheck }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,212,255,0.2)]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Header */}
          <div className="p-8 pb-6 border-b border-border/50">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-wide">
                Enterprise Access
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Request Access to Mishti AI</h2>
            <p className="text-muted-foreground">
              Access is granted to qualified enterprise teams working on governed AI systems.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="px-8 pt-6 pb-4">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                          isCompleted
                            ? "bg-primary/20 border-primary/40 text-primary"
                            : isActive
                            ? "bg-primary/10 border-primary/50 text-primary shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                            : "bg-muted/10 border-border text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="text-xs font-medium text-center">
                        <div className={isActive || isCompleted ? "text-primary" : "text-muted-foreground"}>
                          {step.title}
                        </div>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-px bg-gradient-to-r from-border via-border to-transparent mx-2 mb-8" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 pt-4">
            {/* Step 1 - Identity */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Work Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john.doe@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            )}

            {/* Step 2 - Organization */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Company Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Acme Corporation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Industry <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Select industry...</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Company Size <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Select company size...</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Role <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Select your role...</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 - Intent */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    What do you want to use Mishti AI for? <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={formData.primaryUseCase}
                    onChange={(e) => setFormData({ ...formData, primaryUseCase: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Describe your primary use case, expected outcomes, and governance requirements..."
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Be specific about your governance and audit requirements
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    What systems will this interact with? <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <textarea
                    value={formData.systemsInteract}
                    onChange={(e) => setFormData({ ...formData, systemsInteract: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="e.g., ERP systems, databases, CI/CD pipelines, monitoring tools..."
                  />
                </div>
              </div>
            )}

            {/* Step 4 - Maturity Filter */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Are you currently using AI in production? <span className="text-destructive">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="aiInProduction"
                        value="yes"
                        checked={formData.aiInProduction === "yes"}
                        onChange={(e) => setFormData({ ...formData, aiInProduction: e.target.value })}
                        className="w-4 h-4 text-primary focus:ring-primary/20"
                      />
                      <span>Yes, we have AI systems in production</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="aiInProduction"
                        value="no"
                        checked={formData.aiInProduction === "no"}
                        onChange={(e) => setFormData({ ...formData, aiInProduction: e.target.value })}
                        className="w-4 h-4 text-primary focus:ring-primary/20"
                      />
                      <span>No, we are planning deployment</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Do you require audit/compliance capabilities? <span className="text-destructive">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="requiresCompliance"
                        value="yes"
                        checked={formData.requiresCompliance === "yes"}
                        onChange={(e) => setFormData({ ...formData, requiresCompliance: e.target.value })}
                        className="w-4 h-4 text-primary focus:ring-primary/20"
                      />
                      <span>Yes, audit trails and compliance are critical</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="requiresCompliance"
                        value="no"
                        checked={formData.requiresCompliance === "no"}
                        onChange={(e) => setFormData({ ...formData, requiresCompliance: e.target.value })}
                        className="w-4 h-4 text-primary focus:ring-primary/20"
                      />
                      <span>No immediate compliance requirements</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Expected Timeline <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Select timeline...</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 5 - Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                  <h3 className="text-lg font-bold mb-4">Access Request Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{formData.fullName || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{formData.workEmail || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company:</span>
                      <span className="font-medium">{formData.companyName || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <span className="font-medium">{formData.role || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium">{formData.timeline || "—"}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.confirmation}
                    onChange={(e) => setFormData({ ...formData, confirmation: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm leading-relaxed">
                    I understand Mishti AI is a <span className="font-semibold text-primary">controlled, governed system</span> with limited access. Access is granted based on enterprise fit and governance requirements.
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-8 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-3 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!formData.confirmation}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  Submit Access Request
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Enterprise access requests are reviewed within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
