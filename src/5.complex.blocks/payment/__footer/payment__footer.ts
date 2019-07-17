import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'form',
      elem: 'item',
      elemMods: {
        distribute: 'between',
        border: 'bottom',
        'vertical-align': 'center',
        'space-v': 'l',
        'space-h': 'xl'
      }
    }],
    content: [{
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
    }, {
      block: 'button',
      mods: {
        size: 'l'
      }
    }]
  }

  block('payment').elem('footer')(body)
}
