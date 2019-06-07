const getModifierClasses = (prefix, modifiers) => {
  const addClass = (accumulator, key) => (
    `${accumulator} ${prefix}_${key}_${modifiers[key]}`
  )

  return Object.keys(modifiers).reduce(addClass, '')
}

export const cn = (block) => (...args) => {
  // Very short call
  if (args.length === 0) {
    return block
  }

  // Short call
  if (args.length === 1) {
    // cn('cat')('tail') => 'cat__tail'
    if (typeof args[0] === 'string') {
      const element = args[0]
      return `${block}__${element}`
    }

    // cn('cat')({color: 'black'}) => 'cat cat_color_black'
    const modifiers = args[0]
    return `${block}${getModifierClasses(block, modifiers)}`
  }

  // Full call
  // args.length == 2
  // cn('cat')('tail', { color: 'black' }) => 'cat-tail cat__tail_color_black'
  const [element, modifiers] = args
  const elementClass = `${block}__${element}`
  return `${elementClass}${getModifierClasses(elementClass, modifiers)}`
}
