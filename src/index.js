import { cn } from './classnames'
console.log(cn('cat')())
console.log(cn('cat')('tail'))
console.log(cn('cat')({ 'color': 'black' }))
console.log(cn('cat')('tail', { 'color': 'black' }))
