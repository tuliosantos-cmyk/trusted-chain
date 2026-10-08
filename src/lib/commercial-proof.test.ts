import { describe, expect, it } from "vitest";
import { commercialClients } from "./commercial-proof";

describe("MyTS featured clients", () => {
  const featured = commercialClients.slice(0, 6).map((c) => c.name);

  it("features Takasago instead of Atakarejo in the six logos shown", () => {
    expect(featured).toContain("Takasago");
    expect(featured).not.toContain("Atakarejo");
  });

  it("keeps Atakarejo in the full customer roster", () => {
    expect(commercialClients.map((c) => c.name)).toContain("Atakarejo");
  });

  it("shows exactly six logos with a resolvable image source each", () => {
    expect(featured).toHaveLength(6);
    expect(commercialClients.slice(0, 6).every((c) => c.src.length > 0)).toBe(true);
  });
});
