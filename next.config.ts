/**
 * @fileoverview Next.js configuration for the VoteGuide application.
 * Configures security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy),
 * standalone output for Docker deployment, and Turbopack optimizations.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /** Enable React strict mode for development best practices */
  reactStrictMode: true,
  /** Configure allowed remote image domains */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://maps.gstatic.com https://maps.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://maps.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.googleapis.com https://generativelanguage.googleapis.com; frame-src 'self'; base-uri 'self'; form-action 'self';",
          }
        ],
      },
    ];
  },
};

export default nextConfig;
