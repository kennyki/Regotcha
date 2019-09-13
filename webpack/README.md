# Webpack

| Table of Contents |
|:------------------|
| [[toc]] |

## Add custom environment variable file

When adding Firebase to a [VueJS Webpack](https://github.com/vuejs-templates/webpack) project there's a `firebase.json` being generated - which contains project properties needed for the application:

```json
{
  "apiKey": "yourApiKey",
  "authDomain": "yourProjectId.firebaseapp.com",
  "databaseURL": "https://yourDatabase.firebaseio.com",
  "storageBucket": "yourBucket.appspot.com"
}
```

Webpack has a built-in `DefinePlugin` function that does what's needed:

```js
// build/webpack.base.conf.js
var webpack = require('webpack')
var firebaseConfig = require('../firebase.json')

module.exports = {
  // add this definition block
  plugins: [
    new webpack.DefinePlugin({
      'process.firebase': JSON.stringify(firebaseConfig)
    })
  ],
};
```

```js
// src/app.vue
import firebase from 'firebase'

firebase.initializeApp(process.firebase)
```
