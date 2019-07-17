import { BlockCreator, Body } from '../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'form',
      mods: {
        border: 'all'
      }
    }],
    content: [{
      elem: 'header'
    }, {
      elem: 'content'
    }, {
      elem: 'footer'
    }]
  }

  block('payment')(body)
}
