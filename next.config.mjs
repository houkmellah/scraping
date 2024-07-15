/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          net: false,
          tls: false,
          fs: false,
          child_process: false,
          http2: false,
          dns: false,
          tty: false,
          module: false,
          readline: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;