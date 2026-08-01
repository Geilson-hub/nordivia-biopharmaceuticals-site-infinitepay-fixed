import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isStaticExport = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  ...(isStaticExport && {
    basePath: '/nordivia-biopharmaceuticals-site-infinitepay-fixed',
    output: 'export',
  }),
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

export default withNextIntl(nextConfig);
