import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.resolve.alias["@core-ui"] = path.resolve(
      __dirname,
      "node_modules/core-ui/lib",
    );
    return config;
  }
};

export default nextConfig;
