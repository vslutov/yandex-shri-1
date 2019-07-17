import { BlockCreator, Body } from '../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'informer',
      mods: {
        view: 'default',
        border: 'all'
      }
    }, {
      block: 'theme',
      mods: {
        color: 'project-warning'
      }
    }],
    content: [{
      elem: 'content'
    }, {
      elem: 'button-wrapper'
    }]
  }

  block('warning')(body)
}
