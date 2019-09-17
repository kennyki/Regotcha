# Git

::: tip
[Git](https://en.wikipedia.org/wiki/Git) is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.
:::

| Table of Contents |
|:------------------|
| [[toc]] |

## Reset/delete unpushed git commits

This is especially useful in cases where you have pulled changes from another branch but want to revert them.

```sh
git reset --hard origin/<branch>
```
