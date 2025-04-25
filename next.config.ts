import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://diario89.com.br/**"),
      new URL("http://10.64.0.61:9002/fm-diario/**"),
    ],
  },
};

export default nextConfig;
