/*
 В этом файле записаны тесты для microbem.
 TODO: написать больше тестов
 */
import test from 'ava'

import { getBemClassname, Block, mergeBodies, applyBody, compile } from './microbem'

test('getBemClassname', t => {
  t.is(getBemClassname({ block: 'cat' }), 'cat')
  t.is(getBemClassname({ block: 'cat', mods: { color: 'black' } }), 'cat cat_color_black')
  t.is(getBemClassname({ block: 'cat', mods: { color: 'black' }, elem: 'tail' }), 'cat__tail')
  t.is(getBemClassname({ block: 'cat', mods: { color: 'black' }, elem: 'tail', elemMods: { size: 'long' } }), 'cat__tail cat__tail_size_long')
})

test.beforeEach(t => {
  // @ts-ignore
  t.context.templates = []
  // @ts-ignore
  t.context.block = new Block('cat', t.context.templates)
})

test('empty predicate', t => {
  // @ts-ignore
  t.is(t.context.block.predicate.block, 'cat')
  // @ts-ignore
  t.is(t.context.block.predicate.elem, undefined)
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.mods, { })
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.elemMods, { })
  // @ts-ignore
  t.deepEqual(t.context.templates, [])
})

test('mod predicate', t => {
  // @ts-ignore
  t.context.block.mod('color', 'black')
  // @ts-ignore
  t.is(t.context.block.predicate.block, 'cat')
  // @ts-ignore
  t.is(t.context.block.predicate.elem, undefined)
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.mods, { color: 'black' })
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.elemMods, { })
  // @ts-ignore
  t.deepEqual(t.context.templates, [])
})

test('elemMod predicate', t => {
  // @ts-ignore
  t.context.block.elemMod('size', 'long')
  // @ts-ignore
  t.is(t.context.block.predicate.block, 'cat')
  // @ts-ignore
  t.is(t.context.block.predicate.elem, undefined)
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.mods, { })
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.elemMods, { size: 'long' })
  // @ts-ignore
  t.deepEqual(t.context.templates, [])
})

test('elem predicate', t => {
  // @ts-ignore
  t.context.block.elem('tail')
  // @ts-ignore
  t.is(t.context.block.predicate.block, 'cat')
  // @ts-ignore
  t.is(t.context.block.predicate.elem, 'tail')
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.mods, { })
  // @ts-ignore
  t.deepEqual(t.context.block.predicate.elemMods, { })
  // @ts-ignore
  t.deepEqual(t.context.templates, [])
})

test('register body', t => {
  // @ts-ignore
  t.context.block({})

  // @ts-ignore
  t.deepEqual(t.context.templates, [{
    body: {
      mix: undefined
    },
    predicate: {
      block: 'cat',
      mods: {},
      elemMods: {}
    }
  }])

  // @ts-ignore
  t.is(t.context.templates[0].predicate, t.context.block.predicate)
})

test('merge empty bodies', t => {
  t.deepEqual(mergeBodies({}, {}), {
    addAttrs: {},
    addElemMods: {},
    addMix: [],
    addMods: {},
    appendContent: [],
    prependContent: [],
    bem: undefined,
    cls: undefined,
    tag: null,
    attrs: undefined,
    content: undefined,
    elemMods: undefined,
    mix: undefined,
    mods: undefined
  })
})

test('merge attrs', t => {
  t.deepEqual(mergeBodies({
    addAttrs: { a: 'a' },
    attrs: { b: 'b' }
  }, {
    addAttrs: { c: 'c' }
  }), {
    addAttrs: { a: 'a', c: 'c' },
    addElemMods: {},
    addMix: [],
    addMods: {},
    appendContent: [],
    prependContent: [],
    bem: undefined,
    cls: undefined,
    tag: null,
    attrs: { b: 'b' },
    content: undefined,
    elemMods: undefined,
    mix: undefined,
    mods: undefined
  })

  t.deepEqual(mergeBodies({
    addAttrs: { a: 'a' },
    attrs: { b: 'b' }
  }, {
    addAttrs: { c: 'c' },
    attrs: { d: 'd' }
  }), {
    addAttrs: { c: 'c' },
    addElemMods: {},
    addMix: [],
    addMods: {},
    appendContent: [],
    prependContent: [],
    bem: undefined,
    cls: undefined,
    tag: null,
    attrs: { d: 'd' },
    content: undefined,
    elemMods: undefined,
    mix: undefined,
    mods: undefined
  })
})

test('applyBody', t => {
  t.deepEqual(applyBody({
  }, {
    block: 'cat'
  }), {
    attrs: {},
    cls: 'cat',
    content: undefined,
    tag: 'div'
  })

  t.deepEqual(applyBody({
    tag: 'a'
  }, {
    tag: 'p',
    block: 'cat'
  }), {
    attrs: { },
    tag: 'a',
    cls: 'cat',
    content: undefined
  })

  t.deepEqual(applyBody({
    addAttrs: { href: 'some_url' }
  }, {
    block: 'cat',
    attrs: { hidden: 'true' }
  }), {
    attrs: { hidden: 'true', href: 'some_url' },
    cls: 'cat',
    content: undefined,
    tag: 'div'
  })

  t.deepEqual(applyBody({
    cls: 'fromBody'
  }, {
    block: 'cat',
    cls: 'fromEntity'
  }), {
    attrs: {},
    tag: 'div',
    cls: 'fromBody cat',
    content: undefined
  })
})

test('smoke test', t => {
  const render = compile(block => {
    block('link')({
      tag: 'a',
      attrs: {
        href: 'some_link'
      }
    })
  })

  t.is(render({
    block: 'link',
    content: 'Usefull link'
  }), '<a class="link" href="some_link">Usefull link</a>')

  t.is(render({
    block: 'link',
    content: 'Usefull link',
    bem: false
  }), '<a href="some_link">Usefull link</a>')
})
