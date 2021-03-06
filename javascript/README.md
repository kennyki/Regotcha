# Javascript

::: tip
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.
:::

| Table of Contents |
|:------------------|
| [[toc]] |

## Chaining rejection in promises

Consider the following code snippet:

```js
ask('who ate my cheese?').then((results) => {
  document.write(JSON.stringify(results))
}, (error) => {
  document.write(JSON.stringify(error))
})
```

where the `ask` function will log either the results or error to the console:

```js
import axios from 'axios'

function ask(question) {
  return axios.get('http://randomapi.com/', {
    params: {question}
  }).then((results) => {
    console.log(results)
    return results
  }, (error) => {
    console.error(error)
    // MUST return a rejected promise, or throw it
    return Promise.reject(error)
  })
}
```

::: tip
To chain rejection, you must return a rejected promise in the interim handler as mentioned in the [documentation](https://developers.google.com/web/fundamentals/primers/promises#javascript_exceptions_and_promises):

> Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown ...

:::

## Faster way to remove arbitrary items from an array

Let's say we want to remove all numbers multiple of 3 from an array _without creating another new array_. It is faster to **keep what we want**, rather than **removing what we don't want**:

```js
const list = [1, 2, 3, 4, ... 999]
const toKeep = list.reduce((keepList, num) => {
  if (num % 3 !== 0) {
    keepList.push(num)
  }
  return keepList
}, [])

list.splice.apply(list, [0, list.length].concat(toKeep))
```

Check the [benchmark results](https://tonicdev.com/knyki12/remove-arbitrary-array-items).

> Removal method x 849,037 ops/sec ±2.02% (82 runs sampled)
> Keeping method x 1,310,208 ops/sec ±2.07% (88 runs sampled)

## Better way to open a URL in current tab

Use `window.location.href = url` instead of `window.open(url, '_self')` as the later has a [chance to kill the browser](https://stackoverflow.com/a/23394403/940030).

## Use try..catch..finally with async/await

While there are reasons to use a Go-lang style await wrapper, i.e. [await-to-js](https://github.com/scopsy/await-to-js), I find the conventional `try..catch` approach being more straightforward, readable, and require less boilerplate code (need to declare your variables at the top of function) especially when dealing with UI, i.e. start/stop loader.

```js
async saveProfile () {
  this.startLoader()

  try {
    await Profile.save(this.profile)
  } catch (error) {
    this.showError(error)
  } finally {
    this.stopLoader()
  }
}
```
