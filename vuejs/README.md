# VueJS

::: warning
This is referring to VueJS 2.x
:::

| Table of Contents |
|:------------------|
| [[toc]] |

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

## Display [Vuelidate](https://github.com/monterail/vuelidate) error messages only on submission

```js
import {required} from 'vuelidate/lib/validators'

Vue.component('SubscriptionForm', {
  // ...
  validations: {
    email: {required}
  },
  methods: {
    submit () {
      // $invalid is true all the time if a field fails validation
      // but we don't want to show error message yet
      if (this.$v.$invalid) {
        // so we only mark it as $dirty on submission
        this.$v.$touch()
        return
      }
      // if all fields are valid, reset the $dirty flag for later use (if any)
      this.$v.$reset()
      // proceed to submission
    }
  }
})
```

```pug
input.form-control(v-model='email', type='email')
//- $error is equivalent to $dirty && !$pending && $invalid
.text-danger(v-if='$v.email.$error') Please enter your email
```

## [Vuelidate](https://github.com/monterail/vuelidate) custom validator expects a Boolean value

```js
Vue.component('SubscriptionForm', {
  // ...
  validations: {
    email: {
      required (value) {
        // assuming a String value,
        // this will result in TypeError: Cannot read property '__isVuelidateAsyncVm' of undefined
        return value
        // so, you must convert it into a Boolean value
        return !!value
      }
    }
  },
  // ...
})
```

## Export all components in a folder

*Use case:* Assuming a Vue CLI or Webpack project with a bunch of components, e.g. app-alerts.vue, app-loader.vue in `src/components`

#### Straightforward approach: use an index.js for named exports

```js
// src/components/index.js
export { default as AppAlerts } from './app-alerts'
export { default as AppLoader } from './app-loader'
```

```js
// src/views/home.vue
import { AppAlerts, AppLoader } from '../components'
```

The *catch*: you need to add the named export manually for every component

#### Dynamic approach: use Webpack's `require.context`

```js
// src/require-all.js
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

// inspirations
// - https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
// - https://stackoverflow.com/a/39709236/940030
// - https://stackoverflow.com/a/30652110/940030
export default (contextRequire, nameCasers = [ camelCase, upperFirst ]) => {
  const items = {}

  contextRequire.keys().forEach(fileName => {
    const item = contextRequire(fileName)

    // Gets the file name regardless of folder depth
    const actualFileName = fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')

    const name = nameCasers.reduce((result, nameCaser) => nameCaser(result), actualFileName)

    // either default export or named export
    items[name] = item.default || item
  })

  return items
}
```

```js
// src/components/index.js
import requireAll from '../require-all'

export default requireAll(require.context(
  // The relative path of the folder
  '.',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match filenames
  /\.(vue|js)$/
), [ camelCase, upperFirst ])
```

```js
// src/views/home.vue
import components from '../components'

const { AppAlerts, AppLoader } = components

// or
const { AppAlerts, AppLoader } = require('../components').default
```

The *catch*: can be less-readable when importing the components in the view
