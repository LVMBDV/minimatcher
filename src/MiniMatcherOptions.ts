export default interface MiniMatcherOptions {
  hasIndices?: boolean
  global?: boolean
  ignoreCase?: boolean
  multiline?: boolean
  whitespace?: boolean
  unicode?: boolean
}

export function optionsForCacheKey(options: MiniMatcherOptions): string {
  const { whitespace, global } = options

  return JSON.stringify({
    whitespace,
    global
  })
}

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