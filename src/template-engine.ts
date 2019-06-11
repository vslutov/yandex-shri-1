import { BemJson, compile, Render } from './microbem'

const render: Render = compile(() => {

})

/**
 * @param  {object} obj — Структура блоков интерфейса в формате BEMJSON
 * @return {string} HTML разметка страницы
 */
export default function (obj: BemJson) {
  return render(obj)
}
