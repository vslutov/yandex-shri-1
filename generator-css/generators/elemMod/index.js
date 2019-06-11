const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('level', { type: String, required: true })
    this.argument('block', { type: String, required: true })
    this.argument('elem', { type: String, required: true })
    this.argument('mod', { type: String, required: true })
    this.argument('values', { type: Array, required: true })
  }

  writing () {
    const { level, block, elem, mod, values } = this.options

    const levelFolder = `${level}.blocks`

    for (let value of values) {
      const entity = `${block}__${elem}_${mod}_${value}`

      const filename = `${entity}.css`

      this.fs.copyTpl(
        this.templatePath('styles.css'),
        this.destinationPath(path.join('src', levelFolder, block, `__${elem}`, `_${mod}`, filename)),
        { entity }
      )
    }
  }
}
