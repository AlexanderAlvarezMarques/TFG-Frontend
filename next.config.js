/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'src/assets/sass')
        ]
    },
    env: {
        BACKEND_URL: "http://localhost:9001"
        // BACKEND_URL: "http://192.168.1.43:9001"
    }
}

module.exports = nextConfig
