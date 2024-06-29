/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["http/127.0.0.1:8000"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**"
      }
    ]
  }
};

export default nextConfig;
