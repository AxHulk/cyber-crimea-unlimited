

## Plan: Replace header/footer logo with the new uploaded file

1. Copy `user-uploads://Лого_ФКС_ПНГ-3.png` to `public/logo-fks-v3.png`
2. Delete old `public/logo-fks-v2.png`
3. Update `src/components/HudNavbar.tsx` — change img src to `/logo-fks-v3.png`
4. Update `src/components/Footer.tsx` — change img src to `/logo-fks-v3.png`

