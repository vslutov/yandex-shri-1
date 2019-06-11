const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('level', { type: String, required: true })
    this.argument('block', { type: String, required: true })
    this.argument('elem', { type: String, required: true })
  }

  writing () {
    const { level, block, elem } = this.options

    const levelFolder = `${level}.blocks`
    const entity = `${block}__${elem}`

    const filename = `${entity}.css`

    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath(path.join('src', levelFolder, block, `__${elem}`, filename)),
      { entity }
    )
  }
}
