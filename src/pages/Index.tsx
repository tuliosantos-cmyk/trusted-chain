import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import CaseStrip from "@/components/landing/CaseStrip";
import Logos from "@/components/landing/Logos";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Results from "@/components/landing/Results";
import Network from "@/components/landing/Network";
import CTAForm from "@/components/landing/CTAForm";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <CaseStrip />
      <Logos />
      <Problem />
      <HowItWorks />
      <Results />
      <Network />
      <CTAForm />
      <Footer />
    </main>
  );
};

export default Index;
