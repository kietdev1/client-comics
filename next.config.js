/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./lib/i18n/index.ts');
const nextConfig = {
    env: {
        identityServer: process.env.IDENTITY_API_URL,
        portalServer: process.env.PORTAL_API_URL,
        clientServer: process.env.NEXT_BASE_URL
    }
}

module.exports = withNextIntl(nextConfig)
