import escapeStringRegexp from "escape-string-regexp"
import MiniMatcherOptions, { optionsToFlags } from "./MiniMatcherOptions"

export default class MiniMatcher extends RegExp {
  static #cache: Map<string, RegExp> = new Map()
  static #cachingEnabled: boolean = true

  static enableCaching() {
    this.#cachingEnabled = true
  }

  static disableCaching() {
    this.#cachingEnabled = false
    this.clearCache()
  }

  static clearCache() {
    this.#cache.clear()
  }

  static #compile(pattern: string, options: MiniMatcherOptions = {}): RegExp {
    const cacheKey = pattern

    if (this.#cachingEnabled && this.#cache.has(cacheKey)) {
      return new RegExp(this.#cache.get(cacheKey)!, optionsToFlags(options))
    }
    
    const negated = pattern.startsWith("!") && pattern.length > 1
    if (negated) {
      pattern = pattern.slice(1)
    }

    pattern = escapeStringRegexp(pattern)
      .replace(/\\\*/g, "[\\s\\S]*")
      .replace(/\\\?/g, "[\\s\\S]{1}")
    
    if (negated) {
      pattern = `(?!${pattern})`
    } else {
      pattern = `${pattern}`
    }

    if (!(options.global || options.multiline)) {
      pattern = `^${pattern}$`
    }

    const regExp = new RegExp(pattern, optionsToFlags(options))
    if (this.#cachingEnabled) {
      this.#cache.set(cacheKey, regExp)
    }

    return regExp
  }

  constructor(readonly pattern: string, readonly options: MiniMatcherOptions = {}) {
    super(MiniMatcher.#compile(pattern, options))
  }
}