import type { Config } from "tailwindcss";

// Deep Sea design tokens — derived directly from the project brief.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#050B14",   // deepest ocean background
        surface: "#111C36", // card / container surface
        edge: "#3A506B",    // hairline borders on surfaces
        accent: "#48CAE4",  // bioluminescent cyan — primary
        accent2: "#00B4D8", // deeper cyan — buttons / FAB
        income: "#52B788",  // seafoam green — positive
        expense: "#FF5A5F", // coral/anemone red — negative
        ink: "#94A3B8",     // muted driftwood secondary text
      },
      boxShadow: {
        glow: "0 0 40px 0 rgba(72, 202, 228, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
