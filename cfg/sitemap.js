const sm = require('sitemap')
const fs = require('fs')

const sitemap = sm.createSitemap({
  hostname: 'https://www.kassavirtanen.fi',
  cacheTime: 600000, //600 sec (10 min) cache purge period
  urls: [
    { url: '', changefreq: 'weekly', priority: 1 },
    { url: '/hinnasto', changefreq: 'weekly', priority: 0.5 },
    { url: '/faq', changefreq: 'weekly', priority: 0.5 },
    { url: '/yrityksille', changefreq: 'weekly', priority: 0.5 },
    { url: '/yhteystiedot', changefreq: 'weekly', priority: 0.5 }
  ]
})

fs.writeFileSync('dist/sitemap.xml', sitemap.toString())