"use client";

import { Home, PieChart, Target, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tab } from "./FinanceApp";

function NavBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-1 py-1 outline-none focus-visible:opacity-80"
    >
      <Icon className={`h-5 w-5 transition-colors ${active ? "text-accent" : "text-ink"}`} strokeWidth={2} />
      <span className={`text-[10px] font-medium transition-colors ${active ? "text-accent" : "text-ink"}`}>
        {label}
      </span>
    </button>
  );
}

export default function BottomNav({
  activeTab,
  setActiveTab,
  onAdd,
}: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  onAdd: () => void;
}) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30">
      <button
        onClick={onAdd}
        aria-label="Add transaction"
        className="absolute -top-7 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-accent2 text-abyss shadow-glow ring-4 ring-abyss transition active:scale-95"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
      <div className="border-t border-edge/20 bg-surface/80 px-6 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <div className="grid grid-cols-4 items-center">
          <NavBtn icon={Home} label="Home" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <NavBtn icon={PieChart} label="Insights" active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} />
          <div />
          <NavBtn icon={Target} label="Budget" active={activeTab === "budget"} onClick={() => setActiveTab("budget")} />
        </div>
      </div>
    </nav>
  );
}
