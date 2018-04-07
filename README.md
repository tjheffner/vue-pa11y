# vue-pa11y

> vue.js display for pa11y reports

## Build Setup

``` bash
# install dependencies
npm install

# generate pa11y report [json data used by dashboard]
npm run report

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## pa11y-ci

Configuration options are set in .pa11yci. See [pa11y-ci](https://github.com/pa11y/pa11y-ci) for more information on specific options. At the very least, a list of urls to test on is needed.

```js
{ 
  urls: [
    "http://example.com",
    "htp://another-example.com",
    "http://a.third.link.io/to/test"
  ]
}
```

If your site has a sitemap, that can be passed in as an option in the package.json `report` command, e.g. `pa11y-ci --sitemap http://example.com/sitemap.xml -j > pa11y-report.json`. This will check the urls in your sitemap, __in addition to__ any links defined inside the `.pa11yci` urls array noted above.

## How to use

Fill out an array of URLs and any configuration options you need, run `npm run report` to generate the .json file used by the dashboard.
`npm run dev` to see it locally, or `npm run build` for the entire thing. A dashboard breakdown of the overall data, as well as a more comprehensive breakdown for each issue per site is generated. Happy testing!