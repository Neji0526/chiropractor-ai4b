import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Local files in /public are always allowed. Add the clinic's photo host here
    // (e.g. a CDN or media library) when real photography is available.
    remotePatterns: [],
  },
};

export default nextConfig;
