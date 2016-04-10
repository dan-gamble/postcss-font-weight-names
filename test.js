import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('converts thin to 100', t => {
    return run(t, 'a{ font-weight: thin; }', 'a{ font-weight: 100; }');
});

test('converts hairline to 100', t => {
    return run(t, 'a{ font-weight: hairline; }', 'a{ font-weight: 100; }');
});

test('converts extra light to 200', t => {
    return run(t, 'a{ font-weight: extra light; }', 'a{ font-weight: 200; }');
});

test('converts ultra light to 200', t => {
    return run(t, 'a{ font-weight: ultra light; }', 'a{ font-weight: 200; }');
});

test('converts light to 300', t => {
    return run(t, 'a{ font-weight: light; }', 'a{ font-weight: 300; }');
});

test('converts normal to 400', t => {
    return run(t, 'a{ font-weight: normal; }', 'a{ font-weight: 400; }');
});

test('converts regular to 400', t => {
    return run(t, 'a{ font-weight: regular; }', 'a{ font-weight: 400; }');
});

test('converts medium to 500', t => {
    return run(t, 'a{ font-weight: medium; }', 'a{ font-weight: 500; }');
});

test('converts semi bold to 600', t => {
    return run(t, 'a{ font-weight: semi bold; }', 'a{ font-weight: 600; }');
});

test('converts demi bold to 600', t => {
    return run(t, 'a{ font-weight: demi bold; }', 'a{ font-weight: 600; }');
});

test('converts bold to 700', t => {
    return run(t, 'a{ font-weight: bold; }', 'a{ font-weight: 700; }');
});

test('converts extra bold to 800', t => {
    return run(t, 'a{ font-weight: extra bold; }', 'a{ font-weight: 800; }');
});

test('converts ultra bold to 800', t => {
    return run(t, 'a{ font-weight: ultra bold; }', 'a{ font-weight: 800; }');
});

test('converts black to 900', t => {
    return run(t, 'a{ font-weight: black; }', 'a{ font-weight: 900; }');
});

test('converts heavy to 900', t => {
    return run(t, 'a{ font-weight: heavy; }', 'a{ font-weight: 900; }');
});

test('checks to make sure the case doesn\'t matter', t => {
    return run(t,
        'a{ font-weight: Heavy; font-weight: Semi Bold; }',
        'a{ font-weight: 900; font-weight: 600; }'
    );
});

test('handles hyphen separators', t => {
    return run(t,
        'a{ font-weight: extra-light; font-weight: semi-bold; }',
        'a{ font-weight: 200; font-weight: 600; }'
    );
});

test('handles underscore separators', t => {
    return run(t,
        'a{ font-weight: extra_light; font-weight: semi_bold; }',
        'a{ font-weight: 200; font-weight: 600; }'
    );
});

test('handles false values', t => {
    return run(t,
        'a{ font-weight: xtra light; font-weight: boldest; }',
        'a{ font-weight: xtra light; font-weight: boldest; }'
    );
});
