

## Plan: Hero text update + functional sorting/filters

### 1. Hero block text (lines 631-635)

Split the subtitle into two lines:
- Line 1: "Каталог киберспортивных площадок Крыма."
- Line 2: "Оборудование, рейтинги — всё в одном месте."

### 2. Functional sorting system

Replace the current static list with a sortable list. Add a `sortBy` state variable with options:

- **По рейтингу** (default) -- sort by `rating` desc, then `reviews` desc
- **По оценкам** -- sort by `reviews` desc (more reviews = higher)
- **По видеокарте** -- sort by GPU tier (assign numeric rank to each GPU model: RTX 5080 > 5070 Ti > 5070 > 4090 > 4070 Ti > 4070 Super > 4060 Ti > 4060 > 3060 Ti > 3060 > 2060 Super, etc.) using best hall GPU
- **По цене ↓** -- sort by cheapest `priceDay` among PC halls (standard tier), ascending (cheapest first)

### Technical approach

**GPU ranking function**: Create a helper `getGpuRank(gpu: string): number` that maps GPU names to numeric tiers. Use the best (highest-ranked) GPU from each club's halls for comparison.

**Min standard price**: `getMinPrice(halls)` returns the lowest `priceDay` among PC halls (halls with `gpu` defined).

**UI**: Add sort buttons in the filters row, styled consistently with the existing city filter buttons. Use a row of small buttons below the city filter or inline with it, labeled with sort criteria.

**Flow**:
1. Filter by city and open status (existing)
2. Sort filtered results by selected criterion
3. Render sorted list

### Files modified
- `src/pages/Infrastructure.tsx` -- hero text edit, add sort state + logic + UI buttons

