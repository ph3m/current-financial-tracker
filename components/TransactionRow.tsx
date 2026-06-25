import { getCatMeta } from "@/lib/data";
import { fmtDateShort, fmtSigned } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import CategoryIcon from "./CategoryIcon";

export default function TransactionRow({ tx }: { tx: Transaction }) {
  const meta = getCatMeta(tx.type, tx.category);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-edge/20 bg-surface/60 p-3 transition hover:border-edge/40">
      <CategoryIcon type={tx.type} category={tx.category} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{tx.note || tx.category}</p>
        <p className="truncate text-xs text-ink">
          {meta.label} &middot; {fmtDateShort(tx.date)}
        </p>
      </div>
      <p className={`shrink-0 text-sm font-semibold ${tx.type === "income" ? "text-income" : "text-expense"}`}>
        {fmtSigned(tx.amount, tx.type)}
      </p>
    </div>
  );
}
