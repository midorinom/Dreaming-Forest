/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2idi2lftnnpejlee.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
