"use client";

import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { fmt } from "@/lib/format";
import type { Totals, Transaction } from "@/lib/types";
import TransactionRow from "./TransactionRow";

export default function Dashboard({
  totals,
  sortedTx,
  isThisMonth,
  showAllTx,
  setShowAllTx,
}: {
  totals: Totals;
  sortedTx: Transaction[];
  isThisMonth: (t: Transaction) => boolean;
  showAllTx: boolean;
  setShowAllTx: (v: boolean) => void;
}) {
  const visible = showAllTx ? sortedTx : sortedTx.slice(0, 5);
  const incomeCount = sortedTx.filter((t) => t.type === "income" && isThisMonth(t)).length;
  const expenseCount = sortedTx.filter((t) => t.type === "expense" && isThisMonth(t)).length;
  const savingsRate =
    totals.monthIncome > 0 ? Math.round(((totals.monthIncome - totals.monthExpense) / totals.monthIncome) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Balance card with bioluminescent glow */}
      <div className="relative pt-2">
        <div className="glow-pulse pointer-events-none absolute left-1/2 top-1/2 h-40 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative rounded-3xl border border-edge/20 bg-surface/70 p-6 shadow-2xl shadow-accent/10 backdrop-blur-md">
          <p className="text-xs font-medium uppercase tracking-wide text-ink">Total Balance</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white">{fmt(totals.balance)}</p>
          <div className="mt-4 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-income">
              <ArrowUpRight className="h-3.5 w-3.5" /> {fmt(totals.monthIncome)} in
            </span>
            <span className="flex items-center gap-1 text-expense">
              <ArrowDownRight className="h-3.5 w-3.5" /> {fmt(totals.monthExpense)} out
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling mini cards */}
      <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
        <div className="min-w-[160px] snap-start rounded-2xl border border-edge/20 bg-surface/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-income/15">
            <ArrowUpRight className="h-4 w-4 text-income" />
          </div>
          <p className="mt-3 text-xs text-ink">This Month&apos;s Income</p>
          <p className="mt-1 text-lg font-semibold text-white">{fmt(totals.monthIncome)}</p>
          <p className="mt-0.5 text-[11px] text-income/80">{incomeCount} entries</p>
        </div>
        <div className="min-w-[160px] snap-start rounded-2xl border border-edge/20 bg-surface/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-expense/15">
            <ArrowDownRight className="h-4 w-4 text-expense" />
          </div>
          <p className="mt-3 text-xs text-ink">This Month&apos;s Expenses</p>
          <p className="mt-1 text-lg font-semibold text-white">{fmt(totals.monthExpense)}</p>
          <p className="mt-0.5 text-[11px] text-expense/80">{expenseCount} entries</p>
        </div>
        <div className="min-w-[160px] snap-start rounded-2xl border border-edge/20 bg-surface/70 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
          <p className="mt-3 text-xs text-ink">Savings Rate</p>
          <p className="mt-1 text-lg font-semibold text-white">{savingsRate}%</p>
          <p className="mt-0.5 text-[11px] text-accent/80">of income kept</p>
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
          {sortedTx.length > 5 && (
            <button onClick={() => setShowAllTx(!showAllTx)} className="text-xs font-medium text-accent">
              {showAllTx ? "Show less" : "See all"}
            </button>
          )}
        </div>
        <div className="space-y-2">
          {visible.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
          {visible.length === 0 && (
            <p className="py-8 text-center text-sm text-ink">No transactions yet. Tap + to add one.</p>
          )}
        </div>
      </div>
    </div>
  );
}
