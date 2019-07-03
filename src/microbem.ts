/*
 Этот файл содержит минимальную реализацию шаблонизатора.
 Реализация не является полной, но достаточна для верстки
 макета из задания. Основана на синтаксисе, описанном тут:
 https://ru.bem.info/technologies/classic/bem-xjst/8/templates-syntax

 Чего сейчас нет в шаблонизаторе:
 - Функций в теле шаблона, параметры объявляются только декларативно
 - i-bem и js параметры
 - Методы replace, wrap, extend, def и пользовательские ражимы
 - Элемент должен всегда указывать, к какому блоку он относится
 */

type Html = string

type BlockName = string
type ElemName = string
type ModName = string
type ModValue = string
type TagName = string | boolean
type AttrValue = string
type Cls = string

type Mods = { [key: string]: ModValue }
type Attrs = { [key: string]: AttrValue }

interface BaseBemEntity {
    block?: BlockName
    elem?: ElemName
    mods?: Mods
    elemMods?: Mods
    bem?: boolean
}

interface BemEntity extends BaseBemEntity {
    content?: BemJson
    mix?: Mix
    // js параметры не поддерживаются
    attrs?: Attrs
    cls?: Cls
    tag?: TagName
    // replace не поддерживается
}

type Mix = BaseBemEntity[]
export type BemJson = BemEntity | BemJsonArray | string | null
interface BemJsonArray extends Array<BemJson> { }

export interface Body {
    // def не поддерживается
    tag?: TagName
    attrs?: Attrs
    addAttrs?: Attrs
    content?: BemJson
    prependContent?: BemJson
    appendContent?: BemJson
    mix?: Mix
    addMix?: Mix
    mods?: Mods
    addMods?: Mods
    elemMods?: Mods
    addElemMods?: Mods
    // js параметры не поддерживаются
    bem?: boolean
    cls?: Cls
    // replace не поддерживается
    // wrap не поддерживается
    // extend не поддерживается
    // пользовательские режимы не поддерживаются
}

interface Predicate {
    block: BlockName
    elem?: ElemName
    mods: { [key: string]: ModValue|boolean }
    elemMods: { [key: string]: ModValue|boolean }
}

export interface Template {
    predicate: Predicate
    body: Body
}

interface HtmlParam {
    tag: TagName
    attrs: Attrs
    content: BemJson
    cls: Cls
}

export type Render = (obj: BemJson) => Html

// Utils function
const isNotNil = <T>(obj: T | null): boolean => (
  obj != null
)

const getBemModsClassname = (
  basicName: Cls,
  mods?: { [key: string]: ModValue }
): Cls => {
  if (mods == null) {
    return basicName
  }

  return Object.keys(mods).reduce((acc: Cls, key: ModName) => `${acc} ${basicName}_${key}_${mods[key]}`, basicName)
}

export const getBemClassname = ({
  block,
  elem,
  mods,
  elemMods,
  bem
}: BaseBemEntity): Cls | null => {
  if (bem === false) {
    return null
  }

  if (elem != null) {
    return getBemModsClassname(`${block}__${elem}`, elemMods)
  } else {
    return getBemModsClassname(block, mods)
  }
}

class ExtensibleFunction extends Function {
  constructor (f) {
    super()
    return Object.setPrototypeOf(f, new.target.prototype)
  }
}

// Class to register a new block or element
export class Block extends ExtensibleFunction {
    predicate: Predicate

    constructor (block: BlockName, templates: Template[]) {
      super((body: Body): void => {
        body = {
          ...body,
          mix: body.mix != null ? body.mix.map((x: BaseBemEntity) : BaseBemEntity => ({ ...x, block: x.block || block })) : undefined
        }

        templates.push({
          predicate: this.predicate,
          body
        })
      })

      this.predicate = {
        block,
        mods: {},
        elemMods: {}
      }
    }

    elem (elem: ElemName): Block {
      this.predicate.elem = elem
      return this
    }

    mod (mod: ModName, modValue: ModValue): Block {
      this.predicate.mods[mod] = modValue
      return this
    }

    elemMod (mod: ModName, modValue: ModValue): Block {
      this.predicate.elemMods[mod] = modValue
      return this
    }
}

export type BlockCreator = (name: BlockName) => Block
type Register = (block: BlockCreator) => void

const acceptMods = (
  predicateMods: {[key: string]: ModValue | boolean},
  entityMods: Mods
): boolean => {
  for (let key in predicateMods) {
    // FIXME: тут какие-то хаки про true и false значения
    if (predicateMods[key] !== entityMods[key]) {
      return false
    }
  }

  return true
}

const accept = (predicate: Predicate, entity: BemEntity): boolean => {
  if (predicate.block !== '*' && predicate.block !== entity.block) {
    return false
  }

  if (predicate.elem == null) {
    if (entity.elem != null) {
      return false
    }
  } else if (predicate.elem === '*') {
    if (entity.elem == null) {
      return false
    }
  } else if (predicate.elem !== entity.elem) {
    return false
  }

  return acceptMods(predicate.mods, entity.mods) && acceptMods(predicate.elemMods, entity.elemMods)
}

const mergeContent = ({
  prependContent,
  appendContent,
  content
}: {
    prependContent?: BemJson,
    appendContent?: BemJson,
    content?: BemJson
}): BemJson => {
  if (appendContent == null && prependContent == null) {
    return content
  }

  return [prependContent, content, appendContent]
}

