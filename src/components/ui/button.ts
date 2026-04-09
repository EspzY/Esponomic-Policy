import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-ink)] text-white hover:bg-[var(--color-teal)] active:bg-[var(--color-teal)] disabled:bg-[rgba(24,33,45,0.35)] disabled:text-white",
  secondary:
    "bg-[var(--color-teal)] text-white hover:bg-[color-mix(in_srgb,var(--color-teal)_85%,black)] active:bg-[color-mix(in_srgb,var(--color-teal)_80%,black)] disabled:bg-[rgba(15,118,110,0.35)] disabled:text-white",
  outline:
    "border border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-teal)] hover:text-[var(--color-teal)] active:border-[var(--color-teal)] active:text-[var(--color-teal)] disabled:border-[var(--color-line)] disabled:bg-white disabled:text-[rgba(24,33,45,0.45)]",
  danger:
    "bg-[var(--color-rust)] text-white hover:bg-[color-mix(in_srgb,var(--color-rust)_88%,black)] active:bg-[color-mix(in_srgb,var(--color-rust)_82%,black)] disabled:bg-[rgba(180,83,9,0.4)] disabled:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)] disabled:cursor-not-allowed disabled:opacity-100",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}
