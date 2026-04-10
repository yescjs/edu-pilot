import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.omc/**",
          "**/.gstack/**",
          "**/.git/**",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
