# VueJS

::: warning
This is referring to VueJS 2.x
:::

## Route guarding

[Vue Router](https://router.vuejs.org/guide/advanced/navigation-guards.html) provides 3 ways to guard your routes, but I find that `per-route` guard is more succinct and easier to maintain:

```js
// services/router-guard.js
import User from '@/services/user'

export default {
  requireGuest (to, from, next) {
    // will stop the routing
    next(!User.isAuthenticated())
  },
  requireUser (to, from, next) {
    // will login and come back
    next(User.isAuthenticated() ? true : {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
}
```

```js
// router/index.js
import RouterGuard from '@/services/router-guard'

new Router({
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: RouterGuard.requireUser
    },
    {
      path: '/login',
      component: LoginView,
      beforeEnter: RouterGuard.requireGuest
    }
  ]
})
```

## Deploy to Amazon S3 with [webpack-s3-plugin](https://github.com/MikaAK/s3-plugin-webpack)

This is assuming that the [full webpack template](https://github.com/vuejs-templates/webpack) is used to scaffold your project, and you have an existing S3 bucket.

#### Step 1: Install the plugin

```js
npm install --save-dev webpack-s3-plugin
```

#### Step 2: Configure Webpack to upload built assets

You should have this file being scaffolded: [build/webpack-prod.conf.js](https://github.com/vuejs-templates/webpack/blob/develop/template/build/webpack.prod.conf.js)

Register the plugin at the end of file:

```js
const S3Plugin = require('webpack-s3-plugin')

// ...

if (process.env.NODE_ENV !== 'testing') {
  // only deploy for production
  webpackConfig.plugins.push(new S3Plugin({
    s3Options: {/* your configurations */},
    s3UploadOptions: {
      Bucket: 'your-bucket-name',
      ContentType (fileName) {
        if (/\.js/.test(fileName)) {
          return 'application/javascript'
        } else if (/\.css/.test(fileName)) {
          return 'text/css'
        }
      },
      ContentLength (fileName, file) {
        return file.size
      }
    },
    // optional
    cloudfrontInvalidateOptions: {
      DistributionId: 'your-cf-id',
      Items: ['/*']
    }
  }))
}

module.exports = webpackConfig
```

## Vuex mutation/action payload must be an object

According to the [documentation](https://vuex.vuejs.org/guide/mutations.html#commit-with-payload), it says:

> In most cases, the payload should be an object so that it can contain multiple fields, and the recorded mutation will also be more descriptive

But it seems to be a *must*:

```js
mutations: {
  // receiver and messages are always undefined
  startConversation (state, me, receiver, messages) {}
}
```

The working solution:

```js
mutations: {
  startConversation (state, {me, receiver, messages}) {}
}
```

## Use anchor tag with `@click` to navigate programmatically

Sometimes it's needed for the styles or semantics. You must use *either* `href='#'` or `@click.prevent` to prevent browser's default page navigation:

```html
<a href='#' @click='doSomethingThenNavigate()'>Go</a>
```
