import { buildTreeMenuAncestorsMatcher } from "../p2LayoutTreeMenuUtils";

describe("treeMenuAncestorsMatcher", () => {
  let matcher = null;

  beforeEach(() => {
    matcher = buildTreeMenuAncestorsMatcher("a1.b1");
  });
  afterEach(() => {
    matcher = null;
  });

  it("tree-menu-selected-on-2nd-level", () => {
    // Arrange

    // Act

    // Assert
    // const div = element.shadowRoot.querySelector('div');
    expect(matcher.match("a1")).toBe(true);
    expect(matcher.match("a1.b1")).toBe(true);
    expect(matcher.match("a1.b1.c1")).toBe(true);
    expect(matcher.match("a1.b1.c2")).toBe(true);
    expect(matcher.match("a1.b2")).toBe(true);
    expect(matcher.match("a1.b2.c1")).toBe(false);
    expect(matcher.match("a1.b2.c2")).toBe(false);
    expect(matcher.match("a1.b3")).toBe(true);
    expect(matcher.match("a2")).toBe(true);
    expect(matcher.match("a2.b1")).toBe(false);
    expect(matcher.match("a3")).toBe(true);
  });

  it("tree-menu-selected-on-1st-level", () => {
    // Arrange
    const matcher1 = buildTreeMenuAncestorsMatcher("a1");

    // Act

    // Assert
    // const div = element.shadowRoot.querySelector('div');
    expect(matcher1.match("a1")).toBe(true);
    expect(matcher1.match("a1.b1")).toBe(true);
    expect(matcher1.match("a1.b1.c1")).toBe(false);
    expect(matcher1.match("a1.b1.c2")).toBe(false);
    expect(matcher1.match("a1.b2")).toBe(true);
    expect(matcher1.match("a1.b2.c1")).toBe(false);
    expect(matcher1.match("a1.b2.c2")).toBe(false);
    expect(matcher1.match("a1.b3")).toBe(true);
    expect(matcher1.match("a2")).toBe(true);
    expect(matcher1.match("a2.b1")).toBe(false);
    expect(matcher1.match("a3")).toBe(true);
  });
});
