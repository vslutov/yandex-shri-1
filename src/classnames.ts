export interface Modifiers {
  [key: string]: string
}

export type Classname = string
export type Classnames = string

const getModifierClasses = (prefix: Classname, modifiers: Modifiers): Classnames => {
  const addClass = (accumulator: Classnames, key: string): Classnames => (
    `${accumulator} ${prefix}_${key}_${modifiers[key]}`
  )

  return Object.keys(modifiers).reduce(addClass, '')
}

type CNArgs = [] | [Classname] | [Modifiers] | [Classname, Modifiers]

const getBasicClass = (block: string, args: CNArgs): Classname => {
  if (args.length === 0 || typeof args[0] !== 'string') {
    return block
  }

  return `${block}__${args[0]}`
}

const getModifiers = (defaultModifiers: Modifiers, args: CNArgs): Modifiers => {
  // block()
  if (args.length === 0) {
    return defaultModifiers
  }

  // block(elem, elemModifiers)
  if (args.length === 2) {
    return args[1]
  }

  // args.length === 1
  // block(blockModifiers)
  if (typeof args[0] !== 'string') {
    return Object.assign({}, defaultModifiers, args[0])
  }

  // block(elem)
  return {}
}

export const cn = (block: Classname, defaultModifiers: Modifiers = {}) => (...args: CNArgs) : Classnames => {
  const basicClass = getBasicClass(block, args)
  const modifiers = getModifiers(defaultModifiers, args)

  return `${basicClass}${getModifierClasses(basicClass, modifiers)}`
}
