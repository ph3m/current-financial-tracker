"use client";

import { TriangleAlert, RotateCcw } from "lucide-react";

export default function ResetConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-abyss/70 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="modal-pop w-full max-w-xs rounded-3xl border border-edge/40 bg-surface p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-expense/15">
          <TriangleAlert className="h-7 w-7 text-expense" />
        </div>
        <h2 className="text-base font-semibold text-white">Reset everything?</h2>
        <p className="mt-2 text-sm text-ink">
          This clears every transaction and budget limit and starts the app over from zero. This can&apos;t be
          undone.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-abyss py-3 text-sm font-semibold text-white transition active:scale-[0.97]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center gap-1.5 rounded-2xl bg-expense py-3 text-sm font-semibold text-abyss transition active:scale-[0.97]"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
