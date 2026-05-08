import type { APIRoute } from 'astro';

const site = 'https://kzn.platinental.ru';

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /concept/',
      '',
      `Sitemap: ${site}/sitemap.xml`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
