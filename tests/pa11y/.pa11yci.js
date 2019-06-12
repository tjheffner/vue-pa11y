// Put together some options to use in each test.
// See pa11y config https://github.com/pa11y/pa11y-ci#usage
module.exports = {
  standard: 'WCAG2AA',
  defaults: {
    chromeLaunchConfig: {
      // this is needed to run in docker
      args: ["--no-sandbox"],
      ignoreHTTPSErrors: false
    },
    includeWarnings: true,
    includeNotices: true,
    concurrency: 2,
    timeout: 100000,
    wait: 2000,
  },
  urls: [
    'http://pa11y.org',
    'http://google.com/',
    'http://github.org/',
  ],
};
