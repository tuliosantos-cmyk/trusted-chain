import { expect, it } from "vitest";
import { ralstonPilot as p, ralstonSuppliers } from "./ralston-pilot";
it("counts 132 requirements after excluding the 15 duplicated rows", () => {
  expect(p.requirements).toBe(132);
  expect(p.accepted + p.rejected + p.awaitingApproval + p.pending).toBe(132);
  expect(ralstonSuppliers.reduce((n, s) => n + s.total, 0)).toBe(132);
});
it("records eight suppliers and 44 accepted requirements", () => {
  expect(ralstonSuppliers.length).toBe(8);
  expect(ralstonSuppliers.reduce((n, s) => n + s.accepted, 0)).toBe(44);
});
it("preserves the pilot dates and five percent monthly discount", () => {
  expect(p.start).toBe("10/09/2026"); expect(p.end).toBe("10/10/2026"); expect(p.discount).toBe(5);
});
it("keeps raw assessment submissions separate from completed responses", () => {
  expect(p.assessmentSubmissions).toBe(8); expect(p.assessmentResponses).toBe(1); expect(p.assessmentApproved).toBe(0);
});