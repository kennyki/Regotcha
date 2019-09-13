# TestCafe

| Table of Contents |
|:------------------|
| [[toc]] |

::: tip
This is referring to the end-to-end testing tool at [https://devexpress.github.io/testcafe](https://devexpress.github.io/testcafe)
:::

## Increase page load timeout for slow loading page

The default is just [3 seconds](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#--page-load-timeout-ms) - which is often insufficient when testing against local/staging environments where the assets are not optimized, plus TestCafe is requesting the page afresh on every load.

```sh
testcafe chrome tests --page-load-timeout 30000 --selector-timeout 10000 --assertion-timeout 10000
```

## Workaround for DOMException error on clicking button

There are instances that `await t.click(Selector('button'))` will result in an odd DOMException error, where it's not replicable outside the test run.

Following this [thread](https://testcafe-discuss.devexpress.com/t/click-throw-out-object-domexception-in-chrome/590) there's a workaround:

```sh
testcafe chrome tests --skip-js-errors
```
