import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Item } from "@/app/types"

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

export function getItemDisplayName(item: { brand?: string; title: string }) {
  const brand = item.brand?.trim()
  const title = item.title.trim()

  if (!brand) return title

  const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const existingBrandPrefix = new RegExp(`^${escapedBrand}\\s*[-–—:]\\s*`, 'i')
  return existingBrandPrefix.test(title) ? title : `${brand} - ${title}`
}

export function expandCatalogVariants(items: Item[]): Item[] {
  return items.flatMap(item => {
    if (!item.variants?.length || item.variantType === 'standard') return [item]

    if (item.variantType === 'background') {
      const colors = new Map<string, typeof item.variants>()
      for (const variant of item.variants) {
        const color = variant.color?.trim()
        if (!color) continue
        const key = color.toLocaleLowerCase()
        const existing = colors.get(key) ?? []
        colors.set(key, [...existing, variant])
      }

      return [...colors.values()].map((variants) => {
        const catalogVariant = [...variants].sort((a, b) => a.price - b.price)[0]
        return {
          ...item,
          catalogVariant,
          catalogKey: `${item._id}-${catalogVariant._key}`,
        }
      })
    }

    if (item.variantType === 'lensMount') {
      const mounts = new Map<string, (typeof item.variants)[number]>()
      for (const variant of item.variants) {
        const mount = variant.mount?.trim()
        if (mount && !mounts.has(mount.toLocaleLowerCase())) {
          mounts.set(mount.toLocaleLowerCase(), variant)
        }
      }

      return [...mounts.values()].map(catalogVariant => ({
        ...item,
        catalogVariant,
        catalogKey: `${item._id}-${catalogVariant._key}`,
      }))
    }

    return [item]
  })
}
