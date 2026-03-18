import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/external/:path*",
        destination: "https://gmx-ai-api.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
