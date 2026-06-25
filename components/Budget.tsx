"use client";

import { Pencil } from "lucide-react";
import { EXPENSE_CATS } from "@/lib/data";
import { fmt } from "@/lib/format";
import type { Budgets } from "@/lib/types";
import CategoryIcon from "./CategoryIcon";

export default function Budget({
  budgets,
  setBudgets,
  catTotals,
  editing,
  setEditing,
}: {
  budgets: Budgets;
  setBudgets: (updater: (b: Budgets) => Budgets) => void;
  catTotals: Record<string, number>;
  editing: string | null;
  setEditing: (key: string | null) => void;
}) {
  const rows = EXPENSE_CATS.filter((c) => budgets[c.key] != null).map((c) => {
    const spent = catTotals[c.key] || 0;
    const limit = budgets[c.key];
    const hasLimit = limit > 0;
    const pct = hasLimit ? Math.min((spent / limit) * 100, 100) : 0;
    const over = hasLimit && spent > limit;
    let bar = "bg-income";
    if (pct >= 100) bar = "bg-expense";
    else if (pct >= 75) bar = "bg-amber-400";
    return { ...c, spent, limit, hasLimit, pct, over, bar };
  });

  return (
    <div className="space-y-3">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Monthly Budgets</h2>
        <span className="text-xs text-ink">Tap a limit to edit</span>
      </div>
      {rows.map((r) => (
        <div key={r.key} className="rounded-2xl border border-edge/20 bg-surface/70 p-4">
          <div className="flex items-center gap-3">
            <CategoryIcon type="expense" category={r.key} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{r.label}</p>
                {editing === r.key ? (
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-ink">Tsh</span>
                    <input
                      autoFocus
                      type="number"
                      defaultValue={r.limit || ""}
                      placeholder="0"
                      onBlur={(e) => {
                        const v = parseFloat(e.target.value);
                        if (v > 0) setBudgets((b) => ({ ...b, [r.key]: v }));
                        setEditing(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                      className="w-20 rounded-md border border-accent/40 bg-abyss px-1.5 py-0.5 text-xs text-white outline-none"
                    />
                  </div>
                ) : r.hasLimit ? (
                  <button
                    onClick={() => setEditing(r.key)}
                    className="flex items-center gap-1 text-xs text-ink hover:text-accent"
                  >
                    {fmt(r.spent)} / {fmt(r.limit)} <Pencil className="h-3 w-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(r.key)}
                    className="flex items-center gap-1 text-xs text-accent/80 hover:text-accent"
                  >
                    Set a limit <Pencil className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-abyss">
                <div
                  className={`h-full rounded-full transition-all ${r.hasLimit ? r.bar : "bg-edge/40"}`}
                  style={{ width: r.hasLimit ? `${r.pct}%` : "0%" }}
                />
              </div>
              <p className={`mt-1 text-[11px] ${r.over ? "text-expense" : "text-ink"}`}>
                {!r.hasLimit
                  ? r.spent > 0
                    ? `${fmt(r.spent)} spent so far \u00b7 no limit set`
                    : "No limit set yet"
                  : r.over
                  ? `Over by ${fmt(r.spent - r.limit)}`
                  : `${fmt(r.limit - r.spent)} left`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
