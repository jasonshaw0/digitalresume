export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Serve static assets from the configured directory
    const response = await env.ASSETS.fetch(request);

    // If asset not found, optionally fall back to index.html for SPA-like routing
    if (response && response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    // Only fallback to index.html for GET navigation requests
    if (request.method === 'GET' && !url.pathname.startsWith('/assets/')) {
      return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
    }

    return new Response('Not found', { status: 404 });
  },
};


