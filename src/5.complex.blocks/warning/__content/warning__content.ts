import { BlockCreator, Body, BemJson } from '../../../microbem'

const s: BemJson = {
  elem: 'word',
  elemMods: {
    width: 's'
  }
}

const m: BemJson = {
  elem: 'word',
  elemMods: {
    width: 'm'
  }
}

const l: BemJson = {
  elem: 'word',
  elemMods: {
    width: 'l'
  }
}

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'informer',
      elem: 'content',
      elemMods: {
        distribute: 'center',
        'space-a': 'xxl'
      }
    }],
    content: [{
      elem: 'placeholder',
      mix: [{
        block: 'placeholder',
        mods: {
          view: 'primary',
          size: 'm'
        }
      }]
    }, {
      block: 'text',
      mods: {
        view: 'primary',
        size: 'xl',
        align: 'center'
      },
      content: [s, l, m, m, s, m, l, s, m]
    }]
  }

  block('warning').elem('content')(body)
}
