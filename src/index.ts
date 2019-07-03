import render from './template-engine'

import bemjson from './index.yaml'

console.log(bemjson)
document.getElementById('root').innerHTML = render(bemjson)
