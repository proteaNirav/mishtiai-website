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
import { Header } from "./components/Header";
import { AccessModal } from "./components/AccessModal";
import { PartnerModal } from "./components/PartnerModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const scrollToAccess = () => {
    document.getElementById("access")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <Header onRequestAccess={() => scrollToAccess()} />{/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(10,10,15,0.7)",
          backdropFilter: "blur(10px)"
        }}
      >
        <img
          src="/logo.svg"
          alt="Mishti AI"
          style={{
            height: "36px",
            marginRight: "10px"
          }}
        />
        <span
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#E6F1FF",
            letterSpacing: "0.5px"
          }}
        >
          Mishti AI
        </span>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-background">
        <Hero onRequestAccess={() => scrollToAccess()} />
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
          onRequestAccess={() => scrollToAccess()}
          onPartnerClick={() => setIsPartnerModalOpen(true)}
        />
        <Footer />

        {/* Modals */}
        <AccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <PartnerModal
          isOpen={isPartnerModalOpen}
          onClose={() => setIsPartnerModalOpen(false)}
        />
      </div>
    </div>
  );
}



