import React from "react";
import TextStats from "./components/TextStats";
import { getTextStats } from "./components/textStats";


const DEFAULT_TEXT =
  "Paste or type here...\n\nThis app counts words, characters, and lines.";

export default function App() {
  const [text, setText] = React.useState(DEFAULT_TEXT);
  const [copied, setCopied] = React.useState(false);

  async function copyStats() {
    const s = getTextStats(text);
    const payload =
      `Words: ${s.words}\n` +
      `Characters (with spaces): ${s.charsWithSpaces}\n` +
      `Characters (no spaces): ${s.charsWithoutSpaces}\n` +
      `Lines: ${s.lines}\n` +
      `Reading time: ${s.readingTimeMinutes === 0 ? "—" : s.readingTimeMinutes.toFixed(2) + " min"}\n`;

    await navigator.clipboard.writeText(payload);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  function clearText() {
    setText("");
  }

  return (
    <div className="container py-4 py-lg-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-9">
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">
            <div>
              <h1 className="h3 mb-1">Word & Character Counter</h1>
              <div className="text-secondary">
                Production-ready Bootstrap app (React + TypeScript).
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={clearText}>
                Clear
              </button>
              <button className="btn btn-primary" onClick={copyStats}>
                {copied ? "Copied!" : "Copy stats"}
              </button>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body">
              <label className="form-label fw-semibold" htmlFor="text-input">
                Your text
              </label>
              <textarea
                id="text-input"
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste text here..."
                spellCheck={true}
              />
              <div className="d-flex justify-content-between mt-2 small text-secondary">
                <span>Tip: works with multiple spaces/newlines.</span>
                <span>Local-only (no server calls).</span>
              </div>
            </div>
          </div>

          <TextStats text={text} />
        </div>
      </div>
    </div>
  );
}