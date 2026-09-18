import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, Building2, Check, CheckCircle2, ClipboardCheck, Download, FileCheck2,
  FileText, Globe2, Leaf, Mail, MapPin, MessageCircle, Search, ShieldCheck, Sparkles,
  TrendingUp, UploadCloud, Users, Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mytsLogo from "@/assets/myts-logo.svg";
import mytsMark from "@/assets/myts-mark.svg";
import korinScene from "@/assets/korin/mockup-qr-embalagem.jpg";
import carrefourLogo from "@/assets/clientes/Carrefour_logo.png";
import korinLogo from "@/assets/clientes/Korin_logo.png";
import augustaLogo from "@/assets/clientes/Augusta_Alimentos_logo.png";
import cvaleLogo from "@/assets/clientes/C._Vale_logo.png";
import carbexLogo from "@/assets/clientes/Carbex_logo.png";
import cfsLogo from "@/assets/clientes/CFS_logo.png";
import icofortLogo from "@/assets/clientes/Icofort_logo.png";
import laticiniosSilvanopolisLogo from "@/assets/clientes/Laticínios_Silvianópolis_logo.png";
import viskaseLogo from "@/assets/clientes/Viskase_logo.png";
import casaPaoDeQueijoLogo from "@/assets/clientes/casa_do_pão_de_queijo_logo.png";
import especialiLogo from "@/assets/clientes/Especiali_Alimentos_logo.png";
import frumarLogo from "@/assets/clientes/Frumar_logo.png";
import herbofloraLogo from "@/assets/clientes/Herboflora_logo.png";
import jlAlimentosLogo from "@/assets/clientes/JL_alimentos_logo.png";
import proregiLogo from "@/assets/clientes/Proregi_Logo_laranja.png";
import takasagoLogo from "@/assets/clientes/Takasago_Logo.png";

const W = 1600;
const H = 900;
const P = 64;

const usePrintMode = () => {
  const [print, setPrint] = useState(false);
  useLayoutEffect(() => setPrint(new URLSearchParams(window.location.search).has("print")), []);
  return print;
};

const Slide = ({ children, dark = false, decor }: { children: React.ReactNode; dark?: boolean; decor?: React.ReactNode }) => {
  const ref = useRef<HTMLElement>(null);
  const print = usePrintMode();
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    if (print || !ref.current) return;
    const el = ref.current;
    const update = () => setScale(el.clientWidth / W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [print]);
  const activeScale = print ? 1 : scale;
  return (
    <section
      ref={ref}
      className={`${dark ? "bg-primary" : "bg-background"} relative slide-frame`}
      style={print ? { width: W, height: H, overflow: "hidden", breakAfter: "page" } : { width: "min(100%, calc((100vh - 64px) * 16 / 9))", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 16, scrollSnapAlign: "center" }}
    >
      <div className={`${dark ? "bg-primary" : "bg-background"} absolute left-0 top-0 overflow-hidden`} style={{ width: W, height: H, transform: `scale(${activeScale})`, transformOrigin: "top left", visibility: activeScale ? "visible" : "hidden" }}>
        {decor}
        <div className="relative flex h-full w-full flex-col" style={{ padding: P }}>{children}</div>
      </div>
    </section>
  );
};

