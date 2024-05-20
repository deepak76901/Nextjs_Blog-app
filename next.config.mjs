/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "contenthub-static.grammarly.com",
      "firebasestorage.googleapis.com",
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
