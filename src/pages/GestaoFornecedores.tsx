import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import LpNav from "@/components/lp/LpNav";
import LpHero, { type Cluster } from "@/components/lp/LpHero";
import LpProblem from "@/components/lp/LpProblem";
import LpVirada from "@/components/lp/LpVirada";
import LpDna from "@/components/lp/LpDna";
import LpImplementacao from "@/components/lp/LpImplementacao";
import LpConsultoria from "@/components/lp/LpConsultoria";
import LpProva from "@/components/lp/LpProva";
import LpParaQuem from "@/components/lp/LpParaQuem";
import LpTeste from "@/components/lp/LpTeste";
import LpSobre from "@/components/lp/LpSobre";
import Footer from "@/components/landing/Footer";

const clusters: Cluster[] = ["default", "fssc", "brcgs", "iso9001", "haccp", "anvisa", "fornecedores"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MyTS — Gestão de fornecedores e conformidade",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma de gestão de fornecedores, processos e documentos para indústrias de alimentos, pronta para FSSC 22000, BRCGS, IFS, ISO 9001 e APPCC/HACCP.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "Teste grátis por 30 dias, sem cartão de crédito.",
  },
  provider: {
    "@type": "Organization",
    name: "MyTS — My Trusted Source",
    url: "https://myt-s.com",
  },
};

const GestaoFornecedores = () => {
  const [params] = useSearchParams();
  const raw = (params.get("c") ?? "default") as Cluster;
  const cluster = clusters.includes(raw) ? raw : "default";

  return (
    <>
      <Helmet>
        <title>Gestão de fornecedores e conformidade para alimentos | MyTS</title>
        <meta
          name="description"
          content="Fornecedores, processos e documentos organizados para qualquer norma da sua indústria — FSSC 22000, BRCGS, IFS, ISO 9001, APPCC/HACCP. Teste grátis, sem cartão."
        />
        <link rel="canonical" href="https://myt-s.com/gestao-de-fornecedores" />
        <meta property="og:title" content="Gestão de fornecedores e conformidade para alimentos | MyTS" />
        <meta
          property="og:description"
          content="Documento venceu. Ninguém avisou. Até agora. Fornecedores, processos e documentos num lugar só — pronto para qualquer norma."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <LpNav />
        <LpHero cluster={cluster} />
        <LpProblem />
        <LpVirada />
        <LpDna />
        <LpImplementacao />
        <LpConsultoria />
        <LpProva />
        <LpParaQuem />
        <LpTeste />
        <LpSobre />
        <Footer />
      </main>
    </>
  );
};

export default GestaoFornecedores;
