import { BlockCreator, Body } from '../../../microbem'

/* FIXME: change theme */
export default (block: BlockCreator) => {
  const body: Body = {
    addMix: [{
      block: 'theme',
      mods: {
        color: 'project-inverse'
      }
    }, {
      block: 'image'
    }]
  }

  block('product').elem('image')(body)
}
