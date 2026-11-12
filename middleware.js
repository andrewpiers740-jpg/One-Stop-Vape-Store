import { NextResponse } from 'next/server';

/**
 * Markdown negotiation (agents): serve the llms.txt summary at "/" only when the client
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

export function middleware(request) {
  const accept = request.headers.get('accept') || '';
  if (request.nextUrl.pathname === '/' && prefersMarkdownOverHtml(accept)) {
    return NextResponse.rewrite(new URL('/llms.txt', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
