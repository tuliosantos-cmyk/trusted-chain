# Architecture decisions

- Keep commercial presentation metrics in a shared data module with concrete-value tests so commercial figures remain consistent and verifiable.
- Keep the commercial customer roster and dated press references in a dedicated evidence module; distinguish verified customers from pilots, proposals and partners to avoid misleading social proof.
- Render decorative MyTS marks as inline SVG from the trusted local asset, not URL masks, to preserve the silhouette in preview and print.
- Keep the Ralston pilot deck at `/apresentacao-implantacao-ralston` with a fixed 1600×900 print canvas and separately tested client figures so the dated report remains independently shareable.

- Keep the English institutional deck at `/apresentacao-institucional` and the Portuguese duplicate at `/apresentacao-institucional-pt` so both language versions remain independently shareable.
- Keep the MDS implementation deck at `/apresentacao-implantacao-mds` as an independent 1600×900 presentation with print-ready slides.

- Keep the Zelopack implementation deck at `/apresentacao-implantacao-zelopack` as an independent 1600×900 presentation with print-ready slides.
- Keep the SDR training deck at `/treinamento-sdr` as an independent 1600×900 presentation with print-ready slides.
- Define SDR onboarding content separately from its visual layouts so grouped demonstration guides and full training slides share the same navigation and print frame.
- Use dedicated SDR visual layouts for channel guides, cadence grids, spoken scripts, detailed call steps, objection responses and client references to keep dense training content inside the fixed print canvas; split detailed explanations across slides rather than omitting content.
