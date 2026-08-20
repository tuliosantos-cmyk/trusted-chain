import korin from "@/assets/logos/korin.png.asset.json";
import aval from "@/assets/logos/aval.png.asset.json";
import cvale from "@/assets/logos/cvale.webp.asset.json";
import carrefour from "@/assets/logos/carrefour.png.asset.json";

/** Logos de clientes disponíveis para uso nos vídeos. */
export const CLIENT_LOGOS = {
  korin: korin.url,
  aval: aval.url,
  cvale: cvale.url,
  carrefour: carrefour.url,
} as const;

export type ClientLogoId = keyof typeof CLIENT_LOGOS;

export const ALL_LOGO_URLS = Object.values(CLIENT_LOGOS);
