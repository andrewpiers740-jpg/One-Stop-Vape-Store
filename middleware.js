import { NextResponse } from 'next/server';
import imageMap from './src/data/image-map.json';

// Renamed image files: old image URLs 308-redirect to the new keyword file names. Done here, not in vercel.json,
// because Vercel caps a deployment at 2,048 routes and these are 1,000+ one-to-one rules.
const IMAGE_REDIRECTS = new Map(Object.entries(imageMap));

/**
 * Markdown negotiation (agents): serve a page's Markdown version only when the client
 * genuinely prefers text/markdown over text/html. A client that sends
 * "text/html, text/markdown;q=0.9" (normal browsers/crawlers) keeps getting HTML.
 */
function prefersMarkdownOverHtml(accept) {
  let mdQ = -1;
  let htmlQ = -1;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > 0 && mdQ > htmlQ;
}

// pages with no useful Markdown version (private, transactional or not indexable)
const NO_MARKDOWN = /^\/(api|admin|_next|order|cart|checkout|account|wishlist|search|thank-you)/i;

export function middleware(request) {
  const moved = IMAGE_REDIRECTS.get(request.nextUrl.pathname);
  if (moved) return NextResponse.redirect(new URL(moved, request.url), 308);
  const accept = request.headers.get('accept') || '';
  const p = request.nextUrl.pathname;
  if (prefersMarkdownOverHtml(accept) && !NO_MARKDOWN.test(p)) {
    // any page: answer with its Markdown version (app/api/md/route.js renders it from the normal HTML)
    const headers = new Headers(request.headers);
    headers.set('x-md-path', p);
    return NextResponse.rewrite(new URL('/api/md', request.url), { request: { headers } });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/images/:path*',
    // runs only for requests whose Accept header mentions text/markdown, so normal page loads skip the middleware entirely
    { source: '/((?!_next/|api/|images/|brand/|logos/|admin|.*\\..*).*)', has: [{ type: 'header', key: 'accept', value: '.*text/markdown.*' }] },
  ],
};
