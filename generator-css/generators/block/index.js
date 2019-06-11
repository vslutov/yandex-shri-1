const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('level', { type: String, required: true })
    this.argument('block', { type: String, required: true })
  }

  writing () {
    const { level, block } = this.options

    const levelFolder = `${level}.blocks`
    const entity = block

    const filename = `${entity}.css`

    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath(path.join('src', levelFolder, block, filename)),
      { entity }
    )
  }
}
