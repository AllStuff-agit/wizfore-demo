/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  webpack: (config, { isServer }) => {
    // 서버리스 함수에서 fs, firebase-admin 등의 모듈 사용하지 않도록 설정
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        'firebase-admin': false,
        'child_process': false,
        'net': false,
        'tls': false,
      };
    }
    return config;
  }
}

module.exports = nextConfig