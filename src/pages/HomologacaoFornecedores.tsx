import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import LpNav from "@/components/lp/LpNav";
import HomHero, { type HomCluster } from "@/components/hom/HomHero";
import HomProblem from "@/components/hom/HomProblem";
import HomVirada from "@/components/hom/HomVirada";
import HomPorArea from "@/components/hom/HomPorArea";
import HomDna from "@/components/hom/HomDna";
import HomImplementacao from "@/components/hom/HomImplementacao";
import HomConsultoria from "@/components/hom/HomConsultoria";
import HomProva from "@/components/hom/HomProva";
import HomParaQuem from "@/components/hom/HomParaQuem";
import HomTeste from "@/components/hom/HomTeste";
import HomSobre from "@/components/hom/HomSobre";
import Footer from "@/components/landing/Footer";

const clusters: HomCluster[] = ["default", "homologacao", "risco", "kys", "vencimento", "esg", "materiaprima"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MyTS — Homologação de fornecedores",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma de homologação de fornecedores para indústrias de alimentos: cadastro, documentação, requisitos e indicadores por fornecedor, com autodeclaração do fornecedor e validação da sua equipe.",
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

const HomologacaoFornecedores = () => {
  const [params] = useSearchParams();
  const raw = (params.get("c") ?? "default") as HomCluster;
  const cluster = clusters.includes(raw) ? raw : "default";

  return (
    <>
      <Helmet>
        <title>Homologação de fornecedores para indústria de alimentos | MyTS</title>
        <meta
          name="description"
          content="Cadastro, documentação, requisitos e indicadores por fornecedor, num lugar só. O fornecedor se autodeclara — sua equipe valida. Teste grátis, sem cartão."
        />
        <link rel="canonical" href="https://myt-s.com/homologacao-de-fornecedores" />
        <meta property="og:title" content="Homologação de fornecedores para indústria de alimentos | MyTS" />
        <meta
          property="og:description"
          content="Fornecedor novo. Planilha de novo? Cadastro, documentação e requisitos por fornecedor num lugar só — o fornecedor se autodeclara, sua equipe valida."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <LpNav />
        <HomHero cluster={cluster} />
        <HomProblem />
        <HomVirada />
        <HomPorArea />
        <HomDna />
        <HomImplementacao />
        <HomConsultoria />
        <HomProva />
        <HomParaQuem />
        <HomTeste />
        <HomSobre />
        <Footer />
      </main>
    </>
  );
};

export default HomologacaoFornecedores;
