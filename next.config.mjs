import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nordivia-biopharmaceuticals-site-infinitepay-fixed',
  output: 'export',
};

export default withNextIntl(nextConfig);
