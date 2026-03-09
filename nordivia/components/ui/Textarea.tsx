import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: Props) {
  return <textarea className={cn("input min-h-[120px]", className)} {...props} />;
}
