export function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getSortOrderForDate(date: Date): number {
  const TOTAL_PROMPTS = 90;
  return (getDayOfYear(date) % TOTAL_PROMPTS) + 1;
}

export function getTodaySortOrder(): number {
  return getSortOrderForDate(new Date());
}
