import { BemJson, compile, Render } from "./microbem"
import payment__content from "./5.complex.blocks/payment/__content/payment__content"
import payment__footer from "./5.complex.blocks/payment/__footer/payment__footer"
import payment__header from "./5.complex.blocks/payment/__header/payment__header"
import payment__row from "./5.complex.blocks/payment/__row/payment__row"
import payment from "./5.complex.blocks/payment/payment"
import warning__buttonwrapper from "./5.complex.blocks/warning/__button-wrapper/warning__button-wrapper"
import warning__content from "./5.complex.blocks/warning/__content/warning__content"
import warning from "./5.complex.blocks/warning/warning"
import product from "./5.complex.blocks/product/product"
import product__content from "./5.complex.blocks/product/__content/product__content"
import product__footer from "./5.complex.blocks/product/__footer/product__footer"
import product__image from "./5.complex.blocks/product/__image/product__image"
const render: Render = compile((block) => {
  payment__content(block)
  payment__footer(block)
  payment__header(block)
  payment__row(block)
  payment(block)
  warning__buttonwrapper(block)
  warning__content(block)
  warning(block)
  product(block)
  product__content(block)
  product__footer(block)
  product__image(block)
})
export default (obj: BemJson) => render(obj)
