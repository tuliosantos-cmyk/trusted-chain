import { VideoDef } from "./engine";
import { homologacaoVideos } from "./videos/homologacao";
import { institucionalVideos } from "./videos/institucional";
import { normasVideos } from "./videos/normas";

export const CAMPAIGNS = [
  {
    id: "homologacao" as const,
    label: "Homologação de Fornecedores",
    videos: homologacaoVideos,
  },
  { id: "normas" as const, label: "Normas e Certificação", videos: normasVideos },
  {
    id: "institucional" as const,
    label: "Institucional",
    videos: institucionalVideos,
  },
];

export const ALL_VIDEOS: VideoDef[] = CAMPAIGNS.flatMap((c) => c.videos);

export type FormatId = "9:16" | "16:9";

export const FORMATS: Record<FormatId, { w: number; h: number; label: string }> = {
  "9:16": { w: 1080, h: 1920, label: "Vertical 1080×1920" },
  "16:9": { w: 1920, h: 1080, label: "Horizontal 1920×1080" },
};