const _updateTagName = (tag: TagName): TagName | null => {
  if (tag === '' || tag === false) {
    return false
  }

  return tag
}

const mergeTag = (primaryTag?: TagName, secondaryTag?: TagName, base: TagName | null = 'div'): TagName | null => {
  if (primaryTag != null) {
    return _updateTagName(primaryTag)
  }

  if (secondaryTag != null) {
    return _updateTagName(secondaryTag)
  }

  return base
}

const mergeBem = <T>(bodyInit: T, bodyAdd: T, entity: T): T => (
  Object.assign(
    {},
    bodyInit || entity,
    bodyAdd
  )
)

export const applyBody = (body: Body, entity: BemEntity, parentBlock?: BlockName): HtmlParam => {
  const tag = mergeTag(body.tag, entity.tag)

  const attrs = mergeBem(body.attrs, body.addAttrs, entity.attrs)

  const content = mergeContent({
    prependContent: body.prependContent,
    appendContent: body.appendContent,
    content: body.content || entity.content
  })

  const mods = mergeBem(body.mods, body.addMods, entity.mods)
  const elemMods = mergeBem(body.elemMods, body.addElemMods, entity.elemMods)

  const block = entity.block || parentBlock
  const mix: Mix = (body.mix || entity.mix || []).concat(body.addMix)
    .filter(isNotNil)
    .map((x: BaseBemEntity) : BaseBemEntity => ({ ...x, block: x.block || block }))

  const bem = body.bem != null ? body.bem : entity.bem
  const bemElem: BaseBemEntity = {
    block,
    elem: entity.elem,
    mods,
    elemMods,
    bem
  }

  const bemClasses: Cls = [bemElem].concat(mix).map(getBemClassname).join(' ')

  const cls = [body.cls || entity.cls, bemClasses].filter(isNotNil).join(' ')

  return {
    tag,
    attrs,
    content,
    cls
  }
}

const mergeBodiesObject = <T>(
  first: T | null,
  second: T | null,
  addFirst: T | null,
  addSecond: T | null
): [T | null, T] => {
  const merged: T | null = second || first
  const addMerged: T = second != null
    ? addSecond
    : Object.assign({}, addFirst, addSecond)

  return [merged, addMerged]
}

const mergeBodiesList = <T>(
  first: T[] | null,
  second: T[] | null,
  addFirst: T[] | null,
  addSecond: T[] | null
): [T[] | null, T[]] => {
  const merged: T[] | null = second || first
  const addMerged: T[] = second != null
    ? addSecond
    : [].concat(...[addFirst, addSecond].filter(isNotNil))

  return [merged, addMerged]
}

export const mergeBodies = (first: Body, second: Body): Body => {
  const [attrs, addAttrs] = mergeBodiesObject(first.attrs, second.attrs, first.addAttrs, second.addAttrs)

  const content = second.content || first.content
  const appendContent = second.content != null
    ? second.appendContent
    : [].concat(...[first.appendContent, second.appendContent].filter(isNotNil))
  const prependContent = second.content != null
    ? second.prependContent
    : [].concat(...[second.prependContent, first.prependContent].filter(isNotNil))

  const [mix, addMix] = mergeBodiesList(first.mix, second.mix, first.addMix, second.addMix)

  const [mods, addMods] = mergeBodiesObject(first.mods, second.mods, first.addMods, second.addMods)
  const [elemMods, addElemMods] = mergeBodiesObject(first.elemMods, second.elemMods, first.addElemMods, second.addElemMods)

  const bem = second.bem != null ? second.bem : first.bem

  return ({
    tag: mergeTag(second.tag, first.tag, null),
    attrs,
    addAttrs,
    content,
    prependContent,
    appendContent,
    mix,
    addMix,
    mods,
    addMods,
    elemMods,
    addElemMods,
    bem,
    cls: second.cls || first.cls
  })
}

const renderToString = (param: HtmlParam, content: Html): Html => {
  if (param.tag === false) {
    return content
  }

  // FIXME: add escaping
  const attrs = Object.entries(param.attrs).map(([key, value]) => `${key}="${value}"`).join(' ')

  const classParam = param.cls.length === 0
    ? ''
    : ` class="${param.cls}"`

  return `<${param.tag}${classParam} ${attrs}>${content}</${param.tag}>`
}

export const compile = (register: Register): Render => {
  const templates: Template[] = []
  const block = (name: BlockName): Block => (
    new Block(name, templates)
  )

  register(block)

  // Convert entity to an array of bodies: extract mixes and find bodies
  const getBodies = (entity: BemEntity, parentBlock?: BlockName): Body[] => {
    entity = {
      ...entity,
      block: entity.block || parentBlock
    }

    return templates.filter(t => accept(t.predicate, entity)).map(t => t.body)
  }

  const render = (bemJson: BemJson, parentBlock?: BlockName): Html => {
    if (bemJson == null) {
      return ''
    }

    if (typeof bemJson === 'string') {
      return bemJson
    }

    if (Array.isArray(bemJson)) {
      return <Html>bemJson.reduce((acc, elem) => `${acc}${render(elem, parentBlock)}`, '')
    }

    const htmlParam: HtmlParam = applyBody(getBodies(bemJson, parentBlock).reduce(mergeBodies, {}), bemJson, parentBlock)
    const block = bemJson.block || parentBlock

    const content: Html = render(htmlParam.content, block)
    return renderToString(htmlParam, content)
  }

  return render
}
