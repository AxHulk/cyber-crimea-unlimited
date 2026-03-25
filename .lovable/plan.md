

## Plan: Redesign Infrastructure page with real club "Дофамин"

### Changes to `src/pages/Infrastructure.tsx`

**1. Remove booking button** — Delete the "ЗАБРОНИРОВАТЬ МЕСТО" button from the detail panel. Instead, add external links (Яндекс, Бронь, ВК) for each club.

**2. Fix "Периферия" icon** — The third equipment row currently uses `iconHardware` with label "ПЕРИФЕРИЯ". Change it to use `iconHardware` (CPU icon) with label "ПРОЦЕССОР" and display the CPU value from club data.

**3. Remove "Загрузка зала" block** — Replace the seat availability grid with a **"ЗАЛЫ" (Halls/Rooms)** block that lists each room with its specs (GPU, CPU, monitor, pricing by time slot). This is more useful and matches the real data structure.

**4. Remove seat indicators from club list cards** — Remove the free/occupied/reserved seat row from the left-panel club cards.

**5. Replace test clubs with real data** — Remove the 5 fake clubs. Add "Дофамин" as the first (and only real) club:

- **Name**: Дофамин
- **City**: Симферополь
- **Address**: Эстонская улица, 2, этаж 3
- **Rating**: 5.0 (349 оценок) — source: Яндекс
- **Zones**: bootcamp, vip, bar, console (Приставки)
- **Links**: Яндекс profile, Taplink (бронь), VK
- **Halls**:
  - Prime — 149/169 ₽/ч, GeForce 5060, AMD Ryzen 5 8400F, 240Hz
  - Squad — 189/219 ₽/ч, GeForce 5070, AMD Ryzen 5 7500F, 280Hz
  - Bootcamp — 239/269 ₽/ч, GeForce 4070 TI, i5-13600KF, 270Hz
  - PS5 Zone — 449/499 ₽/ч (console zone, no PC specs)

**6. Restructure club data model** — Add `halls` array (name, gpu, cpu, monitor, price day/night), `links` object (yandex, booking, vk), remove `seats`, `prices`, and single `gpu`/`monitors` fields.

**7. Detail panel redesign:**
- **Club header** — keep as-is but add external link buttons (Яндекс, Бронь, ВК)
- **Equipment block** — show the best/flagship specs from halls
- **Zones block** — keep as-is
- **NEW: Halls block** (replaces seat grid) — table/cards showing each hall with name, GPU, CPU, monitor, day/night pricing
- **Pricing block** — remove (prices now shown per-hall)
- **Ratings block** — keep as-is

### Files modified
- `src/pages/Infrastructure.tsx` — full rework of data and detail panel

