import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#111827", brand: { 400: "#8b7cff", 500: "#6c5ce7", 600: "#5849d6" } }, boxShadow: { card: "0 1px 3px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)" } } }, plugins: [] } satisfies Config;
