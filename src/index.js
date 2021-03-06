const path = require('path');

module.exports = async function (moduleOptions) {

  // Add in Prismic libraries to enable preview
  if (typeof(this.options.head.__dangerouslyDisableSanitizersByTagID) === 'undefined') {
    this.options.head.__dangerouslyDisableSanitizersByTagID = {}
  }

  if (typeof(this.options.head.script) === 'undefined') {
    this.options.head.script = []
  }

  this.options.head.__dangerouslyDisableSanitizersByTagID['prismic-nuxt'] = ['innerHTML']
  this.options.head.script.push({
    hid: 'prismic-nuxt',
    innerHTML: `window.prismic = {endpoint: '${moduleOptions.endpoint}'};`,
    type: 'text/javascript'
  })

  this.options.head.script.push({ src: "//static.cdn.prismic.io/prismic.min.js" })

  // Add the plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      endpoint: moduleOptions.endpoint,
      linkResolver: moduleOptions.linkResolver
    }
  })
}

module.exports.meta = require('../package.json')
