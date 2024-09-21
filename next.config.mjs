// next.config.mjs
// import pkg from './next-i18next.config.js';
// const { i18n } = pkg;
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_HOST_NAME, 'via.placeholder.com',             // Allow placeholder images
        ],
    },

};

export default withNextIntl(nextConfig);
