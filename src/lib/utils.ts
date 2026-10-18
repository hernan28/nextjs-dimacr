import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasValidDiscount(item: { price?: number; discountedPrice?: number }): item is {
  price: number;
  discountedPrice: number;
} {
  return typeof item.price === "number" &&
    Number.isFinite(item.price) &&
    typeof item.discountedPrice === "number" &&
    Number.isFinite(item.discountedPrice) &&
    item.discountedPrice < item.price
}
