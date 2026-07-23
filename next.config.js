/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.ibb.co',
      'xzjoruazhlwmaebnqqbv.supabase.co',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
