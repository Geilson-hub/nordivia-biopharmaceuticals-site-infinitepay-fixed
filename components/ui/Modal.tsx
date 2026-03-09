"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: Props) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn("relative w-full max-w-md card p-5")}>
        {title ? <div className="mb-3 text-lg font-extrabold">{title}</div> : null}
        {children}
      </div>
    </div>
  );
}
