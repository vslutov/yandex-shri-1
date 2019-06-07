import { cn } from './classnames'
import test from 'ava'

test('cn', t => {
  t.is(cn('cat')(), 'cat')
  t.is(cn('cat')('tail'), 'cat__tail')
  t.is(cn('cat')({ color: 'black' }), 'cat cat_color_black')
  t.is(cn('cat')('tail', { color: 'black' }), 'cat__tail cat__tail_color_black')
})
