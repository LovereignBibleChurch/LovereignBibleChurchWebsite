import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/THE-LOVEREIGN-BIBLE-CHURCH/logo/main/**",
      },
    ],
  },
};

export default nextConfig;
