import { describe, expect, it } from "vitest";
import { commercialMetrics } from "./commercial-metrics";

describe("MyTS commercial figures", () => {
  it("uses more than 2500 active companies", () => {
    expect(commercialMetrics.find(x => x.label === "empresas ativas")?.minimum).toBe(2500);
  });
  it("uses more than 700000 documents", () => {
    expect(commercialMetrics.find(x => x.label === "documentos")?.minimum).toBe(700000);
  });
  it("uses more than 5000 processes", () => {
    expect(commercialMetrics.find(x => x.label === "processos")?.minimum).toBe(5000);
  });
});