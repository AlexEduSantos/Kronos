import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",

      },
    ],
  },
  /* config options here */
};

export default nextConfig;
