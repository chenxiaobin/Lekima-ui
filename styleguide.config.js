module.exports = {
  // set your styleguidist configuration here
  title: 'Lekima-ui',
  defaultExample: true,
  components: 'src/components/[a-z]*/[a-z]*.vue',
  // components: 'src/components/[a-z]*/switch.vue',
  styleguideDir: 'dist',
  usageMode: 'expand',
  exampleMode: 'expand',
  compilerConfig: {
    target: { ie: 11 }
  },
  displayOrigins: true
}
