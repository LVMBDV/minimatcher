import MiniMatcher from "../src/MiniMatcher"

describe("MiniMatcher", () => {
  describe("#test", () => {
    it("should match a constant string ignoring case", () => {
      const matcher = new MiniMatcher("foo", { ignoreCase: true })
      expect(matcher.test("foo")).toBe(true)
      expect(matcher.test("Foo")).toBe(true)
      expect(matcher.test("FOO")).toBe(true)
    })
  })
})