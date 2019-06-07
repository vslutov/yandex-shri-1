const getModifierClasses = (prefix, modifiers) => {
  const addClass = (accumulator, key) => (
    `${accumulator} ${prefix}_${key}_${modifiers[key]}`
  )

  return Object.keys(modifiers).reduce(addClass, '')
}

const getBasicClass = (block, args) => {
  if (args.length === 0 || typeof args[0] !== 'string') {
    return block
  }

  return `${block}__${args[0]}`
}

const getModifiers = (defaultModifiers, args) => {
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

export const cn = (block, defaultModifiers = {}) => (...args) => {
  const basicClass = getBasicClass(block, args)
  const modifiers = getModifiers(defaultModifiers, args)

  return `${basicClass}${getModifierClasses(basicClass, modifiers)}`
}
