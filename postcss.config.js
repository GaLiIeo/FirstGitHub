module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'color-mod-function': true,
        'color-function': true
      }
    }),
    process.env.NODE_ENV === 'production' ? require('cssnano')({
      preset: 'default'
    }) : null
  ].filter(Boolean)
}; 