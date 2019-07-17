import { BlockCreator, Body } from '../../../microbem'

export default (block: BlockCreator) => {
  const body: Body = {}

  block('<%= block %>').elem('<%= elem %>')(body)
}
