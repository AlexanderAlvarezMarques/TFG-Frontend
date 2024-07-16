/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // NEXT_PUBLIC_BACKEND_URL: "http://localhost:9001",
        NEXT_PUBLIC_BACKEND_URL: "http://192.168.1.102:9001",
        NEXT_PUBLIC_DEFAULT_PAGE: "1",
        NEXT_PUBLIC_DEFAULT_ITEMS_PER_PAGE: "10"
    }
};

export default nextConfig;
