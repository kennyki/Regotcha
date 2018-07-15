# Coding

## Include/exclude folder during search in Atom.io

1. Ctrl/Cmd + Shift + F
1. In the 'File/directory pattern' textbox:
    - To include: enter folder path, i.e. `src`
    - To exclude: append `!` to the path, i.e. `!**/node_modules/**/*`
    - To join them for better search: use comma-separated-values `src, !**/node_modules/**/*`

## Search and replace with RegExp in Sublime Text

Let's say I want to replace occurrences of `<number>rem` in thousands of files:

```scss
margin: -1rem 24rem 12rem 20rem;
```

to be:

```scss
margin: px-to-rem(-1) px-to-rem(24) px-to-rem(12) px-to-rem(20);
````

The steps should be:
1. Ctrl/Cmd + Shift + F
1. Toggle Regular Expression on
1. In the 'Find' textbox, enter `(-?)(\w+)rem`
    - Where it will match all negative and positive values
1. In the 'Replace' textbox, enter `px-to-rem($1$2)`
    - `$1` is the value of the back-reference of first capture group: `(-?)`, where it can be either `'-'` or `''`
    - `$2` is of `(\w+)`, where it can be `'1'` or `'24'`

## Grunt or Gulp? It doesn't really matter

Not going to explain how each differs or is better as you can read about them [here](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4) and [there](http://www.hongkiat.com/blog/gulp-vs-grunt/). You may have even heard of arguments [against them altogether](https://www.keithcirkel.co.uk/why-we-should-stop-using-grunt/).

*But that's not the point*. The point is: you need a build tool. One that can simplify your development process. One that can help you [create a build in one step](http://www.joelonsoftware.com/articles/fog0000000043.html).

Just pick one that you or your team have experience with. Both can achieve what's been advertised and be awesome.

## Map IP address to custom hosts in MacOS

This is useful when an application with first level subdomain, i.e. [https://customer1.mydomain.com](https://customer1.mydomain.com) needs to be tested locally before deployment. The right way is to modify the hosts file to allow a custom mapping of IP address.

1. Open terminal
1. `sudo vi /etc/hosts`
1. Add new line `127.0.0.1 customer1.mydomain.com`
    - Note: port is not accepted
1. Save and exit
1. `sudo killall -HUP mDNSResponder`
1. Browse [http://customer1.mydomain.com](https://customer1.mydomain.com)
