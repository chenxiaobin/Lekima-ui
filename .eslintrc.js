module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'vue/no-side-effects-in-computed-properties': false,
        'indent': [1, 2]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        AlloyFingerVue: true
    }
}
