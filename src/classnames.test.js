import { cn } from './classnames'
import test from 'ava'

test('cn without default modifiers', t => {
  const cat = cn('cat')
  t.is(cat(), 'cat')
  t.is(cat('tail'), 'cat__tail')
  t.is(cat({ color: 'black' }), 'cat cat_color_black')
  t.is(cat('tail', { size: 'long' }), 'cat__tail cat__tail_size_long')
})

test('cn with default modifiers', t => {
  const cat = cn('cat', { color: 'black' })
  t.is(cat(), 'cat cat_color_black')
  t.is(cat({ color: 'white' }), 'cat cat_color_white')

  t.is(cat('tail'), 'cat__tail')
  t.is(cat('tail', { size: 'long' }), 'cat__tail cat__tail_size_long')
})
