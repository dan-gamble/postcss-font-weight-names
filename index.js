var postcss = require('postcss');

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

var reSpace = /\s/g;
function removeSpace(str) {
    return str.replace(reSpace, '');
}

function indexNumericKeywords(nameMap) {
    return Object.keys(nameMap)
        .reduce(function (indexAccumulator, numericKey) {
            var keywords = nameMap[numericKey];

            keywords
                .map(removeSpace)
                .forEach(function (keyword) {
                    indexAccumulator[keyword] = numericKey;
                });

            return indexAccumulator;
        }, {});
}

module.exports = postcss.plugin('postcss-font-weight-names', function () {
    var indexedNames = indexNumericKeywords(nameMapping);
    var reSeperator = /[ -_]+/;

    return function (css) {
        css.walkDecls('font-weight', function (decl) {
            var value = decl.value.toLowerCase().replace(reSeperator, '');
            // The key which will be used as the new decl value
            var matchedKey = indexedNames[value];

            if (matchedKey) {
                // Create the new font-weight value with a numeric value
                decl.cloneBefore({ prop: 'font-weight', value: matchedKey });

                // Remove the source declaration
                decl.remove();
            }
        });
    };
});
