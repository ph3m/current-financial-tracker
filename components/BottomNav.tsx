"use client";

import { Home, PieChart, Target, Plus, Settings } from "lucide-react";
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
  onReset,
}: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  onAdd: () => void;
  onReset: () => void;
}) {
  return (
    <nav
      className="absolute inset-x-4 z-30"
      style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      <div className="rounded-full border border-edge/40 bg-surface/85 px-3 py-3 shadow-2xl shadow-black/50 backdrop-blur-md">
        <div className="grid grid-cols-5 items-center">
          <NavBtn icon={Home} label="Home" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <NavBtn icon={PieChart} label="Insights" active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} />
          <div className="flex items-center justify-center">
            <button
              onClick={onAdd}
              aria-label="Add transaction"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent2 text-abyss shadow-md shadow-accent2/50 transition active:scale-90"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
          <NavBtn icon={Target} label="Budget" active={activeTab === "budget"} onClick={() => setActiveTab("budget")} />
          <NavBtn icon={Settings} label="Reset" active={false} onClick={onReset} />
        </div>
      </div>
    </nav>
  );
}
