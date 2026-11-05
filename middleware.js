import { NextResponse } from 'next/server';

/**
 * Middleware for Markdown Negotiation (Rule V5)
 * Allows agents to request .md versions of pages via Accept: text/markdown
 */
export function middleware(request) {
  const accept = request.headers.get('accept');
  const isMarkdownRequest = accept && accept.includes('text/markdown');
  
  if (isMarkdownRequest) {
    const url = new URL(request.url);
    // If requesting root or a specific page that has a .md counterpart
    // or we want to serve the llms.txt content for markdown requests to root
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/llms.txt', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/shop/:path*', '/blog/:path*', '/wholesale', '/faq', '/about'],
};
