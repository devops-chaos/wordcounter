export type TextStatsResult = {
  words: number;
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  lines: number;
  readingTimeMinutes: number;
};

function countWords(text: string): number {
  const matches = text.trim().match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g);
  return matches ? matches.length : 0;
}

function countLines(text: string): number {
  if (text.length === 0) return 0;
  return text.split(/\r\n|\r|\n/).length;
}

export function getTextStats(text: string): TextStatsResult {
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s/g, "").length;
  const words = countWords(text);
  const lines = countLines(text);

  // 200 wpm reading speed estimate
  const readingTimeMinutes = words === 0 ? 0 : Math.max(0.01, words / 200);

  return { words, charsWithSpaces, charsWithoutSpaces, lines, readingTimeMinutes };
}