const Grid = ({ dark = false }: { dark?: boolean }) => <div aria-hidden className={`absolute inset-0 ${dark ? "opacity-20" : "opacity-40"} grid-pattern`} />;
const Mark = ({ className = "" }: { className?: string }) => <img src={mytsMark} alt="" aria-hidden className={`pointer-events-none absolute select-none opacity-[0.06] ${className}`} />;
const Logo = ({ src, alt, h = 34, invert = false }: { src: string; alt: string; h?: number; invert?: boolean }) => <img src={src} alt={alt} className="w-auto object-contain" style={{ height: h, filter: invert ? "brightness(0) invert(1)" : undefined }} />;
const BrandName = ({ children, dark = false, size = 25 }: { children: React.ReactNode; dark?: boolean; size?: number }) => (
  <span className={`font-display font-bold ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size }}>{children}</span>
);

const Header = ({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) => (
  <div className={`flex items-center gap-4 text-[17px] font-bold uppercase ${dark ? "text-accent-glow" : "text-accent"}`} style={{ letterSpacing: "0.16em" }}>
    <span>{n}</span><span className={`h-px w-14 ${dark ? "bg-accent-glow/60" : "bg-accent/50"}`} />{label}
  </div>
);
const Title = ({ children, dark = false, size = 54 }: { children: React.ReactNode; dark?: boolean; size?: number }) => <h2 className={`font-display font-bold leading-[1.08] ${dark ? "text-primary-foreground" : "text-foreground"}`} style={{ fontSize: size, marginTop: 22, maxWidth: 1340 }}>{children}</h2>;
const Pill = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => <span className={`inline-flex items-center rounded-full border px-5 py-2.5 text-[17px] font-semibold ${dark ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground" : "border-accent/25 bg-accent/10 text-accent"}`}>{children}</span>;

const Window = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
    <div className="flex h-12 items-center gap-2 border-b border-border bg-secondary px-5">
      <i className="size-2.5 rounded-full bg-destructive/70" /><i className="size-2.5 rounded-full bg-accent/70" /><i className="size-2.5 rounded-full bg-success/70" />
      <span className="ml-3 text-[16px] text-muted-foreground">{title}</span>
    </div>
    {children}
  </div>
);

const CLIENT_LOGOS = [
  { name: "Augusta Alimentos", src: augustaLogo },
  { name: "C. Vale", src: cvaleLogo },
  { name: "Carbex", src: carbexLogo },
  { name: "Carrefour", src: carrefourLogo },
  { name: "CFS", src: cfsLogo },
  { name: "Icofort", src: icofortLogo },
  { name: "Korin", src: korinLogo },
  { name: "Laticínios Silvianópolis", src: laticiniosSilvanopolisLogo },
  { name: "Viskase", src: viskaseLogo },
  { name: "Casa do Pão de Queijo", src: casaPaoDeQueijoLogo },
  { name: "Especiali Alimentos", src: especialiLogo },
  { name: "Frumar", src: frumarLogo },
  { name: "Herboflora", src: herbofloraLogo },
  { name: "JL Alimentos", src: jlAlimentosLogo },
  { name: "Proregi", src: proregiLogo },
  { name: "Takasago", src: takasagoLogo },
];

const S01 = () => <Slide dark decor={<><Grid dark /><Mark className="-bottom-48 -right-24 w-[700px]" /></>}>
  <div className="flex items-center justify-between"><Logo src={mytsLogo} alt="MyTS" h={44} invert /><Pill dark>Company presentation</Pill></div>
  <div className="flex flex-1 items-center">
    <div className="max-w-[1240px]">
      <p className="text-[22px] font-semibold uppercase text-accent-glow" style={{ letterSpacing: "0.16em" }}>My Trusted Source</p>
      <h1 className="mt-6 font-display text-[76px] font-bold leading-[1.02] text-primary-foreground">Your entire supplier chain,<br /><span className="text-accent-glow">without chasing anyone.</span></h1>
      <p className="mt-8 max-w-[940px] text-[28px] leading-[1.4] text-primary-foreground/85">Technology and technical expertise that turn compliance into a continuous, shared and fully traceable routine.</p>
    </div>
  </div>
  <div className="flex items-center justify-between border-t border-primary-foreground/15 pt-5 text-[17px] text-primary-foreground/75"><span>Supplier management • processes • documents</span><span>myt-s.com</span></div>
</Slide>;

const S04 = () => <Slide decor={<><Grid /><Mark className="-bottom-32 -right-20 w-[520px]" /></>}><Header n="02" label="Who we are" /><Title>Born inside the industry to solve what spreadsheets and e-mail never could.</Title>
  <div className="mt-9 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-8"><div className="flex flex-col justify-center rounded-3xl bg-primary p-11"><div className="flex min-h-[150px] items-center justify-center rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.06] px-12"><Logo src={mytsLogo} alt="MyTS" h={108} invert /></div><p className="mt-7 text-[28px] leading-[1.5] text-primary-foreground/85">MyTS combines technology with specialised consulting to centralise data, integrate workflows and accelerate decisions across the supplier chain.</p><div className="mt-7 flex flex-wrap gap-3"><Pill dark>Food</Pill><Pill dark>Beverages</Pill><Pill dark>Cosmetics</Pill><Pill dark>Consumer goods</Pill></div></div>
  <div className="grid grid-cols-2 gap-5">{[[MapPin,"Botucatu","Brazil"],[Globe2,"Charlotte","United States"],[Globe2,"20+","countries served"],[Users,"4 areas","Procurement • Quality • R&D • Private label"]].map(([I,v,l])=>{const Icon=I as typeof MapPin;return <div key={String(l)} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-card"><Icon className="text-accent" size={36}/><div><strong className="block text-[37px] text-foreground">{String(v)}</strong><span className="mt-2 block text-[20px] leading-snug text-muted-foreground">{String(l)}</span></div></div>})}</div></div>
</Slide>;

const S05 = () => <Slide dark decor={<Grid dark />}><Header n="03" label="What sets us apart" dark /><Title dark>Your suppliers no longer need to be chased.</Title>
  <p className="mt-5 max-w-[1280px] text-[26px] leading-[1.45] text-primary-foreground/80">Each supplier has free, independent access to track open items, submit evidence and demonstrate compliance directly to the buyer.</p>
  <div className="mt-9 flex flex-1 items-center gap-5">{[
    [Building2,"Buyer","Defines the requirements"],[Workflow,"MyTS","Guides and notifies"],[Users,"Supplier","Resolves open items"],[ShieldCheck,"Quality","Validates and decides"],
  ].map(([I,t,d],i,a)=>{const Icon=I as typeof Building2;return <Fragment key={String(t)}><div className={`flex h-[320px] flex-1 flex-col justify-between rounded-3xl border p-8 ${i===1?"border-accent/50 bg-accent/15":"border-primary-foreground/15 bg-primary-foreground/[0.06]"}`}><span className="grid size-18 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Icon size={36}/></span><div><span className="text-[17px] font-bold uppercase text-accent-glow" style={{letterSpacing:"0.12em"}}>0{i+1}</span><h3 className="mt-2 text-[31px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-2 text-[21px] text-primary-foreground/75">{String(d)}</p></div></div>{i<a.length-1&&<ArrowRight className="shrink-0 text-accent-glow" size={32}/>}</Fragment>})}</div>
  <div className="flex justify-center gap-10 border-t border-primary-foreground/15 pt-6 text-[22px] text-primary-foreground"><span>✓ Your team validates, it does not operate</span><span>✓ MyTS alerts you in advance</span><span>✓ At audit time, everything is already in place</span></div>
</Slide>;

const SupplierMock = () => <Window title="My Suppliers"><div className="grid min-h-[520px] grid-cols-[240px_1fr]"><aside className="border-r border-border bg-secondary p-6"><p className="text-[18px] font-bold text-foreground">Chain overview</p>{["All", "Compliant", "Attention", "Pending"].map((x,i)=><div key={x} className={`mt-3 rounded-lg px-4 py-3.5 text-[17px] ${i===0?"bg-accent text-accent-foreground":"text-muted-foreground"}`}>{x}</div>)}</aside><div className="p-7"><div className="flex justify-between"><div><p className="text-[16px] text-muted-foreground">Overall compliance</p><strong className="text-[44px] text-foreground">92%</strong></div><span className="grid size-16 place-items-center rounded-xl bg-success/10 text-success"><TrendingUp size={30}/></span></div><div className="mt-5 h-4 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[92%] bg-success"/></div><div className="mt-6 space-y-3">{[["Vale Verde Cooperative","Complete","ok"],["Prisma Packaging","Expires in 12 days","warn"],["Aromas Sul","Complete","ok"],["Cold Chain Logistics","Awaiting submission","pending"]].map(([n,s,k])=><div key={n} className="flex items-center justify-between rounded-xl border border-border p-4"><div className="flex items-center gap-3"><i className={`size-3 rounded-full ${k==="ok"?"bg-success":k==="warn"?"bg-accent":"bg-muted-foreground"}`}/><span className="text-[19px] font-semibold text-foreground">{n}</span></div><span className="text-[16px] text-muted-foreground">{s}</span></div>)}</div></div></div></Window>;
const S06 = () => <Slide><Header n="04" label="Module 01" /><div className="mt-5 grid flex-1 grid-cols-[0.68fr_1.32fr] items-center gap-10"><div><Pill>My Suppliers</Pill><h2 className="mt-7 font-display text-[55px] font-bold leading-[1.08] text-foreground">Approval and development in a single workflow.</h2><p className="mt-6 text-[25px] leading-[1.45] text-foreground/75">Documents, technical requirements and performance with a fully auditable history. Suppliers resolve their own open items; buyers follow everything in real time.</p><div className="mt-8 space-y-4">{["Free, independent supplier account", "Status visible to both sides", "Automatic expiry alerts"].map(x=><p key={x} className="flex items-center gap-3 text-[21px] text-foreground"><CheckCircle2 className="text-success" size={25}/>{x}</p>)}</div></div><SupplierMock /></div></Slide>;

const S07 = () => <Slide><Header n="05" label="Module 02" /><div className="mt-5 grid flex-1 grid-cols-[0.74fr_1.26fr] items-center gap-10"><div><Pill>My Processes</Pill><h2 className="mt-7 font-display text-[52px] font-bold leading-[1.08] text-foreground">Any operation, broken into stages, inside MyTS.</h2><p className="mt-5 text-[23px] leading-[1.42] text-foreground/75">Beyond self-assessments, checklists and automated records, the module structures complete processes and projects around the reality of each company.</p><div className="mt-6 grid grid-cols-2 gap-3">{["Deadlines and owners","Automatic notifications","Forms and scoring","Action plans","Records and controls","Custom workflows"].map(x=><div key={x} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-[18px] font-semibold text-foreground"><CheckCircle2 className="shrink-0 text-success" size={22}/>{x}</div>)}</div></div><Window title="Process and project management"><div className="p-8"><div className="flex items-center justify-between"><div><p className="text-[17px] text-muted-foreground">Active process</p><h3 className="text-[31px] font-bold text-foreground">Annual supplier qualification</h3></div><Pill>76% complete</Pill></div><div className="mt-8 space-y-4">{[[Check,"Invitation and form","Completed • Sep 4"],[ClipboardCheck,"Scored checklist","Completed • score 87"],[Search,"Technical validation","Under review • owner assigned"],[FileCheck2,"Action plan and control","Next stage • Sep 18"]].map(([I,t,s],i)=>{const Icon=I as typeof Check; return <div key={String(t)} className="flex items-center gap-5"><span className={`grid size-14 place-items-center rounded-full ${i<2?"bg-success text-success-foreground":i===2?"bg-accent text-accent-foreground":"bg-secondary text-muted-foreground"}`}><Icon size={25}/></span><div className="flex-1 rounded-xl border border-border px-5 py-4"><div className="flex justify-between gap-4"><strong className="text-[20px] text-foreground">{String(t)}</strong><span className="text-[16px] text-muted-foreground">{String(s)}</span></div></div></div>})}</div><div className="mt-6 rounded-xl bg-accent/10 p-5 text-[19px] font-semibold text-accent">If it has stages, deadlines and evidence, it can be managed here.</div></div></Window></div></Slide>;

const S08 = () => <Slide><Header n="06" label="Module 03" /><div className="mt-5 grid flex-1 grid-cols-[0.68fr_1.32fr] items-center gap-10"><div><Pill>My Documents</Pill><h2 className="mt-7 font-display text-[55px] font-bold leading-[1.08] text-foreground">Everything ready before the audit arrives.</h2><p className="mt-6 text-[25px] leading-[1.45] text-foreground/75">Internal document management with version control, expiry dates and an auditable history — with no reliance on shared links, USB drives or physical folders.</p></div><Window title="Document centre"><div className="p-8"><div className="flex items-center gap-4"><div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-secondary px-5 py-4 text-[17px] text-muted-foreground"><Search size={21}/>Search by document, standard or owner</div><span className="grid size-14 place-items-center rounded-xl bg-accent text-accent-foreground"><UploadCloud size={27}/></span></div><div className="mt-7 grid grid-cols-3 gap-4">{[["1,284","Valid"],["18","Expiring soon"],["06","Under review"]].map(([v,l],i)=><div key={l} className={`rounded-xl p-6 ${i===1?"bg-accent/10":"bg-secondary"}`}><strong className="text-[35px] text-foreground">{v}</strong><span className="block text-[16px] text-muted-foreground">{l}</span></div>)}</div><div className="mt-6 space-y-4">{[["FSSC 22000 certificate","v.04","12/2027"],["Microbiological report","v.08","11/2026"],["Supplier policy","v.12","No expiry"]].map(([a,b,c])=><div key={a} className="grid grid-cols-[1fr_100px_150px] rounded-xl border border-border p-5 text-[18px]"><strong className="text-foreground">{a}</strong><span className="text-muted-foreground">{b}</span><span className="text-muted-foreground">{c}</span></div>)}</div></div></Window></div></Slide>;

const S09 = () => <Slide dark decor={<><Grid dark /><Mark className="-bottom-40 -left-20 w-[560px]" /></>}><Header n="07" label="Beyond the software" dark /><Title dark>Technology backed by technical expertise that makes it happen.</Title><p className="mt-5 text-[25px] text-primary-foreground/80">When a company needs more than a tool, our specialists step into the operation.</p><div className="mt-9 grid flex-1 grid-cols-2 gap-6">{[[Users,"Quality outsourcing","Ongoing technical support to sustain the operation."],[ShieldCheck,"Second-party audits","Direct supplier assessment against your own standard."],[ClipboardCheck,"Technical validation","Supplier self-assessments reviewed and validated by a specialist."],[Sparkles,"Guided implementation","Assisted configuration and adoption from day one."]].map(([I,t,d])=>{const Icon=I as typeof Users;return <div key={String(t)} className="flex items-center gap-7 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-8"><span className="grid size-18 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Icon size={35}/></span><div><h3 className="text-[30px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-3 text-[22px] leading-[1.42] text-primary-foreground/80">{String(d)}</p></div></div>})}</div></Slide>;

const S10 = () => <Slide><Header n="08" label="Case study • Journey to Autonomy" /><div className="mt-6 grid flex-1 grid-cols-[0.88fr_1.12fr] gap-10"><div className="flex flex-col justify-center"><div className="flex w-fit items-center gap-7 rounded-2xl border border-border bg-card px-8 py-6 shadow-card"><Logo src={carrefourLogo} alt="Carrefour Group Brazil" h={76}/><div className="h-14 w-px bg-border"/><div><span className="block text-[16px] font-bold uppercase text-success" style={{letterSpacing:"0.12em"}}>Nationwide programme</span><BrandName size={30}>Journey to Autonomy</BrandName></div></div><h2 className="mt-8 font-display text-[48px] font-bold leading-[1.08] text-foreground">A new development baseline for Brazilian retail.</h2><p className="mt-6 text-[23px] leading-[1.45] text-foreground/75">Designed for Carrefour Group Brazil, the programme connects suppliers and their own suppliers in a continuous journey of development, monitoring and assessment.</p><p className="mt-5 text-[20px] font-semibold leading-[1.4] text-success">A shared base of data and evidence with the potential to raise the standard of the entire retail chain.</p></div><div className="flex flex-col justify-center rounded-3xl bg-primary p-10"><p className="text-[17px] font-bold uppercase text-accent-glow" style={{letterSpacing:"0.14em"}}>Full visibility of the chain</p><div className="mt-7 grid grid-cols-2 gap-5">{[[Users,"Development","Guided progress across the whole network"],[TrendingUp,"Monitoring","Indicators and open items in real time"],[ClipboardCheck,"Assessment","Common criteria and traceable evidence"],[Workflow,"Integrated data","One foundation for retail decisions"]].map(([I,t,d])=>{const Icon=I as typeof Users;return <div key={String(t)} className="min-h-[180px] rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-6"><Icon className="text-accent-glow" size={34}/><strong className="mt-5 block text-[24px] text-primary-foreground">{String(t)}</strong><span className="mt-2 block text-[17px] leading-snug text-primary-foreground/75">{String(d)}</span></div>})}</div></div></div></Slide>;

const S11 = () => <Slide dark decor={<Grid dark />}><Header n="09" label="Case • Korin / MyTS 360°" dark /><div className="mt-7 grid flex-1 grid-cols-[0.9fr_1.1fr] gap-11"><div className="overflow-hidden rounded-3xl"><img src={korinScene} alt="Embalagem Korin com QR code e experiência digital" className="h-full w-full object-cover"/></div><div className="flex flex-col justify-center"><div className="flex w-fit items-center rounded-2xl bg-primary-foreground px-7 py-4"><Logo src={korinLogo} alt="Korin" h={66}/></div><h2 className="mt-7 font-display text-[51px] font-bold leading-[1.08] text-primary-foreground">Do campo à prateleira, com o produtor em evidência.</h2><p className="mt-6 text-[24px] leading-[1.48] text-primary-foreground/80">O QR code da embalagem conecta o consumidor à origem do produto, com vídeo, informação e depoimento real.</p><div className="mt-8 grid grid-cols-2 gap-5">{[["38","produtores rurais"],["116","pessoas no campo"],["13%","produção orgânica"],["47%","origem familiar"]].map(([v,l])=><div key={l} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-6"><strong className="text-[39px] text-accent-glow">{v}</strong><span className="ml-3 text-[19px] text-primary-foreground/80">{l}</span></div>)}</div><a href="https://myt-s.com/korin/" target="_blank" rel="noreferrer" className="mt-7 inline-flex w-fit items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-4 text-[20px] font-bold text-primary-foreground hover:bg-primary-foreground/20"><Globe2 size={22}/>myt-s.com/korin/</a></div></div></Slide>;

const S12 = () => <Slide><Header n="10" label="Confiança em escala" /><Title size={48}>Resultados construídos em cadeias reais.</Title><div className="mt-6 grid grid-cols-4 gap-5">{[[Building2,"2.000+","empresas ativas"],[FileText,"500 mil+","documentos"],[Workflow,"200+","fluxos ativos"],[Globe2,"20+","países"]].map(([I,v,l])=>{const Icon=I as typeof Building2;return <div key={String(l)} className="rounded-2xl border border-border bg-card p-6 shadow-card"><Icon className="text-accent" size={28}/><strong className="mt-5 block text-[38px] text-foreground">{String(v)}</strong><span className="text-[18px] text-muted-foreground">{String(l)}</span></div>})}</div><div className="mt-5 flex flex-1 flex-col justify-center rounded-3xl bg-secondary px-10"><p className="text-center text-[16px] font-bold uppercase text-muted-foreground" style={{letterSpacing:"0.14em"}}>Empresas que já confiam na MyTS</p><div className="mt-5 grid grid-cols-4 items-center gap-4">{CLIENT_LOGOS.map(({name,src})=><div key={name} className="flex min-h-[78px] items-center justify-center rounded-xl border border-border bg-card px-4"><Logo src={src} alt={name} h={40}/></div>)}</div></div></Slide>;

const SMethod = () => <Slide dark decor={<><Grid dark/><Mark className="-bottom-36 -right-16 w-[560px]"/></>}><Header n="11" label="Metodologia MyTS" dark/><Title dark>Um ciclo completo. Uma única plataforma.</Title><p className="mt-5 max-w-[1180px] text-[25px] leading-[1.45] text-primary-foreground/80">Da entrada do fornecedor à evolução contínua, cada etapa alimenta a próxima e mantém dados, responsáveis e evidências conectados.</p><div className="mt-10 flex flex-1 items-center gap-5">{[[ShieldCheck,"Homologação","Requisitos, documentos e aprovação inicial"],[Workflow,"Gestão","Processos, projetos, prazos e responsáveis"],[Search,"Monitoramento","Alertas, indicadores e controle contínuo"],[TrendingUp,"Desenvolvimento","Planos de ação, evolução e desempenho"]].map(([I,t,d],i,a)=>{const Icon=I as typeof ShieldCheck;return <Fragment key={String(t)}><div className="flex h-[330px] flex-1 flex-col justify-between rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.07] p-8"><div className="flex items-center justify-between"><span className="grid size-16 place-items-center rounded-2xl bg-accent/15 text-accent-glow"><Icon size={34}/></span><span className="text-[18px] font-bold text-accent-glow">0{i+1}</span></div><div><h3 className="text-[29px] font-bold text-primary-foreground">{String(t)}</h3><p className="mt-3 text-[19px] leading-[1.4] text-primary-foreground/75">{String(d)}</p></div></div>{i<a.length-1&&<ArrowRight className="shrink-0 text-accent-glow" size={30}/>}</Fragment>})}</div><div className="rounded-2xl border border-accent/30 bg-accent/15 p-5 text-center text-[22px] font-semibold text-primary-foreground">Sem sistemas isolados, retrabalho ou perda de histórico: a inteligência da cadeia permanece em um só lugar.</div></Slide>;

const S13 = () => <Slide decor={<><Grid /><Mark className="-right-24 -bottom-36 w-[540px]" /></>}><Header n="12" label="Como começar" /><div className="mt-9 grid flex-1 grid-cols-[0.9fr_1.1fr] items-center gap-11"><div><Pill>Teste gratuito por 30 dias</Pill><h2 className="mt-8 font-display text-[61px] font-bold leading-[1.06] text-foreground">Veja a plataforma funcionar antes da conversa de venda.</h2><p className="mt-7 text-[25px] leading-[1.48] text-foreground/75">Durante o teste, você acompanha o fornecedor usando a própria conta e enviando documentos sozinho.</p></div><div className="rounded-3xl bg-primary p-11"><p className="text-[17px] font-bold uppercase text-accent-glow" style={{letterSpacing:"0.14em"}}>Incluído no plano MyTS</p><h3 className="mt-5 text-[36px] font-bold text-primary-foreground">Sessão Estratégica de Conformidade</h3><p className="mt-4 text-[22px] leading-[1.45] text-primary-foreground/80">2 horas com um especialista para orientar a operação em FSSC 22000, BRCGS, IFS, BPF, APPCC/HACCP e gestão de fornecedores.</p><div className="mt-8 space-y-4">{["Suporte de implementação", "Configuração do primeiro fluxo", "Acompanhamento durante o teste"].map(x=><p key={x} className="flex items-center gap-3 text-[21px] text-primary-foreground"><CheckCircle2 className="text-accent-glow" size={24}/>{x}</p>)}</div></div></div></Slide>;

const S14 = () => <Slide dark decor={<><Grid dark /><Mark className="left-1/2 top-1/2 w-[720px] -translate-x-1/2 -translate-y-1/2" /></>}><div className="flex items-center justify-between"><Logo src={mytsLogo} alt="MyTS" h={50} invert/><Pill dark>Vamos conversar</Pill></div><div className="flex flex-1 flex-col items-center justify-center text-center"><h2 className="max-w-[1320px] font-display text-[68px] font-bold leading-[1.06] text-primary-foreground">Sua equipe analisa.<br/><span className="text-accent-glow">A MyTS mantém a cadeia em movimento.</span></h2><div className="mt-11 flex gap-6"><a href="mailto:tulio.santos@myt-s.com" className="flex items-center gap-3 rounded-xl bg-accent px-7 py-5 text-[22px] font-bold text-accent-foreground"><Mail size={25}/>tulio.santos@myt-s.com</a><a href="https://wa.me/5514991286962" className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-7 py-5 text-[22px] font-bold text-primary-foreground"><MessageCircle size={25}/>(14) 99128-6962</a></div><p className="mt-9 text-[27px] font-semibold text-primary-foreground">Túlio dos Santos <span className="text-primary-foreground/55">• MyTS</span></p></div><div className="flex justify-between border-t border-primary-foreground/15 pt-5 text-[19px] text-primary-foreground/75"><span>myt-s.com</span><span>Botucatu, Brasil • Charlotte, EUA</span></div></Slide>;

const ApresentacaoInstitucional = () => {
  const print = usePrintMode();
  return <main className="flex min-h-screen flex-col items-center bg-primary" style={{ padding: print ? 0 : "32px 0", gap: print ? 0 : 32, overflowX: "hidden" }}>
    <Helmet><title>MyTS — Apresentação institucional</title><meta name="description" content="Apresentação institucional MyTS: tecnologia e consultoria para gestão contínua de fornecedores, processos e documentos."/><meta property="og:title" content="MyTS — Apresentação institucional"/><meta property="og:description" content="Sua cadeia de fornecedores, sem você cobrar ninguém."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/></Helmet>
    <style>{`html,body,#root{margin:0;padding:0;background:hsl(var(--primary))}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:1600px 900px landscape;margin:0}@media print{.no-print{display:none!important}.slide-frame{border-radius:0!important;break-after:page;page-break-after:always}}`}</style>
    {!print && <Button onClick={() => window.open(`${window.location.pathname}?print`, "_blank")} className="no-print fixed right-6 top-6 z-50 h-12 rounded-full bg-accent px-6 text-accent-foreground shadow-cta"><Download/>Baixar PDF</Button>}
    {[S01,S04,S05,S06,S07,S08,S09,S10,S11,S12,SMethod,S13,S14].map((Component,i)=><Component key={i}/>)}
  </main>;
};

export default ApresentacaoInstitucional;
