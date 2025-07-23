// Simple utility function for combining class names without Tailwind dependency
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
