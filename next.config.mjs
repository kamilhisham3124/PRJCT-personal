/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
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
