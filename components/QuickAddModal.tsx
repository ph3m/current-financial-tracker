"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { EXPENSE_CATS, INCOME_CATS } from "@/lib/data";
import type { Transaction, TxType } from "@/lib/types";

export default function QuickAddModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (tx: Omit<Transaction, "id">) => void;
}) {
  const [type, setType] = useState<TxType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATS[0].key);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  const cats = type === "income" ? INCOME_CATS : EXPENSE_CATS;
  const valid = parseFloat(amount) > 0;

  function switchType(t: TxType) {
    setType(t);
    setCategory(t === "income" ? INCOME_CATS[0].key : EXPENSE_CATS[0].key);
  }

  function save() {
    if (!valid) return;
    onSave({ type, amount: parseFloat(amount), category, date, note: note.trim() });
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end bg-abyss/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="modal-sheet max-h-[92%] overflow-y-auto rounded-t-3xl border-t border-edge/30 bg-surface p-5 pb-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-edge/40" />
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Add Transaction</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-ink hover:bg-abyss hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Type toggle */}
        <div className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-abyss p-1">
          <button
            onClick={() => switchType("expense")}
            className={`rounded-full py-2 text-sm font-medium transition ${
              type === "expense" ? "bg-expense text-abyss" : "text-ink"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => switchType("income")}
            className={`rounded-full py-2 text-sm font-medium transition ${
              type === "income" ? "bg-income text-abyss" : "text-ink"
            }`}
          >
            Income
          </button>
        </div>

        {/* Amount */}
        <div className="mb-6 flex items-end justify-center gap-2">
          <span className="pb-3 text-xl font-semibold text-ink">Tsh</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-48 bg-transparent text-center text-5xl font-bold text-white outline-none placeholder:text-edge"
          />
        </div>

        {/* Category grid */}
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink">Category</p>
        <div className="mb-5 grid grid-cols-4 gap-2">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition ${
                category === c.key ? "border-accent bg-accent/10" : "border-edge/30 bg-abyss/40"
              }`}
            >
              <c.Icon className={`h-4 w-4 ${category === c.key ? "text-accent" : "text-ink"}`} />
              <span className={`text-[10px] ${category === c.key ? "text-accent" : "text-ink"}`}>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Date + note */}
        <div className="mb-3 grid grid-cols-1 gap-3">
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink">Date</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-edge/30 bg-abyss/40 px-3 py-2.5 text-sm text-white outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink">Note (optional)</p>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Dinner with friends"
              className="w-full rounded-xl border border-edge/30 bg-abyss/40 px-3 py-2.5 text-sm text-white outline-none placeholder:text-ink/60 focus:border-accent/50"
            />
          </div>
        </div>

        <button
          onClick={save}
          disabled={!valid}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent2 py-4 text-sm font-semibold text-abyss transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Check className="h-4 w-4" /> Save Transaction
        </button>
      </div>
    </div>
  );
}
