/* global SystemJS: true */
SystemJS.config({
    map: {
        'plugin-babel': 'client-dev/js/lib/plugin-babel.js',
        'systemjs-babel-build': 'client-dev/js/lib/systemjs-babel-browser.js',
        'document-register-element': 'bower_components/document-register-element/build/document-register-element.amd.js' // used for gulp build step no slash /bower_... needed
    },
    transpiler: false,
    baseURL: './client-dev/js'
});
