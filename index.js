var postcss = require('postcss');
var _ = require('lodash');

var nameMapping = {
    100: ['thin', 'hairline'],
    200: ['extra light', 'ultra light'],
    300: ['light'],
    400: ['normal', 'regular'],
    500: ['medium'],
    600: ['semi bold', 'demi bold'],
    700: ['bold'],
    800: ['extra bold', 'ultra bold'],
    900: ['black', 'heavy']
};

module.exports = postcss.plugin('postcss-font-weight-names', function () {
    return function (css) {
        var nameMappingValues = _.values(nameMapping);
        // Flatten it so it's easier to check if it contains our prop's value
        var nameMappingValuesFlattened = _.flatten(nameMappingValues);

        css.walkDecls('font-weight', function (decl) {
            var value = _.split(decl.value.toLowerCase(), /[ -_]/).join(' ');

            if (_.includes(nameMappingValuesFlattened, value)) {
                // The key which will be used as the new decl value
                var matchedKey = null;

                Object.keys(nameMapping).forEach(function (key) {
                    if (_.includes(nameMapping[key], value)) {
                        matchedKey = key;
                    }
                });

                // Create the new font-weight value with a numeric value
                decl.cloneBefore({ prop: 'font-weight', value: matchedKey });

                // Remove the source declaration
                decl.remove();
            }
        });
    };
});
