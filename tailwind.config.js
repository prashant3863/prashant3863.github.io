/*
* A tailwinds config file used to generate atomic utility css classes.
* See: https://tailwindcss.com/docs/configuration/
* Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*
* Run '$ npm run css:dev' to compile changes in this file.
*/

module.exports = {
    purge: [
        '{,!(node_modules|_site)/**/}*.{html,md}',
    ],
    theme: {
        // notshant design tokens (design/tailwind.tokens.js), namespaced as `ns-*`.
        extend: require('./design/tailwind.tokens.js'),
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
