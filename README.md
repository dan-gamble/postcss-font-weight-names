# PostCSS Font Weight Names [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.svg">

[PostCSS] plugin to convert commonly used font-weight names i.e. `Thin`, `Semi Bold`, `Heavy`, etc.. to a numeric font-weight

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dan-gamble/postcss-font-weight-names.svg
[ci]:      https://travis-ci.org/dan-gamble/postcss-font-weight-names

#### Before
```css
.font-weight {
  font-weight: Semi Bold;
}
```

#### After
```css
.font-weight {
  font-weight: 600;
}
```

#### Font weight name mappings
| Name                     | Weight        |
| ------------------------ |:-------------:|
| Thin, Hairline           | 100           |
| Extra Light, Ultra Light | 200           |
| Light                    | 300           |
| Normal, Regular          | 400           |
| Medium                   | 500           |
| Semi Bold, Demi Bold     | 600           |
| Bold                     | 700           |
| Extra Bold, Ultra Bold   | 800           |
| Black, Heavy             | 900           |

You can use any of the following ways to write the names: `Semi Bold`, `semi bold`, `semi-bold`, `semi_bold`.

#### Usage

```js
postcss([ require('postcss-font-weight-names') ])
```

See [PostCSS] docs for examples for your environment.
