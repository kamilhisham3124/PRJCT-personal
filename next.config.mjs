/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config, { webpack }) => {
    // Exclude .context directory from webpack bundling (BND-04 build-time pipeline boundary)
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /[\\/]\.context[\\/]/,
      })
    );
    return config;
  },
};

export default nextConfig;
