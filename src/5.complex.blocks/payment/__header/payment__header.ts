import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'form',
      elem: 'item',
      elemMods: {
        'space-v': 'xxl',
        'space-h': 'xl',
        border: 'bottom'
      }
    }],
    content: {
      block: 'text',
      mods: {
        view: 'primary',
        size: 'xxl'
      },
      content: {
        elem: 'word',
        elemMods: {
          width: 'l'
        }
      }
    }
  }

  block('payment').elem('header')(body)
}
