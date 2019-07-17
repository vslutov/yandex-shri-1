import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'informer',
      elem: 'action',
      elemMods: {
        distribute: 'center',
        'space-a': 'xl'
      }
    }],
    content: {
      block: 'button',
      mods: {
        size: 'l'
      }
    }
  }

  block('warning').elem('button-wrapper')(body)
}
