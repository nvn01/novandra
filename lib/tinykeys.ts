// forked from https://github.com/jamiebuilds/tinykeys
// to fix navigator not being defined in SSR context

/* (license information remains unchanged) */

type KeyBindingPress = [string[], string]

export interface KeyBindingMap {
  [keybinding: string]: (event: KeyboardEvent) => void
}

export interface Options {
  ignoreFocus?: boolean
}

let KEYBINDING_MODIFIER_KEYS = ['Shift', 'Meta', 'Alt', 'Control']
let TIMEOUT = 1000
let inputs = ['select', 'textarea', 'input']

/**
 * Parses a "Key Binding String" into its parts
 */
function parse(str: string): KeyBindingPress[] {
  // Ensure we are in a client-side context before accessing `navigator`
  let MOD = 'Control'
  if (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform)
  ) {
    MOD = 'Meta'
  }

  return str
    .trim()
    .split(' ')
    .filter(press => press) // Filter out any undefined or empty strings
    .map(press => {
      let mods = press.split('+')
      let key = mods.pop() as string
      if (mods && Array.isArray(mods)) {
        mods = mods.map(mod => (mod === '$mod' ? MOD : mod))
      }
      return [mods, key]
    })
}

/**
 * This tells us if a series of events matches a key binding sequence either
 * partially or exactly.
 */
function match(event: KeyboardEvent, press: KeyBindingPress): boolean {
  return !(
    (press[1].toUpperCase() !== event.key.toUpperCase() &&
      press[1] !== event.code) ||
    press[0].find(mod => {
      return !event.getModifierState(mod)
    }) ||
    KEYBINDING_MODIFIER_KEYS.find(mod => {
      return !press[0].includes(mod) && event.getModifierState(mod)
    })
  )
}

export default function keybindings(
  target: Window | HTMLElement,
  keyBindingMap: KeyBindingMap,
  options: Options = {}
) {
  if (typeof window === 'undefined') {
    // If we are in an SSR context, do nothing
    return () => {}
  }

  let keyBindings = Object.keys(keyBindingMap).map(key => {
    return [parse(key), keyBindingMap[key]] as const
  })

  let possibleMatches = new Map<KeyBindingPress[], KeyBindingPress[]>()
  let timer: any = null

  let onKeyDown = (event: KeyboardEvent) => {
    if (event.getModifierState(event.key)) {
      return
    }

    if (options.ignoreFocus) {
      if (document.activeElement) {
        if (
          inputs.indexOf(document.activeElement.tagName.toLowerCase()) !== -1 ||
          (document.activeElement as HTMLElement).contentEditable === 'true'
        ) {
          return
        }
      }
    }

    keyBindings.forEach(keyBinding => {
      let sequence = keyBinding[0]
      let callback = keyBinding[1]

      let prev = possibleMatches.get(sequence)
      let remainingExpectedPresses = prev ? prev : sequence
      let currentExpectedPress = remainingExpectedPresses[0]

      let matches = match(event, currentExpectedPress)

      if (!matches) {
        possibleMatches.delete(sequence)
      } else if (remainingExpectedPresses.length > 1) {
        possibleMatches.set(sequence, remainingExpectedPresses.slice(1))
      } else {
        possibleMatches.delete(sequence)
        callback(event)
      }
    })

    clearTimeout(timer)
    timer = setTimeout(possibleMatches.clear.bind(possibleMatches), TIMEOUT)
  }

  target.addEventListener('keydown', onKeyDown as any)
  return () => {
    target.removeEventListener('keydown', onKeyDown as any)
  }
}
