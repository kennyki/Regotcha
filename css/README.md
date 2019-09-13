# CSS

::: tip
[Cascading Style Sheets](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.
:::

| Table of Contents |
|:------------------|
| [[toc]] |

## Truncate long text and replace with ellipsis/dots

```css
.text-ellipsis {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

::: tip
If you need to apply this to an inline element, e.g. `span` or `a`, add `display: inline-block;`
:::

## Safari does not support animation shorthand

Instead of:

```scss
-web-kit-animation: spin, 0.7s, linear, 0.01s, infinite, normal, none, running;
```

You must [specify all the properties individually](http://stackoverflow.com/a/17529003/940030):

```scss
-webkit-animation-name: spin;
-webkit-animation-duration: 0.7s;
-webkit-animation-timing-function: linear;
-webkit-animation-delay: 0.01s;
-webkit-animation-iteration-count: infinite;
-webkit-animation-direction: normal;
-webkit-animation-fill-mode: none;
-webkit-animation-play-state: running;
```

## YUI Compressor removes CSS animation values incorrectly

Consider the following SASS code snippet extracted from a Rails project:

```sass
.loader
  @include animation(spin 0.7s linear 0.01s infinite normal none running)

@include keyframes(spin)
  0.00%
    transform: rotate(0.01deg)
  100%
    transform: rotate(360deg)
```

You may notice that there're some weird values: `0.01s`, `0.00%`, and `0.01deg`. This is because when using the [yui-compressor gem](https://rubygems.org/gems/yui-compressor/versions/0.12.0) for minification it will strip `0s`, `0%`, and `0deg` as `0` - which is an invalid value.

This [issue](https://github.com/yui/yuicompressor/issues/80) has been reported since 2013 and no fix has been planned yet.
