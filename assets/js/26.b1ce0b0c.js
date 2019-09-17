(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{224:function(t,e,a){"use strict";a.r(e);var s=a(0),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vuepress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuepress","aria-hidden":"true"}},[t._v("#")]),t._v(" VuePress")]),t._v(" "),a("div",{staticClass:"tip custom-block"},[a("p",[a("a",{attrs:{href:"https://github.com/vuejs/vuepress",target:"_blank",rel:"noopener noreferrer"}},[t._v("VuePress"),a("OutboundLink")],1),t._v(" is a minimalistic Vue-powered static site generator")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("Table of Contents")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#auto-deploy-to-github-pages-with-travis-ci"}},[t._v("Auto-deploy to GitHub Pages with Travis CI")])])])])])])])]),t._v(" "),a("h2",{attrs:{id:"auto-deploy-to-github-pages-with-travis-ci"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#auto-deploy-to-github-pages-with-travis-ci","aria-hidden":"true"}},[t._v("#")]),t._v(" Auto-deploy to GitHub Pages with Travis CI")]),t._v(" "),a("p",[t._v("The VuePress "),a("a",{attrs:{href:"https://vuepress.vuejs.org/guide/deploy.html#github-pages",target:"_blank",rel:"noopener noreferrer"}},[t._v("guide"),a("OutboundLink")],1),t._v(" has a generic "),a("code",[t._v("deploy.sh")]),t._v(" but it's not needed for "),a("a",{attrs:{href:"https://travis-ci.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Travis"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("ol",[a("li",[t._v("Create an account at "),a("a",{attrs:{href:"https://travis-ci.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://travis-ci.com"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("Create a GitHub "),a("a",{attrs:{href:"https://help.github.com/articles/creating-an-access-token-for-command-line-use/",target:"_blank",rel:"noopener noreferrer"}},[t._v("personal access token"),a("OutboundLink")],1),t._v(" as indicated at the "),a("a",{attrs:{href:"https://docs.travis-ci.com/user/deployment/pages/#Setting-the-GitHub-token",target:"_blank",rel:"noopener noreferrer"}},[t._v("Travis-GitHub Pages guide"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("Add the token to your Travis project settings as an environment variable named "),a("code",[t._v("GITHUB_TOKEN")]),t._v(".\n"),a("ul",[a("li",[t._v("https://travis-ci.com/"),a("em",[t._v("username")]),t._v("/"),a("em",[t._v("project")]),t._v("/settings")])])]),t._v(" "),a("li",[t._v("Create a file "),a("code",[t._v(".travis.yml")]),t._v(" in your repo:")])]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("language")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" node_js\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("node_js")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"node"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("install")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" npm install "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("g vuepress\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" vuepress build && cd .vuepress/dist && echo 'www.customdomain.com' "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")]),t._v(" CNAME\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("deploy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("provider")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" pages\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("skip-cleanup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("github-token")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $GITHUB_TOKEN\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("branch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" master\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("local-dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" .vuepress/dist\n")])])])])}),[],!1,null,null,null);e.default=r.exports}}]);