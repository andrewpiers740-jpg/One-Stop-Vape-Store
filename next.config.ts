import type {NextConfig} from 'next';
import redirectData from './src/data/redirects.json';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ~970 static pages are generated in parallel; on a busy machine a few exceed the default 60s and the build used to fail on the third retry.
  staticPageGenerationTimeout: 240,
  // Canonical URLs, sitemap and internal links all end in "/"; serve them that way (no redirect loops).
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    // Every image is pre-optimised WebP in /public/images (see scripts/images-*.mjs), so the runtime optimiser is not
    // needed — this also avoids Vercel's per-plan source-image quota with a 2,500-product catalogue.
    unoptimized: true,
  },
  transpilePackages: ['motion'],
  // Keyword-based URLs: old URLs 301-redirect to the new ones (src/data/redirects.json, built from scripts/build-url-map.mjs);
  // top-level static pages keep their internal route and are served at the new URL through a rewrite.
  async redirects() {
    return redirectData.redirects;
  },
  async rewrites() {
    return { beforeFiles: redirectData.rewrites, afterFiles: [], fallback: [] };
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
