/** Normalize answer for comparison — lowercase, strip accents & extra spaces */
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

export function matchesAnswer(input: string, accepted: string[]): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  return accepted.some((a) => normalizeAnswer(a) === normalized);
}
