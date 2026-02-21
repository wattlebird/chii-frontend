import { Subject, Order } from '../Types'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (!b[orderBy]) return -1
  if (!a[orderBy]) return 1
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function ascendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (!b[orderBy]) return -1
  if (!a[orderBy]) return 1
  if (b[orderBy] < a[orderBy]) {
    return 1
  }
  if (b[orderBy] > a[orderBy]) {
    return -1
  }
  return 0
}

export function getComparator<Key extends keyof Subject>(
  order: Order,
  orderBy: Key
): (a: Subject, b: Subject) => number {
  if (orderBy === 'score') return () => 0
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => ascendingComparator(a, b, orderBy)
}

export function isSubjectCategory(cat: string) {
  return ['subject', 'anime', 'book', 'music', 'game', 'real'].includes(cat)
}

export function isCelebrityCategory(cat: string) {
  return ['celebrity', 'person', 'character'].includes(cat)
}

export const CATEGORY_EMOJI: Record<string, string> = {
  subject: '📦',
  anime: '🎬',
  book: '📚',
  music: '🎵',
  game: '🎮',
  real: '📺',
  celebrity: '👤',
  person: '👤',
  character: '🎭',
}

const DEFAULT_CATEGORY_EMOJI = '📦'

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] || DEFAULT_CATEGORY_EMOJI
}
