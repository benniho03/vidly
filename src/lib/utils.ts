import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number) {
  if (number < 1000) return Math.floor(number).toLocaleString("en-US")
  if (number < 1000000) return `${Math.floor(number / 1000).toLocaleString("en-US")}K`
  if (number < 1000000000) return `${Math.floor(number / 1000000).toLocaleString("en-US")}M`
  return `${Math.floor(number / 1000000000).toLocaleString("en-US")}B`
}