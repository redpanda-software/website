---
title: 'How to build a blog with Astro'
description: 'How this blog was created'
pubDate: 2024-12-14
heroImage: '/blog-001-hero.jpg'
slug: 'blog-with-astro'
---

This blog was put together with Astro 5.
Thanks to the amazing Astro defaults and the included Blog template, only minor adjusments were needed. The project can be found on [Github](https://github.com/redpanda-software/website).

## fly.io and caddy
We build the site, package it into a container with the webserver Caddy, and then deploy it to fly.io.

fly.io's CLI command `fly launch` detected the Astro and generated a Dockerfile with nginx. But since we already have some experience with Caddy we changed it to

```Dockerfile
# use latest caddy v2 image
FROM caddy:2

# Copy built application
RUN mkdir -p /usr/share/caddy/website
COPY dist /usr/share/caddy/website

# Copy Caddy config and validate for errors
COPY Caddyfile /etc/caddy/Caddyfile
RUN caddy validate --config /etc/caddy/Caddyfile
```

Caddyfile
```
{
	auto_https off # fly.io does handle TLS
}

:8080 {
	root * /usr/share/caddy/website
	file_server
}
```

Deploying to fly.io and registering the domain with certificate
```bash
fly launch
fly certs create redpanda.ch 
```

## Frontmatter and Custom URL
The frontmatter (YAML on top of the markdown files) has option to turn a post into draft with `draft: true` and you can customize the blog post URL with the slug option ()`slug: 'blog-with-astro'`). This allows us to use a custom filenames.

> Update: the draft option does not work anymore. [link](https://github.com/withastro/astro/issues/6400#issuecomment-1682697150) you have to implement it yourself.

## Custom Redirects
We always try to migrate the top articles between blogs, and keeping the permalinks working so that every person that has bookmarked the article can find it again.
A redirect can be manually added to `astro.config.mjs`. But since you can use code everywhere in Astro (unlike in other static content builders like Hugo) we will probably add some logic that automates this.

## Multilanguage Future
In the future we also want to translate articles into different languages, for this we will probably have to add a language to the URL and 
some JavaScript that redirects the user to the default langauge.

## Backup
Every solution that goes to production must have a backup.

## Other Things for the Future
Code Syntax Highlight is not were we want it, e.g. Dockerfile snippets are not styled.
Images are currently displayed with their full height, in the future they should have a max-height with complementing background.
The images could also be compressed and converted for different formats
