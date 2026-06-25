import {
  Utensils,
  Car,
  Film,
  ShoppingBag,
  Receipt,
  HeartPulse,
  MoreHorizontal,
  Landmark,
  Briefcase,
  TrendingUp,
  Gift,
} from "lucide-react";
import type { CategoryMeta, TxType, Budgets } from "./types";

export const EXPENSE_CATS: CategoryMeta[] = [
  { key: "Food", label: "Food", Icon: Utensils, text: "text-amber-300", bg: "bg-amber-400/15", dot: "bg-amber-400" },
  { key: "Transport", label: "Transport", Icon: Car, text: "text-sky-300", bg: "bg-sky-400/15", dot: "bg-sky-400" },
  { key: "Entertainment", label: "Fun", Icon: Film, text: "text-fuchsia-300", bg: "bg-fuchsia-400/15", dot: "bg-fuchsia-400" },
  { key: "Shopping", label: "Shopping", Icon: ShoppingBag, text: "text-violet-300", bg: "bg-violet-400/15", dot: "bg-violet-400" },
  { key: "Bills", label: "Bills", Icon: Receipt, text: "text-orange-300", bg: "bg-orange-400/15", dot: "bg-orange-400" },
  { key: "Health", label: "Health", Icon: HeartPulse, text: "text-rose-300", bg: "bg-rose-400/15", dot: "bg-rose-400" },
  { key: "Other", label: "Other", Icon: MoreHorizontal, text: "text-slate-300", bg: "bg-slate-400/15", dot: "bg-slate-400" },
];

export const INCOME_CATS: CategoryMeta[] = [
  { key: "Salary", label: "Salary", Icon: Landmark, text: "text-emerald-300", bg: "bg-emerald-400/15", dot: "bg-emerald-400" },
  { key: "Freelance", label: "Freelance", Icon: Briefcase, text: "text-cyan-300", bg: "bg-cyan-400/15", dot: "bg-cyan-400" },
  { key: "Investment", label: "Invest", Icon: TrendingUp, text: "text-teal-300", bg: "bg-teal-400/15", dot: "bg-teal-400" },
  { key: "Gift", label: "Gift", Icon: Gift, text: "text-pink-300", bg: "bg-pink-400/15", dot: "bg-pink-400" },
  { key: "Other", label: "Other", Icon: MoreHorizontal, text: "text-slate-300", bg: "bg-slate-400/15", dot: "bg-slate-400" },
];

export function getCatMeta(type: TxType, key: string): CategoryMeta {
  const list = type === "income" ? INCOME_CATS : EXPENSE_CATS;
  return list.find((c) => c.key === key) ?? list[list.length - 1];
}

export const DEFAULT_BUDGETS: Budgets = {
  Food: 0,
  Transport: 0,
  Entertainment: 0,
  Shopping: 0,
  Bills: 0,
  Health: 0,
};

/** Starting balance. Everything begins at zero — no demo data. */
export const BASE_BALANCE = 0;

export const BUBBLES = [
  { left: "8%", size: 10, delay: "0s", dur: "9s" },
  { left: "22%", size: 6, delay: "2s", dur: "7s" },
  { left: "40%", size: 14, delay: "4s", dur: "11s" },
  { left: "58%", size: 7, delay: "1s", dur: "8s" },
  { left: "74%", size: 11, delay: "5s", dur: "10s" },
  { left: "88%", size: 5, delay: "3s", dur: "6.5s" },
];
