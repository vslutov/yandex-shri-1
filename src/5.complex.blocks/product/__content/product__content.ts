import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'card',
      elem: 'content',
      elemMods: {
        'space-a': 'm'
      }
    }],
    content: [{
      elem: 'image'
    }]
  }

  block('product').elem('content')(body)
}
