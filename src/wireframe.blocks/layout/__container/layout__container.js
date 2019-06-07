import { layoutClassname } from '../layout'

export const containerTemplate = ({
  modifiers = {},
  children = '',
  mixins = ''
}) => (
  `<div class="${layoutClassname('container', modifiers)} ${mixins}">
    ${children}
  </div>`
)
