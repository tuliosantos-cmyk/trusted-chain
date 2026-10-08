import augusta from '@/assets/clientes/Augusta_Alimentos_logo.png';
import cvale from '@/assets/clientes/C._Vale_logo.png';
import carbex from '@/assets/clientes/Carbex_logo.png';
import carrefour from '@/assets/clientes/Carrefour_logo.png';
import cfs from '@/assets/clientes/CFS_logo.png';
import icofort from '@/assets/clientes/Icofort_logo.png';
import korin from '@/assets/clientes/Korin_logo.png';
import laticinios from '@/assets/clientes/Laticínios_Silvianópolis_logo.png';
import viskase from '@/assets/clientes/Viskase_logo.png';
import casa from '@/assets/clientes/casa_do_pão_de_queijo_logo.png';
import especiali from '@/assets/clientes/Especiali_Alimentos_logo.png';
import frumar from '@/assets/clientes/Frumar_logo.png';
import herboflora from '@/assets/clientes/Herboflora_logo.png';
import jl from '@/assets/clientes/JL_alimentos_logo.png';
import proregi from '@/assets/clientes/Proregi_Logo_laranja.png';
import takasago from '@/assets/clientes/Takasago_Logo.png';
import aval from '@/assets/logos/aval.png.asset.json';
import martins from '@/assets/logos/martins.jpg.asset.json';
import atakarejo from '@/assets/logos/atakarejo.webp.asset.json';

// The hosted asset origin also resolves the existing pointers in local PDF rendering.
const assetUrl = (url: string) => new URL(url, 'https://id-preview--f991cff1-300a-49e4-bc63-d89deb2a73e4.lovable.app').href;

/** Confirmed customer roster from the existing institutional and commercial materials.
 * Implementation, pilot and proposal accounts are deliberately not mixed into this list.
 */
export const commercialClients = [
  { name: 'Carrefour', src: carrefour }, { name: 'Korin', src: korin },
  { name: 'C.Vale', src: cvale }, { name: 'Redes Martins', src: assetUrl(martins.url) },
  { name: 'Atakarejo', src: assetUrl(atakarejo.url) }, { name: 'AVAL', src: assetUrl(aval.url) },
  { name: 'Augusta Alimentos', src: augusta }, { name: 'CFS', src: cfs },
  { name: 'Carbex', src: carbex }, { name: 'Icofort', src: icofort },
  { name: 'Viskase', src: viskase }, { name: 'Takasago', src: takasago },
  { name: 'Especiali Alimentos', src: especiali }, { name: 'Frumar', src: frumar },
  { name: 'Herboflora', src: herboflora }, { name: 'JL Alimentos', src: jl },
  { name: 'Proregi', src: proregi }, { name: 'Casa do Pão de Queijo', src: casa },
  { name: 'Laticínios Silvianópolis', src: laticinios },
];

/** Verified on 2026-10-08. Titles and dates belong to the publisher; summaries are paraphrases. */
export const commercialNews = [
  {
    publisher: 'Valor Econômico', date: '07 mai 2026',
    title: 'Carrefour quer atrair produtor à rastreabilidade',
    summary: 'MyTS como parceira no desenvolvimento da plataforma Jornada da Autonomia, voltada à rastreabilidade e às práticas socioambientais da cadeia.',
    url: 'https://valor.globo.com/agronegocios/noticia/2026/05/07/carrefour-quer-atrair-produtor-a-rastreabilidade.ghtml',
    verificationUrl: 'https://valorinternational.globo.com/agribusiness/news/2026/05/07/carrefour-launches-traceability-program-for-farmers.ghtml',
  },
  {
    publisher: 'TI Inside', date: '12 mai 2026',
    title: 'Carrefour Brasil lança Jornada da Autonomia para desenvolver produtores rurais da cadeia de FLV',
    summary: 'Diagnóstico, autoavaliação, aprendizado e monitoramento contínuo em uma iniciativa desenvolvida com a MyTS.',
    url: 'https://tiinside.com.br/12/05/2026/carrefour-brasil-lanca-jornada-da-autonomia-para-desenvolver-produtores-rurais-da-cadeia-de-flv/',
  },
  {
    publisher: 'Inforchannel', date: '10 out 2025',
    title: 'MyTS e Korin anunciam tecnologia que leva transparência em sustentabilidade e ESG',
    summary: 'Korin 360 utiliza a tecnologia MyTS 360 para conectar dados de origem e práticas de sustentabilidade ao consumidor.',
    url: 'https://inforchannel.com.br/2025/10/10/myts-e-korin-anunciam-tecnologia-que-leva-transparencia-em-sustentabilidade-e-esg-ate-o-consumidor/',
  },
];
