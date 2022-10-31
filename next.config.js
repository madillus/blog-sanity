/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}
// const withTM = require('next-transpile-modules')(['react-syntax-highlighter'])

// module.exports = withTM({})
