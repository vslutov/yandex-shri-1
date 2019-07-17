import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'form',
      elem: 'item',
      elemMods: {
        'space-v': 'xxxl',
        'space-h': 'xl',
        border: 'bottom'
      }
    }],
    content: [{
      elem: 'row',
      mix: [{
        block: 'form',
        elem: 'item',
        elemMods: {
          'indent-b': 'xl'
        }
      }]
    }, {
      elem: 'row'
    }]
  }

  block('payment').elem('content')(body)
}
