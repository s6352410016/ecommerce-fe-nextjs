import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    useCache: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce-bucket-belllllx.s3.ap-southeast-1.amazonaws.com",
        pathname: "/product/**",
      },
    ],
  },
};

export default nextConfig;
