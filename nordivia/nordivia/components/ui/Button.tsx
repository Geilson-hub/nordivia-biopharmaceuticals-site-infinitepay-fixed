import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "maple";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const v =
    variant === "primary" ? "btn-primary" : variant === "maple" ? "btn-maple" : "btn-secondary";
  return <button className={cn(v, className)} {...props} />;
}
