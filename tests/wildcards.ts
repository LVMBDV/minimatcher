import MiniMatcher from "../src/MiniMatcher"

describe("MiniMatcher", () => {
  describe("#test", () => {
    it("should match a constant string", () => {
      const matcher = new MiniMatcher("foo")
      expect(matcher.test("foo")).toBe(true)
      expect(matcher.test("foobar")).toBe(false)
      expect(matcher.test("bar")).toBe(false)
    })

    it("should match a pattern with a star at the end", () => {
      const matcher = new MiniMatcher("Mary had a little*")
      expect(matcher.test("Mary had a little lamb")).toBe(true)
      expect(matcher.test("Mary had a little")).toBe(true)
      expect(matcher.test("Alice had a little lamb")).toBe(false)
    })

    it("should match a pattern with a star at the beginning", () => {
      const matcher = new MiniMatcher("*Factory")
      expect(matcher.test("EnterpriseBeanFactory")).toBe(true)
      expect(matcher.test("Factory")).toBe(true)
      expect(matcher.test("FactoryWrapper")).toBe(false)
    })
    
    it("should match a pattern with a star in between constants", () => {
      const matcher = new MiniMatcher("The*Moose")
      expect(matcher.test("The Moose")).toBe(true)
      expect(matcher.test("The Dead Moose")).toBe(true)
      expect(matcher.test("The Goose")).toBe(false)
    })

    it("should match a pattern with a question mark at the end", () => {
      const matcher = new MiniMatcher("Cra?")
      expect(matcher.test("Crab")).toBe(true)
      expect(matcher.test("Crap")).toBe(true)
      expect(matcher.test("Cradle")).toBe(false)
    })
    
    it("should match a pattern with a question mark at the beginning", () => {
      const matcher = new MiniMatcher("?roll")
      expect(matcher.test("Troll")).toBe(true)
      expect(matcher.test("Broll")).toBe(true)
      expect(matcher.test("Schroll")).toBe(false)
    })
    
    it("should match a pattern with a question mark in between constants", () => {
      const matcher = new MiniMatcher("r?t")
      expect(matcher.test("rat")).toBe(true)
      expect(matcher.test("rot")).toBe(true)
      expect(matcher.test("root")).toBe(false)
      expect(matcher.test("cat")).toBe(false)
    })
  })
})