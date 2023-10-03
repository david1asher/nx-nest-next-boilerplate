//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const rewrites = async () => {
  return [
    {
      source: '/resorces/',
      destination: 'http://localhost:3000/api/resorces/',
    },
    {
      // test
      source: '/api/greeting',
      destination: 'http://localhost:3000/api/greeting',
    },
  ];
};

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: rewrites,
  env: {
    BASE_URL: 'http://localhost:4200',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
