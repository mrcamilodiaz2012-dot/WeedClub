/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-map-gl', 'mapbox-gl'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'thykccupdhesjylazfck.supabase.co',
      }
    ],
  },
};

export default nextConfig;
