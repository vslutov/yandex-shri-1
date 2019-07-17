import { BemJson, compile, Render } from "./microbem"
import payment__header from "./5.complex.blocks/payment/__header/payment__header"
import payment from "./5.complex.blocks/payment/payment"
import payment__content from "./5.complex.blocks/payment/__content/payment__content"
import payment__footer from "./5.complex.blocks/payment/__footer/payment__footer"
import payment__row from "./5.complex.blocks/payment/__row/payment__row"
import warning from "./5.complex.blocks/warning/warning"
import warning__content from "./5.complex.blocks/warning/__content/warning__content"
import warning__buttonwrapper from "./5.complex.blocks/warning/__button-wrapper/warning__button-wrapper"
const render: Render = compile((block) => {
  payment__header(block)
  payment(block)
  payment__content(block)
  payment__footer(block)
  payment__row(block)
  warning(block)
  warning__content(block)
  warning__buttonwrapper(block)
})
export default (obj: BemJson) => render(obj)
