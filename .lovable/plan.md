

## Diagnosis

The preview iframe sandbox blocks navigation to external domains (including the storage URL `qjebwrrpdfvedmmoksjc.supabase.co`). This is a **preview-only limitation** — on the published site (cyber-crimea-unlimited.lovable.app) the links will work correctly.

## Plan: Fix document links to work in preview

Move the PDF files back to `public/docs/` (same origin as the app) so they open without cross-domain restrictions, even in the preview iframe.

1. **Keep the 7 PDFs in `public/docs/`** (they're already there from earlier)
2. **Update `src/pages/About.tsx`** — change `STORAGE_BASE` and all `href` values back to relative paths like `/docs/ustav_fks_2026.pdf`
3. Documents will open from the same domain, avoiding the sandbox block in both preview and published versions

