import { describe, it, expect } from "vitest";
import { getTextStats } from "./TextStats";

describe("getTextStats", () => {
  it("counts words and characters correctly", () => {
    const s = getTextStats("Hello world\nHi");
    expect(s.words).toBe(3);
    expect(s.lines).toBe(2);
    expect(s.charsWithSpaces).toBe("Hello world\nHi".length);
    expect(s.charsWithoutSpaces).toBe("HelloworldHi".length);
  });
});
