import React, { useState } from "react";
import { Hero } from "./components/Hero";
import { SystemGuarantees } from "./components/SystemGuarantees";
import { Problem } from "./components/Problem";
import { Approach } from "./components/Approach";
import { Architecture } from "./components/Architecture";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { ExecutionFlow } from "./components/ExecutionFlow";
import { Differentiation } from "./components/Differentiation";
import { GACS } from "./components/GACS";
import { LES } from "./components/LES";
import { Console } from "./components/Console";
import { Roadmap } from "./components/Roadmap";
import { WhoIsThisFor } from "./components/WhoIsThisFor";
import { Access } from "./components/Access";
import { Footer } from "./components/Footer";
import { AccessModal } from "./components/AccessModal";
import { PartnerModal } from "./components/PartnerModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero onRequestAccess={() => setIsModalOpen(true)} />
      <SystemGuarantees />
      <Problem />
      <Approach />
      <Architecture />
      <ArchitectureDiagram />
      <ExecutionFlow />
      <Differentiation />
      <GACS />
      <LES />
      <Console />
      <Roadmap />
      <WhoIsThisFor />
      <Access
        onRequestAccess={() => setIsModalOpen(true)}
        onPartnerClick={() => setIsPartnerModalOpen(true)}
      />
      <Footer />

      <AccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PartnerModal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)} />
    </div>
  );
}
