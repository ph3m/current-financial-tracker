import { getCatMeta } from "@/lib/data";
import type { TxType } from "@/lib/types";

export default function CategoryIcon({
  type,
  category,
  size = "md",
}: {
  type: TxType;
  category: string;
  size?: "md" | "lg";
}) {
  const meta = getCatMeta(type, category);
  const dims = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const iconDims = size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]";
  return (
    <div className={`${dims} flex shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
      <meta.Icon className={`${iconDims} ${meta.text}`} strokeWidth={2} />
    </div>
  );
}
