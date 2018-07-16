# VuePress

## Auto-deploy to GitHub Pages with Travis CI

The VuePress [guide](https://vuepress.vuejs.org/guide/deploy.html#github-pages) has a generic `deploy.sh` but it's not needed for [Travis](https://travis-ci.com/).

1. Create an account at [https://travis-ci.com](https://travis-ci.com)
1. Create a GitHub [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) as indicated at the [Travis-GitHub Pages guide](https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token)
1. Add the token to your Travis project settings as an environment variable named `GITHUB_TOKEN`.
    - https://travis-ci.com/*username*/*project*/settings
1. Create a file `.travis.yml` in your repo:

```yml
language: node_js
node_js:
  - "node"
install:
  - npm install -g vuepress
script:
  - vuepress build && cd .vuepress/dist && echo 'www.customdomain.com' > CNAME
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN
  on:
    branch: master
  local-dir: .vuepress/dist
```
