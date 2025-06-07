import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.jsdelivr.net/gh/qiyuor2/blog-image/img/**')],
  }
};

export default nextConfig;
