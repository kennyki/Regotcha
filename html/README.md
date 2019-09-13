# HTML

| Table of Contents |
|:------------------|
| [[toc]] |

## Add space between span elements

To render `Hello world`:

```html
<!-- use whitespace -->
<span>Hello</span> <span>world</span>

<!-- or newline -->
<span>Hello</span>
<span>world</span>
```

#### With Pug

If you're using [pugjs](https://pugjs.org/):
1. Use `pretty` in the [compile option](https://github.com/pugjs/pug#options)
2. Use string interpolation

```pug
span Hello
= ' '
span world
```

## Always add type attribute to buttons inside a form

```html
// Vue.js example
<form @submit.prevent='doSomething'>
  <input type='text' name='something' v-model='something'>
  <br>
  <!-- NOTE: type='button' is missing -->
  <button @click='goBack'>Cancel</button>
  <button type='submit'>Save</button>
</form>
```

When you focus on the textbox and press enter key, it will actually execute the `goBack` function instead, because the form tries to simulate a click on the *first non-button-typed* button..
