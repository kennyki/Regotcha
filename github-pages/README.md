# GitHub Pages

## Add custom domain with name.com

This site was hosted on GitHub Pages and its custom domain was added thru name.com

1. Turn on GitHub Page at `https://github.com/<username>/<project>/settings`
1. Add custom domain, i.e. `www.regotcha.com` and save
    - There should be warning about errors with your hosting by now
1. Login to `https://www.name.com/account/domain/details/<domain>#dns`
1. Add apex domain with an **ANAME** record:
    1. Leave 'host' blank for wildcard
    1. Answer with `<username>.github.io`
1. Add www subdomain with a **CNAME** record:
    1. Set 'host' with 'www'
    1. Answer with `<username>.github.io`
1. Wait for few minutes, run `dig <username>.github.io +noall +answer` then `dig <apexdomain> +noall +answer`
    - Compare the results, they should be the same
1. Browse both apex domain and www subdomain, it should end up at the www subdomain (because it's set as the GitHub Pages settings) and loads the site
