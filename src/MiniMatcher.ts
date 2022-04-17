import escapeStringRegexp from "escape-string-regexp"
import MiniMatcherOptions, { optionsForCacheKey, optionsToFlags } from "./MiniMatcherOptions"

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

  /**
   * Compiles the given pattern and options into a RegExp.
   *
   * @remarks
   * A cached RegExp is returned if caching is enabled and the result is already
   * cached.
   */
  static #compile(pattern: string, options: MiniMatcherOptions = {}): RegExp {
    const cacheKey = pattern + optionsForCacheKey(options)

    if (this.#cachingEnabled && this.#cache.has(cacheKey)) {
      return new RegExp(this.#cache.get(cacheKey)!, optionsToFlags(options))
    }

    const negated = pattern.startsWith("!") && pattern.length > 1
    if (negated) {
      pattern = pattern.slice(1)
    }

    const wildcard = options.whitespace ? "[\\s\\S]" : "[\\S]"

    pattern = escapeStringRegexp(pattern)
      .replace(/(\\\?)*(\\\*)+(\\\?)*/g, `${wildcard}*`)
      .replace(/\\\?/g, `${wildcard}{1}`)

    if (negated) {
      pattern = `(?!${pattern})[\\s\\S]+`
    } else {
      pattern = `${pattern}`
    }

    if (!options.global) {
      pattern = `^${pattern}$`
    }

    const regExp = new RegExp(pattern, optionsToFlags(options))
    if (this.#cachingEnabled) {
      this.#cache.set(cacheKey, regExp)
    }

    return regExp
  }

  constructor(readonly pattern: string, readonly options: MiniMatcherOptions = {}) {
    super(MiniMatcher.#compile(
      pattern,
      {
        whitespace: true,
        ...options
      }))
  }
}