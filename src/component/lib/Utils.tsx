export function DateSorter(a: string | undefined | null, b: string | undefined | null): number {
  if (!a || a.startsWith("0001")) return (!b || b.startsWith("0001")) ? 0 : 1;
  if (!b || b.startsWith("0001")) return -1;
  return (new Date(a)).getTime() - (new Date(b)).getTime();
}

export function RankSorter(a: number | null | undefined, b: number | null | undefined): number {
  if (typeof b !== "number") return -1
  else if (typeof a !== "number") return 1
  else return a - b
}