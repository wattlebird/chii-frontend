import { Subject, InfoBox, OrderKey, Order, SubjectType } from '../Types'

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
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => ascendingComparator(a, b, orderBy)
}
