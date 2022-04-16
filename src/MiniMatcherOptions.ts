export default interface MiniMatcherOptions {
  indices?: boolean
  global?: boolean
  ignoreCase?: boolean
  multiline?: boolean
  dotAll?: boolean
  unicode?: boolean
}

export function optionsToFlags(options: MiniMatcherOptions): string | undefined {
  let flags = []

  if (options.indices) {
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

  if (options.dotAll) {
    flags.push("s")
  }

  if (options.unicode) {
    flags.push("u")
  }

  return flags.length > 0 ? flags.join("") : undefined
}