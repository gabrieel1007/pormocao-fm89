import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://diario89.com.br/**")],
  },
};

export default nextConfig;
