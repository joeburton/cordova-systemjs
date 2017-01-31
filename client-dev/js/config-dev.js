/* global SystemJS: true */
SystemJS.config({
    map: {
        'document-register-element': '/bower_components/document-register-element/build/document-register-element.amd.js'
    }
});
// eslint-disable-next-line dot-notation
SystemJS.import('/client-dev/js/app.js')
// eslint-disable-next-line no-console
       .catch((e) => console.error(e));
