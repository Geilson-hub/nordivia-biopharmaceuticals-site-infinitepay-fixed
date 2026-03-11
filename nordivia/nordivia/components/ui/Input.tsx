import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return <input className={cn("input", className)} {...props} />;
}
