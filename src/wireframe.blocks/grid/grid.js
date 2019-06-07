import { cn } from '../../classnames'

export const gridClassname = cn('layout')

export const gridTemplate = ({
  modifiers = {},
  children = '',
  mixins = ''
}) => (
  `<div class="${gridClassname('container', modifiers)} ${mixins}">
    ${children}
  </div>`
)
