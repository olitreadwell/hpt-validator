import { removeBOM } from "../src/utils.js";

describe("removeBOM", () => {
  it("should remove a leading UTF-8 byte-order mark", () => {
    expect(removeBOM('\uFEFF{ "a": 1 }')).toBe('{ "a": 1 }');
  });

  it("should remove only the BOM, not unrelated leading whitespace", () => {
    // A BOM followed by legitimate leading whitespace must keep that whitespace.
    expect(removeBOM('\uFEFF  { "a": 1 }')).toBe('  { "a": 1 }');
    expect(removeBOM("\uFEFF\n,foo")).toBe("\n,foo");
  });

  it("should return an unchanged string when there is no BOM", () => {
    expect(removeBOM("hello")).toBe("hello");
    expect(removeBOM("  hello")).toBe("  hello");
  });

  it("should handle a string that is only a BOM", () => {
    expect(removeBOM("\uFEFF")).toBe("");
  });
});
