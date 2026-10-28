import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, Download, FileInput, FileText, Grid2X2, Maximize, Minimize, Presentation, Printer, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import logo from '@/assets/myts-logo.svg';
import { launchSlides } from '@/components/launch/content';
import LaunchVisual, { darkLaunchSlides, visualTitles } from '@/components/launch/Visuals';
import { clampLaunchSlide, launchPhases, parseWorkshopDecisions, type WorkshopDecisions } from '@/lib/launch-workshop';
import '@/components/launch/presentation.css';

const TOTAL = launchSlides.length;
function SlideFrame({ id, children, print = false }: { id: number; children: ReactNode; print?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current; if (!el || print) return;
    const update = () => setScale(Math.min(el.clientWidth / 1600, el.clientHeight / 900));
    update(); const observer = new ResizeObserver(update); observer.observe(el);
    return () => observer.disconnect();
  }, [print]);
  const dark = darkLaunchSlides.has(id);
  const phase = [...launchPhases].reverse().find(p => id >= p.start);
  const label = id < 8 ? 'Leitura do lançamento' : id > 33 ? 'Fechamento' : `Fase ${phase?.number ?? 0} · ${phase?.title ?? ''}`;
  return <section ref={ref} className="launch-frame" data-slide={id} aria-label={`Slide ${id}: ${visualTitles[id]}`}><div className={`launch-canvas ${dark ? 'is-dark' : ''}`} style={{ transform: `scale(${print ? 1 : scale})` }}>
    <header className="launch-chrome"><p className="launch-kicker">{label}</p><div className="launch-phase-dots" aria-label={phase ? `Fase ${phase.number + 1} de 6` : 'Introdução'}>{launchPhases.map(p => <span key={p.number} className={id <= 33 && id >= 8 && phase?.number === p.number ? 'active' : ''}/>)}</div></header>
    <div className="launch-body">{id !== 1 && <h2 className="launch-title">{visualTitles[id]}</h2>}<div className="launch-visual">{children}</div></div>
    <footer className="launch-footer"><span className="flex items-center gap-5"><img src={logo} alt="MyTS" className={dark ? '' : 'on-light'}/> Lançamento MyTS 2.0 · Da novidade à adoção</span><span>{String(id).padStart(2, '0')} / {TOTAL}</span></footer>
  </div></section>;
}

