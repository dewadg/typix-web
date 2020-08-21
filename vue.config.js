const autoprefixer = require('autoprefixer')
const tailwind = require('tailwindcss')

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer,
          tailwind
        ]
      }
    }
  }
}
