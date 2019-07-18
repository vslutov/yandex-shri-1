import { BlockCreator, Body } from '../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'card',
      mods: {
        border: 'all',
        view: 'default'
      }
    }],
    content: [{
      elem: 'content'
    }, {
      elem: 'footer'
    }]
  }

  block('product')(body)
}
