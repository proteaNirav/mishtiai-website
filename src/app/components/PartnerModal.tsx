import React, { useState } from "react";
import { X, Handshake, CheckCircle2 } from "lucide-react";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    partnershipType: "",
    proposalSummary: ""
  });

  const partnershipTypes = [
    "Enterprise Deployment",
    "Integration Partner",
    "Research Collaboration",
    "Strategic / Investment"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership request submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,212,255,0.2)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="p-8 pb-6 border-b border-border/50">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5">
              <Handshake className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-wide">
                Partnership Opportunities
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Partner With Us</h2>
            <p className="text-muted-foreground">
              Interested in partnering with Mishti AI? Let's explore opportunities together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Company <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Partnership Type <span className="text-destructive">*</span>
                </label>
                <select
                  required
                  value={formData.partnershipType}
                  onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">Select partnership type...</option>
                  {partnershipTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Proposal Summary <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  value={formData.proposalSummary}
                  onChange={(e) => setFormData({ ...formData, proposalSummary: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your partnership proposal, goals, and what you'd like to collaborate on..."
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Please provide details about your proposed partnership and expected outcomes
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Submit Partnership Request
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Partnership requests are reviewed within 5 business days.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
