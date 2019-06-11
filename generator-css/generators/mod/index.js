const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('level', { type: String, required: true })
    this.argument('block', { type: String, required: true })
    this.argument('mod', { type: String, required: true })
    this.argument('values', { type: String, required: true })
  }

  writing () {
    const { level, block, mod, values } = this.options

    const levelFolder = `${level}.blocks`

    for (let value of values) {
      const entity = `${block}_${mod}_${value}`

      const filename = `${entity}.css`

      this.fs.copyTpl(
        this.templatePath('styles.css'),
        this.destinationPath(path.join('src', levelFolder, block, `_${mod}`, filename)),
        { entity }
      )
    }
  }
}
