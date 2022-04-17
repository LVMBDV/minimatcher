export default interface MiniMatcherOptions {
  /**
   * If true, generate indices for substring matches.
   *
   * @remarks
   * Equivalent to RegExp flag `d`.
   */
  hasIndices?: boolean

  /**
   * If true, search for the pattern in the whole string, not just the start.
   *
   * @remarks
   * Equivalent to RegExp flag `g`.
   */
  global?: boolean

  /**
   * If true, search for the pattern case-insensitively.
   *
   * @remarks
   * Equivalent to RegExp flag `i`.
   */
  ignoreCase?: boolean

  /**
   * If true, search for the pattern in each line of the string.
   *
   * @remarks
   * Equivalent to RegExp flag `m`.
   */
  multiline?: boolean

  /**
   * If true, wildcards match whitespace characters as well.
   * @defaultValue true
   */
  whitespace?: boolean

  /**
   * If true, characters in the pattern and the string are also recognized as code points.
   *
   * @remarks
   * Equivalent to RegExp flag `u`.
   */
  unicode?: boolean
}

/**
 * Returns the options that affect RegExp generation, as a serialized JSON object.
 *
 * @remarks
 * This is used to avoid making redundant cache entries.
 */
export function optionsForCacheKey(options: MiniMatcherOptions): string {
  const { whitespace, global } = options

  return JSON.stringify({
    whitespace,
    global
  })
}

/**
 * Returns a RegExp flag string for the given options.
 * Returns undefined if no flags are needed.
 */
export function optionsToFlags(options: MiniMatcherOptions): string | undefined {
  let flags = []

  if (options.hasIndices) {
    flags.push("d")
  }

  if (options.global) {
    flags.push("g")
  }

  if (options.ignoreCase) {
    flags.push("i")
  }

  if (options.multiline) {
    flags.push("m")
  }

  if (options.unicode) {
    flags.push("u")
  }

  return flags.length > 0 ? flags.join("") : undefined
}