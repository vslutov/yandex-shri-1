import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'form',
      elem: 'item',
      elemMods: {
        distribute: 'between',
        'vertical-align': 'center'
      }
    }],
    content: [{
      block: 'form',
      elem: 'item',
      mix: [{
        elem: 'label',
        elemMods: {
          width: 'default'
        }
      }],
      content: {
        block: 'text',
        mods: {
          view: 'primary',
          size: 'l'
        },
        content: {
          elem: 'word',
          elemMods: {
            width: 'l'
          }
        }
      }
    }, {
      block: 'form',
      elem: 'item',
      mix: [{
        elem: 'control'
      }],
      content: {
        block: 'input',
        mods: {
          size: 'l'
        }
      }
    }]
  }

  block('payment').elem('row')(body)
}
