import type { LucideIcon } from "lucide-react";

export type TxType = "income" | "expense";

export interface Transaction {
  id: number;
  type: TxType;
  amount: number;
  category: string;
  date: string; // ISO yyyy-mm-dd
  note?: string;
}

export interface CategoryMeta {
  key: string;
  label: string;
  Icon: LucideIcon;
  /** tailwind text color class, e.g. text-amber-300 */
  text: string;
  /** tailwind translucent background class, e.g. bg-amber-400/15 */
  bg: string;
  /** tailwind solid background class, e.g. bg-amber-400 (used for legend dots) */
  dot: string;
}

export interface Totals {
  balance: number;
  monthIncome: number;
  monthExpense: number;
  catTotals: Record<string, number>;
}

export type Budgets = Record<string, number>;
