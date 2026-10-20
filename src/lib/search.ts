export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function wordForms(word: string) {
  const forms = [word]
  if (word.length > 4 && word.endsWith('s')) forms.push(word.slice(0, -1))
  if (word.length > 5 && word.endsWith('es')) forms.push(word.slice(0, -2))
  if (word.length > 5 && word.endsWith('ces')) forms.push(`${word.slice(0, -3)}z`)
  return forms
}

// Counts substitutions, missing/extra letters, and adjacent swapped letters.
function editDistance(a: string, b: string) {
  const distances = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i++) distances[i][0] = i
  for (let j = 0; j <= b.length; j++) distances[0][j] = j

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      distances[i][j] = Math.min(
        distances[i - 1][j] + 1,
        distances[i][j - 1] + 1,
        distances[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        distances[i][j] = Math.min(distances[i][j], distances[i - 2][j - 2] + 1)
      }
    }
  }
  return distances[a.length][b.length]
}

function wordScore(query: string, titleWords: string[]) {
  const queryForms = wordForms(query)
  let bestScore = 0

  for (const titleWord of titleWords) {
    for (const queryForm of queryForms) {
      for (const titleForm of wordForms(titleWord)) {
        if (queryForm === titleForm) bestScore = Math.max(bestScore, 4)
        else if (titleForm.includes(queryForm)) bestScore = Math.max(bestScore, 3)
        // Keep short names and model numbers precise; allow typos in longer words.
        else if (queryForm.length >= 4 && titleForm.length >= 4 && /[a-z]/.test(queryForm) && /^[a-z]+$/.test(titleForm)) {
          const tolerance = Math.min(queryForm.length, titleForm.length) >= 8 ? 2 : 1
          if (Math.abs(queryForm.length - titleForm.length) <= tolerance && editDistance(queryForm, titleForm) <= tolerance) {
            bestScore = Math.max(bestScore, 1)
          }
        }
      }
    }
  }
  return bestScore
}

export function rankSearchItems<T extends { title: string; brand?: string }>(items: T[], query: string): T[] {
  const normalizedQuery = normalizeSearch(query)
  if (!normalizedQuery) return []

  const words = normalizedQuery.split(' ')
  return items.map(item => {
    const title = normalizeSearch(`${item.brand ?? ''} ${item.title}`)
    const scores = words.map(word => wordScore(word, title.split(' ')))
    const score = title === normalizedQuery ? 100 : title.includes(normalizedQuery) ? 90 : scores.every(score => score > 0) ? scores.reduce((sum, score) => sum + score, 0) / words.length : 0
    return { item, score }
  }).filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'es'))
    .map(result => result.item)
}
