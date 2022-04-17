import MiniMatcher from "../src"

test("Usage", () => {
  const matcher = new MiniMatcher("*bar", { global: true })
  expect(matcher.test("foobar")).toBe(true)
  expect("foobarbaz".replace(matcher, "goo")).toBe("goobaz")
})

describe("Wildcards", () => {
  test("Star (*)", () => {
    const matcher = new MiniMatcher("foo*")
    expect(matcher.test("foo")).toBe(true)
    expect(matcher.test("foobar")).toBe(true)
    expect(matcher.test("foo\nbar")).toBe(true)
  })

  test("Question Mark (?)", () => {
    const matcher = new MiniMatcher("foo?")
    expect(matcher.test("food")).toBe(true)
    expect(matcher.test("foot")).toBe(true)
    expect(matcher.test("football")).toBe(false)
  })

  test("Question Mark (?)", () => {
    const matcher = new MiniMatcher("!foo*")
    expect(matcher.test("foobar")).toBe(false)
    expect(matcher.test("foo")).toBe(false)
    expect(matcher.test("bar")).toBe(true)
    expect(matcher.test("barfoo")).toBe(true)
  })
})