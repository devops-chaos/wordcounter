import React from "react";
import { getTextStats } from "./textStats";

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
            {stats.readingTimeMinutes === 0 ? "—" : `${stats.readingTimeMinutes.toFixed(2)} min`}
          </div>
        </div>
      </div>
    </div>
  );
}
