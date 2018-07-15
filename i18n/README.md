# I18n

::: tip
I18N is an abbreviation of [InternationalizatioN](http://whatis.techtarget.com/definition/internationalization-I18N)
:::

## Use GetText instead of key-value for string annotations

In general there are 2 way to annotate strings for translations:

#### With keys

```html
<label>{{ $t('customer.register.form.label.fullname') }}</label>
```

As supported by [vue-i18n](http://kazupon.github.io/vue-i18n/guide/started.html#html).

#### With GetText

```html
<label v-translate>Enter your full name</label>
```

As supported by [vue-gettext](https://github.com/Polyconseil/vue-gettext)

You can see that **GetText** is obviously a better and more concise way to annotate strings, because:

1. It's painful to "make up" keys
1. It's not trivial to search for text in code with keys
1. Difficult to know if all keys are really being used in the application

## Future proof GetText translation interpolation

Let's say we have a list that display users' activity including their full name, i.e.

1. Kenny has commented on your pull request
1. Denny has committed his code
1. Penny has approved Kenny's pull request
1. ...

With Vue.js and feeding from an API, the GetText annotation will look like:

```html
<ol v-for='activity in activityFeed'>
  <li v-translate>{{ activity.user.full_name }} has {{ activity.action }}</li>
</ol>
```

When there's a new requirement to display detailed action, which is expressed thru a different property `activity.detailed_action`. The interpolation will become:

```html
<li v-translate>{{ activity.user.full_name }} has {{ activity.detailed_action }}</li>
```

You get a new entry in the translation PO file, which is not ideal as the translation process will restart: extract, upload, translate, download, compile, deploy.

#### Solution

Encapsulate the variables and give them names that are resistant to changes. For example, [vue-gettext](https://github.com/Polyconseil/vue-gettext) supports custom parameters:

```
<li v-translate='{userName: activity.user.full_name, doneAction: activity.detailed_action}'>{{ userName }} has {{ doneAction }}</li>
```
