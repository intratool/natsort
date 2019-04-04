// --- CONSTANTS ---
const ZERO_REGEX = /^0/
const STRING_REGEX = /\s+/g
const ONLY_STRING_REGEX = /^\s+|\s+$/g
const UNICODE_REGEX = /[^\x00-\x80]/
const HEX_REGEX = /^0x[0-9a-f]+$/i
const NUMERIC_REGEX = /(0x[\da-fA-F]+|(^[\+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|\d+)/g
const DATE_REGEX = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/ // tslint:disable-line

// --- UTILS ---
const toLowerCase = String.prototype.toLocaleLowerCase || String.prototype.toLowerCase

// Normalize values
const normalize = (s: string | number, i: boolean) => {
  const v: string = i ? toLowerCase.call(`${s}`) : `${s}`
  return v.replace(ONLY_STRING_REGEX, '')
}

// Split numeric strings and default strings
const tokenize = (s: string): string[] => {
  return s
    .replace(NUMERIC_REGEX, '\0$1\0')
    .replace(/\0$/, '')
    .replace(/^\0/, '')
    .split('\0')
}

// Normalize spaces
const parse = (s: string, l: number) => {
  // Find floats not starting with '0', strings or 0 if not defined (Clint Priest)
  return (
    ((!s.match(ZERO_REGEX) || l === 1) && parseFloat(s)) ||
    s.replace(STRING_REGEX, ' ').replace(ONLY_STRING_REGEX, '') ||
    0
  )
}

// --- TYPES ---
export type OptionsType = {
  /*
   * Desc sorting.
   */
  desc?: boolean
  /*
   * Case-Insensitive sorting.
   */
  insensitive?: boolean
}

export default function natsort(options: OptionsType = {}) {
  const desc = options.desc || false
  const insensitive = options.insensitive || false

  const EQUAL = 0
  const GREATER = desc ? -1 : 1
  const SMALLER = -GREATER

  return (a: string | number, b: string | number): number => {
    // Trim pre-post whitespace
    const aa = normalize(a, insensitive)
    const bb = normalize(b, insensitive)

    // Return immediately for empty values (empty < any others)
    if (!aa && !bb) {
      return EQUAL
    }
    if (!aa && bb) {
      return SMALLER
    }
    if (aa && !bb) {
      return GREATER
    }

    // Tokenize values
    const aArr = tokenize(aa)
    const bArr = tokenize(bb)

    // Hex or date detection
    const aHex = aa.match(HEX_REGEX)
    const bHex = bb.match(HEX_REGEX)

    const av = aHex && bHex ? parseInt(aHex[0], 16) : aArr.length !== 1 && Date.parse(aa)
    const bv =
      aHex && bHex ? parseInt(bHex[0], 16) : (av && bb.match(DATE_REGEX) && Date.parse(bb)) || null

    // Try and sort hex codes or dates
    if (bv) {
      if (av === bv) {
        return EQUAL
      }

      if (av < bv) {
        return SMALLER
      }

      if (av > bv) {
        return GREATER
      }
    }

    // Array lengths
    const al = aArr.length
    const bl = bArr.length
    const ml = Math.max(al, bl)

    // Handle numeric strings and default strings
    for (let i = 0; i < ml; i += 1) {
      const af = parse(aArr[i] || '', al)
      const bf = parse(bArr[i] || '', bl)

      // Handle numeric vs string comparison (numeric < string)
      if (isNaN(af as number) !== isNaN(bf as number)) {
        return isNaN(af as number) ? GREATER : SMALLER
      }

      // If unicode use locale comparison
      if (UNICODE_REGEX.test((af as string) + (bf as string)) && (af as string).localeCompare) {
        const comp = (af as string).localeCompare(bf as string)
        if (comp > 0) {
          return GREATER
        }
        if (comp < 0) {
          return SMALLER
        }
        if (i === ml - 1) {
          return EQUAL
        }
      }

      if (af < bf) {
        return SMALLER
      }
      if (af > bf) {
        return GREATER
      }
      if (`${af}` < `${bf}`) {
        return SMALLER
      }
      if (`${af}` > `${bf}`) {
        return GREATER
      }
    }

    return EQUAL
  }
}
