/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: ["oasis-nft-marketplace.infura-ipfs.io", ".infura-ipfs.io"],
    formats: ["image/webp"],
  },

  trailingSlash: true,
};

module.exports = nextConfig;
