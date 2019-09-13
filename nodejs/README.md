# Node.js

::: tip
[Node.js](https://nodejs.org/) is a JavaScript runtime built on Chrome's V8 JavaScript engine.
:::

| Table of Contents |
|:------------------|
| [[toc]] |

## Ensure .env file exists before loading it

If you use the [dotenv package](https://github.com/motdotla/dotenv) and if there is no existing `.env` file in your deployment machine (could happen), things will fail.

It assumes that the file is there, so we have to write our code a little more carefully:

```js
const dotenvPath = 'the/path/to/dotenv';

try {
  if (require('fs').statSync(dotenvPath).isFile()) {
    require('dotenv').config({
      path: dotenvPath
    });
  }
} catch (ex) {
  console.log('.env does not exist');
}
```

## Start http-server in background

[http-server](https://github.com/indexzero/http-server) is a super convenient package if you just want to start a server locally, but if you want to use it in a PaaS, i.e. [DigitalOcean](https://www.digitalocean.com/) you'd want it to run in the background or it'll get terminated with the SSG session.

1. `npm install -g http-server`
1. `nohup http-server &` or even better, with [forever](https://github.com/foreverjs/forever) `forever start -c "http-server" ./`

## Install a private NPM module securely

::: tip
A [private module](https://docs.npmjs.com/private-modules/intro) has a `package.json` with `"private": true` property.
:::

The easiest way will expose your password:

```
npm install --save git+https://my_username:my_password@github.com/my_github_account/my_repo.git#tag
```

GitHub supports [OAuth access](https://github.com/blog/1270-easier-builds-and-deployments-using-git-over-https-and-oauth) to your own repositories, so:

1. Sign in to [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
1. Give the token a name, say 'Heroku deployment'
1. Tick only the **repo** (Full control of private repositories) scope
1. Use the generated token:

```
npm install --save git+https://<generated token>:x-oauth-basic@github.com/my_github_account/my_repo.git#tag
```

## The correct way to bump package version

1. Commit all changes
1. Run `npm version minor` (can be `major` or `patch` too)
    - Both *package.json* and *package-lock.json* will be updated
    - Read more on [semantic versioning (semver)](https://docs.npmjs.com/getting-started/semantic-versioning) on which version to bump
1. Run `git push --tags`
