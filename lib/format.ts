export const fmt = (n: number) => "Tsh " + Math.round(Math.abs(n)).toLocaleString("en-US");

export const fmtSigned = (n: number, type: "income" | "expense") =>
  `${type === "income" ? "+" : "\u2212"}${fmt(n)}`;

export const fmtDateShort = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

export function greetingFor(): string {
  const h = new Date().getHours();
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function currentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
