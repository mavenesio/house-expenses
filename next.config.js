const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
  
  // This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
  module.exports = phase => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    // when `next build` or `npm run build` is used
    const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
  
    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)
  
    const env = {
      BASE_URL: (() => {
        if (isDev) return 'http://localhost:3000/'
        if (isProd) return 'http://localhost:3000/'
        if (isStaging) return 'http://localhost:3000/'
        return 'BASE_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
      URI: (() => {       
        if (isDev) return 'http://localhost:4000/'
        if (isStaging) return 'https://mysterious-ocean-88588.herokuapp.com/'
        if (isProd) return 'https://whispering-hollows-31809.herokuapp.com/'
        return 'URI:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
    }
  
    // next.config.js object
    return {
      env,
    }
  }