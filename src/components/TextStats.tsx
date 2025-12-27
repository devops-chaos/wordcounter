import React from "react";

export type TextStatsResult = {
  words: number;
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  lines: number;
  readingTimeMinutes: number;
};

function countWords(text: string): number {
  const matches = text
    .trim()
    .match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g);
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

export default function TextStats({ text }: { text: string }) {
  const stats = React.useMemo(() => getTextStats(text), [text]);

  return (
    <div className="row g-3">
      <div className="col-6 col-lg-3">
        <div className="p-3 bg-white rounded-3 stat-card h-100">
          <div className="small-muted">Words</div>
          <div className="fs-3 fw-semibold">{stats.words}</div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="p-3 bg-white rounded-3 stat-card h-100">
          <div className="small-muted">Characters</div>
          <div className="fs-3 fw-semibold">{stats.charsWithSpaces}</div>
          <div className="small small-muted">with spaces</div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="p-3 bg-white rounded-3 stat-card h-100">
          <div className="small-muted">Characters</div>
          <div className="fs-3 fw-semibold">{stats.charsWithoutSpaces}</div>
          <div className="small small-muted">no spaces</div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="p-3 bg-white rounded-3 stat-card h-100">
          <div className="small-muted">Lines</div>
          <div className="fs-3 fw-semibold">{stats.lines}</div>
        </div>
      </div>

      <div className="col-12">
        <div className="p-3 bg-white rounded-3 stat-card">
          <div className="small-muted">Estimated reading time</div>
          <div className="fw-semibold">
            {stats.readingTimeMinutes === 0
              ? "—"
              : `${stats.readingTimeMinutes.toFixed(2)} min`}
          </div>
        </div>
      </div>
    </div>
  );
}
