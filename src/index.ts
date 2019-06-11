import render from './template-engine'

const card = {
  block: 'card',
  mods: {
    border: 'all'
  },
  content: 'Hello, World!'
}

document.getElementById('root').innerHTML = render({
  block: 'theme',
  mods: {
    color: 'project-default',
    space: 'default',
    size: 'default',
    gap: 'default',
    breakpoint: 'default'
  },
  content: {
    block: 'layout',
    content: {
      block: 'layout',
      elem: 'container',
      elemMods: {
        size: 's',
        align: 'center'
      },
      content: {
        block: 'grid',
        mods: {
          'xs-columns': '3',
          's-columns': '6',
          'm-columns': '10',
          'col-gap': 'two-thirds',
          'row-gap': 'half'
        },
        content: [
          {
            block: 'card',
            mods: {
              'border': 'all'
            },
            content: [{
              block: 'card',
              elem: 'content',
              elemMods: {
                distribute: 'center',
                'vertical-align': 'center'
              },
              content: 'Bem'
            }, {
              block: 'card',
              elem: 'footer',
              elemMods: {
                distribute: 'center'
              },
              content: 'footnote'
            }],
            mix: [{
              block: 'grid',
              elem: 'fraction',
              elemMods: {
                'm-col': '5',
                'xs-col': '3'
              }
            }]
          }, card, card, card, card, card, card, card, card, card, card, card]
      }
    }
  }
})
