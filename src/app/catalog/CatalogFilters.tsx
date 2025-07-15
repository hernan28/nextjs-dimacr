'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CatalogFilters({ categories = [], subcategories = [] }: { categories: any[]; subcategories: any[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')

  return (
    <form className="space-y-4">
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(cat => (
            <SelectItem key={cat._id} value={cat._id}>{cat.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={subcategory} onValueChange={setSubcategory}>
        <SelectTrigger>
          <SelectValue placeholder="All Subcategories" />
        </SelectTrigger>
        <SelectContent>
          {subcategories.map(sub => (
            <SelectItem key={sub._id} value={sub._id}>{sub.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  )
}