export default function LancamentoMyts2() {
  const [params, setParams] = useSearchParams();
  const print = params.has('print');
  const current = clampLaunchSlide(params.get('slide'), TOTAL);
  const [notes, setNotes] = useState(false);
  const [grid, setGrid] = useState(false);
  const [sources, setSources] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [decisions, setDecisions] = useState<WorkshopDecisions>({});
  const importRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const goTo = useCallback((id: number) => {
    const next = new URLSearchParams(params); next.set('slide', String(clampLaunchSlide(String(id), TOTAL)));
    setParams(next, { replace: true }); setGrid(false);
  }, [params, setParams]);
  const change = useCallback((key: string, row: number, field: string, value: string) => {
    setDecisions(previous => {
      const rows = [...(previous[key] ?? [])];
      while (rows.length <= row) rows.push({});
      rows[row] = { ...rows[row], [field]: value };
      return { ...previous, [key]: rows };
    });
  }, []);
  useEffect(() => {
    const event = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', event);
    return () => document.removeEventListener('fullscreenchange', event);
  }, []);
  useEffect(() => {
    if (print) return;
    const handle = (event: KeyboardEvent) => {
      if (sources || event.target instanceof HTMLElement && (event.target.closest('input,textarea,select,[contenteditable=true]') || event.target.closest('[role=dialog]'))) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key) && !grid) { event.preventDefault(); goTo(current + 1); }
      if (['ArrowLeft', 'PageUp'].includes(event.key) && !grid) { event.preventDefault(); goTo(current - 1); }
      if (event.key === 'Home') goTo(1);
      if (event.key === 'End') goTo(TOTAL);
      if (event.key === 'Escape') { setGrid(false); setNotes(false); }
    };
    window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle);
  }, [current, goTo, grid, print, sources]);
  useEffect(() => {
    const dirty = Object.keys(decisions).length > 0;
    if (!dirty) return;
    const protect = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', protect);
    return () => window.removeEventListener('beforeunload', protect);
  }, [decisions]);
  const exportDecisions = () => {
    const blob = new Blob([JSON.stringify({ version: 1, title: 'Lançamento MyTS 2.0', decisions }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'MyTS_2.0_Quadro_de_Definicoes.json'; a.click(); URL.revokeObjectURL(url);
    toast.success('Quadro baixado. Ele pode ser reaberto nesta apresentação.');
  };
  const openPrint = () => {
    const win = window.open('', '_blank');
    if (!win) { toast.error('Permita abrir uma nova janela para imprimir.'); return; }
    const url = new URL(location.href); url.search = '?print';
    if (Object.keys(decisions).length > 0) url.hash = encodeURIComponent(JSON.stringify(decisions));
    win.opener = null; win.location.href = url.href;
  };
  useEffect(() => {
    if (!print || !location.hash) return;
    const parsed = parseWorkshopDecisions(decodeURIComponent(location.hash.slice(1)));
    if (parsed) setDecisions(parsed);
    history.replaceState(null, '', `${location.pathname}${location.search}`);
  }, [print]);
  const active = launchSlides[current - 1];
  const renderSlide = (id: number, preview = false) => <SlideFrame id={id} print={print}><LaunchVisual id={id} decisions={decisions} onChange={change} print={print} preview={preview}/></SlideFrame>;
  return <main ref={rootRef} className={`launch-deck ${print ? 'launch-print' : ''}`}>
    <Helmet><title>{print ? 'Lançamento MyTS 2.0 — Impressão' : `${current}/${TOTAL} — ${visualTitles[current]} | MyTS 2.0`}</title><meta name="description" content="Lançamento MyTS 2.0: da novidade à adoção. Sessão de trabalho com fundamentos, casos, planejamento e seis definições."/><meta property="og:title" content="Lançamento MyTS 2.0 — Da novidade à adoção"/><meta property="og:description" content="Uma sessão de trabalho visual para preparar, anunciar e fazer a MyTS 2.0 virar uso e receita."/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"/></Helmet>
    {!print && <header className="launch-toolbar launch-no-print"><div className="flex items-center gap-4"><img className="launch-toolbar-logo" src={logo} alt="MyTS"/><span className="launch-toolbar-title">2.0 · Da novidade à adoção</span></div><div className="launch-toolbar-actions"><Button variant="ghost" size="icon" title="Visão geral" aria-label="Visão geral" aria-pressed={grid} onClick={() => setGrid(g => !g)}><Grid2X2/></Button><Button variant="ghost" size="icon" title="Notas de fala" aria-label="Notas de fala" aria-pressed={notes} onClick={() => setNotes(n => !n)}><FileText/></Button><Button variant="ghost" size="icon" title="Roteiro e fontes" aria-label="Roteiro e fontes" onClick={() => setSources(true)}><BookOpen/></Button><Button variant="ghost" size="icon" title="Baixar definições" aria-label="Baixar definições" onClick={exportDecisions}><Download/></Button><Button variant="ghost" size="icon" title="Abrir definições" aria-label="Abrir definições" onClick={() => importRef.current?.click()}><FileInput/></Button><Button variant="ghost" size="icon" title="Tela cheia" aria-label="Tela cheia" onClick={() => { if (document.fullscreenElement) void document.exitFullscreen(); else void rootRef.current?.requestFullscreen().catch(() => toast.error('Tela cheia não disponível neste navegador.')); }}>{fullscreen ? <Minimize/> : <Maximize/>}</Button><Button variant="outline" size="icon" title="Imprimir ou salvar PDF" aria-label="Imprimir ou salvar PDF" onClick={openPrint}><Printer/></Button></div></header>}
    <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={async event => {
      const file = event.target.files?.[0]; if (!file) return;
      if (file.size > 500000) { toast.error('Arquivo grande demais para um quadro de definições.'); return; }
      const parsed = parseWorkshopDecisions(await file.text());
      if (!parsed) toast.error('Este arquivo não contém um quadro válido.');
      else { setDecisions(parsed); toast.success('Definições reabertas.'); }
      event.target.value = '';
    }}/>
    {print ? launchSlides.map(s => <div key={s.id}>{renderSlide(s.id)}</div>) : grid ? <div className="launch-grid">{launchSlides.map(s => <div className="launch-grid-item" key={s.id}><div className="relative">{renderSlide(s.id, true)}<Button variant="ghost" className="launch-grid-hit" aria-label={`Abrir slide ${s.id}`} onClick={() => goTo(s.id)}/></div><Button variant="ghost" className="launch-grid-open" onClick={() => goTo(s.id)}>{String(s.id).padStart(2, '0')} · {visualTitles[s.id]}</Button></div>)}</div> : <div className="launch-stage" onTouchStart={event => { const t = event.touches[0]; if (t) touchStart.current = { x: t.clientX, y: t.clientY }; }} onTouchEnd={event => {
      const start = touchStart.current; const end = event.changedTouches[0]; touchStart.current = null;
      if (!start || !end || event.target instanceof HTMLElement && event.target.closest('input,button,textarea')) return;
      const dx = end.clientX - start.x; const dy = end.clientY - start.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
    }}><div key={current} className="launch-enter w-full flex justify-center">{renderSlide(current)}</div></div>}
    {!print && !grid && <><div className="launch-progress"><div className="launch-progress-fill" style={{ width: `${current / TOTAL * 100}%` }}/></div><nav className="launch-navigation launch-no-print" aria-label="Navegação dos slides"><Button variant="ghost" size="icon" aria-label="Slide anterior" disabled={current === 1} onClick={() => goTo(current - 1)}><ChevronLeft/></Button><span>{String(current).padStart(2, '0')} / {TOTAL}</span><Button variant="ghost" size="icon" aria-label="Próximo slide" disabled={current === TOTAL} onClick={() => goTo(current + 1)}><ChevronRight/></Button></nav></>}
    {!print && notes && active && <aside className="launch-notes launch-no-print"><h3>Fala · {current} / {TOTAL}</h3><p>{active.speech || 'Revisar o quadro com o grupo e registrar responsáveis e prazos.'}</p>{active.examples.map(e => <p key={e}>{e}</p>)}{active.sources.map(s => <a className="text-accent underline mr-5" target="_blank" rel="noopener noreferrer" key={s.url} href={s.url}>{s.label}</a>)}</aside>}
    {print && <div className="launch-print-controls launch-no-print"><Button onClick={() => window.print()}><Printer/>Salvar PDF</Button></div>}
    <Dialog open={sources} onOpenChange={setSources}><DialogContent className="max-w-4xl"><DialogHeader><DialogTitle>Roteiro e fontes · Lançamento MyTS 2.0</DialogTitle></DialogHeader><ScrollArea className="h-[65vh] pr-5"><div className="launch-notes border-0 p-0"><p>As mudanças da 2.0, a data do lançamento, responsáveis e metas serão definidos na sessão. Os casos de outras empresas não são resultados ou previsões da MyTS.</p>{launchSlides.map(s => <details key={s.id} className="border-b border-border py-4"><summary className="font-semibold cursor-pointer">{String(s.id).padStart(2, '0')} · {s.title}</summary><pre>{s.original}</pre>{s.sources.map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-accent underline block mb-2">{link.label}</a>)}</details>)}<h3 className="mt-5">Cuidados de leitura</h3><p>Gartner: 17% do tempo ao considerar uma compra. Regra 95–5: aproximação do ciclo da categoria. Pendo: estudo de 2019, não diagnóstico da MyTS. Datadog: retenção líquida da base, não expansão de cada cliente. Highspot: o aumento de 6% não especifica pontos percentuais ou variação relativa.</p></div></ScrollArea></DialogContent></Dialog>
  </main>;
}