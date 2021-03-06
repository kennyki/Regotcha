# macOS

::: tip
[macOS](https://en.wikipedia.org/wiki/MacOS) (previously Mac OS X and later OS X) is a series of graphical operating systems developed and marketed by Apple Inc.
:::

| Table of Contents |
|:------------------|
| [[toc]] |

## Beware of file name case sensitivity

If you're using the common *Mac OS Extended (Journaled)* file system, keep in mind that it's [case insensitive but  case preserving](https://apple.stackexchange.com/a/22304).

For example, when importing a file manually (with a tool like [Grunt](https://gruntjs.com)) **a typo mistake will work locally but fail in UNIX environment** - which is common for deployment setup.

```js
// "Croppie" should be "croppie"
"<%= settings.dir.node_modules %>/Croppie/croppie.js"
```
