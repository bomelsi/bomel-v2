import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/nosotros",
        destination: "/#nosotros",
        permanent: true,
      },
      {
        source: "/servicios",
        destination: "/#servicios",
        permanent: true,
      },
      {
        source: "/ventanas",
        destination: "/#ventanas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
