import { client } from './client'

export async function fetchSuggestedSearches() {
  return client.fetch<string[] | null>(`*[_type == "searchSettings"] | order(_updatedAt desc)[0].terms`)
}
