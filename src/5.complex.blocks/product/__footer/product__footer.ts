import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'card',
      elem: 'footer',
      elemMods: {
        'space-a': 'm'
      }
    }],
    content: [{
      block: 'text',
      mix: [{
        block: 'product',
        elem: 'label'
      }],
      mods: {
        view: 'primary',
        size: 'm'
      },
      content: {
        elem: 'word',
        elemMods: {
          width: 'l'
        }
      }
    }, {
      block: 'text',
      mods: {
        view: 'primary',
        size: 's'
      },
      content: {
        elem: 'word',
        elemMods: {
          width: 'm'
        }
      }
    }]
  }

  block('product').elem('footer')(body)
}
