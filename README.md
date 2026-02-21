# 💍 3D Ring Viewer

A real-time interactive 3D ring configurator for jewelry e-commerce. Built with Next.js, Three.js and TypeScript — customers can rotate, zoom and customise ring band and diamond colours before buying.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| 3D Rendering | Three.js + WebGL |
| Styling | Plain CSS (inline `<style>`) |
| Fonts | Cormorant Garamond, DM Mono |

---

## Project Structure

```
app/
├── page.tsx                  # Main viewer page
├── components/
│   ├── RingModel.tsx         # Three.js canvas + 3D ring mesh
│   └── ColorSelector.tsx     # Colour picker UI component
└── lib/
    └── colors.ts             # Band & diamond colour definitions
```

---

## Getting Started

**1. Clone and install**

```bash
git clone https://github.com/var-raphael/ring-viewer
cd ring-viewer
npm install
```

**2. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**3. Build for production**

```bash
npm run build
npm start
```

---

## Features

- **360° rotation** — drag to spin the ring on any axis
- **Scroll to zoom** — pinch or scroll wheel to inspect details
- **Live colour swapping** — band and diamond colours update in real-time without remounting the canvas
- **Multiple finishes** — Gold, Silver, Rose Gold, Platinum and more
- **Diamond colours** — Clear, Pink, Blue, Yellow, Black
- **Luxury UI** — dark editorial aesthetic with film grain, ambient lighting and gold shimmer typography
- **Fully responsive** — works on mobile and desktop

---

## Customising Colours

Edit `app/lib/colors.ts` to add or change available colours:

```ts
export const bandColors = [
  { name: 'Gold',      hex: 0xFFD700 },
  { name: 'Silver',    hex: 0xC0C0C0 },
  { name: 'Rose Gold', hex: 0xB76E79 },
  // add more here
];

export const diamondColors = [
  { name: 'Clear',  hex: 0xFFFFFF },
  { name: 'Pink',   hex: 0xFFB6C1 },
  // add more here
];
```

---

## Embedding in a Store

The `RingModel` component accepts two props:

```tsx
<RingModel
  bandColor={0xFFD700}    // hex number
  diamondColor={0xFFFFFF} // hex number
/>
```

Drop it into any product page and pass the colours from your product data.

---

## License

MIT — free to use in commercial projects.

---

Built by [Raphael Samuel](https://github.com/var-raphael)
