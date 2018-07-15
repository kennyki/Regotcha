# SCSS

## Use color codes as map keys

```scss
$colors: (
  // invalid
  white: #FFF,
  //valid
  'black': #000
)
```

This is because [the Sass parser is telling us that white is a literal color (i.e. a Sass::Script::Value::Color)](https://github.com/brigade/scss-lint/issues/175#issuecomment-54530641) so the solution is to add quotes around the keys (as how you'd do when using Javascript keyword in object definition)

## Custom font library for Webpack and Rails

Let's say you have created a font icon library, something similar to the famous [Font Awesome](http://fontawesome.io):

```scss
// my-awesome-icons-sprockets.scss
// NOTE: this helper file is needed for Rails

@function get-ma-icons-font-path($path) {
  @return font-path($path);
}

$ma-icons-asset-helper: true;
```

```scss
// my-awesome-icons.scss
$ma-icons-asset-helper: false !default;
$ma-icons-font-path: if($ma-icons-asset-helper, 'my-awesome-icons/dist/fonts/', '../assets/fonts/') !default;

@font-face {
  font-family: "my-awesome-icons";
  font-weight: normal;
  font-style: normal;
  src:url(if($ma-icons-asset-helper, get-ma-icons-font-path('#{$ma-icons-font-path}my-awesome-icons.eot'), "#{$ma-icons-font-path}my-awesome-icons.eot"));
  // repeat for the other font style declarations
}
```

#### Use with Webpack

`npm install --save-dev sass-loader` and then:

```scss
// assume that the package assets are published at ./dist
$my-awesome-icons-font-path: '~my-awesome-icons/dist/fonts/';

@import 'my-awesome-icons';
```

#### Use with Rails

```scss
@import 'my-awesome-icons-sprockets';
@import 'my-awesome-icons';
```
