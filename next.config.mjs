/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_HOST_NAME], // Add your server domain (adjust if necessary)
    },
};

export default nextConfig;
