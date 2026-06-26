"use client";

import { useEffect, useMemo, useState } from "react";
import { Waves } from "lucide-react";
import { BASE_BALANCE, BUBBLES, DEFAULT_BUDGETS } from "@/lib/data";
import { currentYearMonth, greetingFor } from "@/lib/format";
import type { Budgets, Transaction, Totals } from "@/lib/types";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Budget from "./Budget";
import BottomNav from "./BottomNav";
import QuickAddModal from "./QuickAddModal";
import ResetConfirmModal from "./ResetConfirmModal";

export type Tab = "dashboard" | "analytics" | "budget";

const TX_KEY = "current.transactions";
const BUDGET_KEY = "current.budgets";

export default function FinanceApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  // Starts empty — no demo data. Real saved data (if any) is loaded from
  // localStorage right after mount, below.
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budgets>(DEFAULT_BUDGETS);
  const [hydrated, setHydrated] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showAllTx, setShowAllTx] = useState(false);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load any previously saved data once, on mount (client-only — localStorage isn't available during SSR).
  useEffect(() => {
    try {
      const savedTx = localStorage.getItem(TX_KEY);
      if (savedTx) setTransactions(JSON.parse(savedTx));
      const savedBudgets = localStorage.getItem(BUDGET_KEY);
      if (savedBudgets) setBudgets(JSON.parse(savedBudgets));
    } catch {
      // Corrupt or unavailable storage — fall back to the seed data already in state.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on every change, once hydration has happened (avoids overwriting saved
  // data with the seed during the very first render).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(TX_KEY, JSON.stringify(transactions));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — fail silently.
    }
  }, [transactions, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
    } catch {
      // Storage full or unavailable — fail silently.
    }
  }, [budgets, hydrated]);


  const ym = currentYearMonth();
  const isThisMonth = (t: Transaction) => t.date.startsWith(ym);

  const totals: Totals = useMemo(() => {
    let allIncome = 0;
    let allExpense = 0;
    let monthIncome = 0;
    let monthExpense = 0;
    const catTotals: Record<string, number> = {};

    transactions.forEach((t) => {
      const v = t.amount;
      if (t.type === "income") allIncome += v;
      else allExpense += v;

      if (isThisMonth(t)) {
        if (t.type === "income") {
          monthIncome += v;
        } else {
          monthExpense += v;
          catTotals[t.category] = (catTotals[t.category] || 0) + v;
        }
      }
    });

    return {
      balance: BASE_BALANCE + allIncome - allExpense,
      monthIncome,
      monthExpense,
      catTotals,
    };
  }, [transactions, ym]);

  const sortedTx = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id),
    [transactions]
  );

  const last7 = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const dayTotal = transactions
        .filter((t) => t.type === "expense" && t.date === iso)
        .reduce((s, t) => s + t.amount, 0);
      days.push({ iso, label: d.toLocaleDateString("en-US", { weekday: "short" })[0], total: dayTotal });
    }
    return days;
  }, [transactions]);

  function handleSave(tx: Omit<Transaction, "id">) {
    setTransactions((prev) => [{ id: Date.now(), ...tx }, ...prev]);
    setShowQuickAdd(false);
  }

  function handleResetAll() {
    setTransactions([]);
    setBudgets(DEFAULT_BUDGETS);
    setShowAllTx(false);
    setEditingBudget(null);
    setActiveTab("dashboard");
    setShowResetConfirm(false);
    try {
      localStorage.removeItem(TX_KEY);
      localStorage.removeItem(BUDGET_KEY);
    } catch {
      // Storage unavailable — in-memory state is already reset, which is what matters.
    }
  }

  const today = new Date();

  return (
    <div className="flex h-screen justify-center bg-abyss" style={{ height: "100dvh" }}>
      <div className="relative flex h-full w-full max-w-md flex-col overflow-hidden border-x border-edge/20 bg-abyss shadow-2xl">
        {/* Ambient bubbles — signature deep-sea motion */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="bubble absolute bottom-0 rounded-full bg-accent/40"
              style={{ left: b.left, width: b.size, height: b.size, animationDelay: b.delay, animationDuration: b.dur }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-5 pb-2 pt-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink">{greetingFor()}</p>
            <h1 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Waves className="h-5 w-5 text-accent" /> Current
            </h1>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-edge/30 bg-surface/70 text-xs font-semibold text-ink">
            {today.toLocaleDateString("en-US", { day: "2-digit" })}
          </div>
        </header>

        {/* Main content */}
        <main className="relative z-10 flex-1 overflow-y-auto px-5 pb-28 pt-2">
          {activeTab === "dashboard" && (
            <Dashboard
              totals={totals}
              sortedTx={sortedTx}
              isThisMonth={isThisMonth}
              showAllTx={showAllTx}
              setShowAllTx={setShowAllTx}
            />
          )}
          {activeTab === "analytics" && <Analytics totals={totals} last7={last7} />}
          {activeTab === "budget" && (
            <Budget
              budgets={budgets}
              setBudgets={setBudgets}
              catTotals={totals.catTotals}
              editing={editingBudget}
              setEditing={setEditingBudget}
            />
          )}
        </main>

        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAdd={() => setShowQuickAdd(true)}
          onReset={() => setShowResetConfirm(true)}
        />

        {showQuickAdd && <QuickAddModal onClose={() => setShowQuickAdd(false)} onSave={handleSave} />}
        {showResetConfirm && (
          <ResetConfirmModal onClose={() => setShowResetConfirm(false)} onConfirm={handleResetAll} />
        )}
      </div>
    </div>
  );
}
