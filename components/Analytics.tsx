"use client";

import { getCatMeta } from "@/lib/data";
import { fmt } from "@/lib/format";
import type { Totals } from "@/lib/types";

interface DayBar {
  iso: string;
  label: string;
  total: number;
}

export default function Analytics({ totals, last7 }: { totals: Totals; last7: DayBar[] }) {
  const entries = Object.entries(totals.catTotals).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const R = 64;
  const C = 2 * Math.PI * R;
  let cumulative = 0;
  const maxDay = Math.max(...last7.map((d) => d.total), 1);

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-white">Spending by Category</h2>

      <div className="rounded-3xl border border-edge/20 bg-surface/70 p-6">
        {total === 0 ? (
          <p className="py-10 text-center text-sm text-ink">No expenses logged this month yet.</p>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="relative h-44 w-44 shrink-0">
              <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
                <circle cx="80" cy="80" r={R} fill="none" stroke="currentColor" className="text-edge/30" strokeWidth="18" />
                {entries.map(([cat, val]) => {
                  const meta = getCatMeta("expense", cat);
                  const pct = (val / total) * 100;
                  const dash = (pct / 100) * C;
                  const offset = -((cumulative / 100) * C);
                  cumulative += pct;
                  return (
                    <circle
                      key={cat}
                      cx="80"
                      cy="80"
                      r={R}
                      fill="none"
                      stroke="currentColor"
                      className={meta.text}
                      strokeWidth="18"
                      strokeDasharray={`${dash} ${C - dash}`}
                      strokeDashoffset={offset}
                      strokeLinecap="butt"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[10px] uppercase tracking-wide text-ink">Spent</p>
                <p className="text-xl font-bold text-white">{fmt(total)}</p>
              </div>
            </div>

            <div className="w-full flex-1 space-y-2.5">
              {entries.map(([cat, val]) => {
                const meta = getCatMeta("expense", cat);
                const pct = Math.round((val / total) * 100);
                return (
                  <div key={cat} className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`} />
                    <span className="flex-1 truncate text-sm text-slate-300">{meta.label}</span>
                    <span className="text-sm font-medium text-white">{fmt(val)}</span>
                    <span className="w-10 shrink-0 text-right text-xs text-ink">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-edge/20 bg-surface/70 p-6">
        <h3 className="mb-4 text-sm font-semibold text-white">Last 7 Days</h3>
        <div className="flex h-32 items-end justify-between gap-2">
          {last7.map((d) => (
            <div key={d.iso} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-24 w-full items-end justify-center">
                <div
                  className="w-full max-w-[22px] rounded-t-md bg-accent/70 transition-all"
                  style={{ height: `${Math.max((d.total / maxDay) * 100, d.total > 0 ? 6 : 2)}%` }}
                />
              </div>
              <span className="text-[10px] text-ink">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
