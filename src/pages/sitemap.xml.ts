import type { APIRoute } from 'astro';
import { doctors } from '../data/doctors';

const site = 'https://kzn.platinental.ru';

const staticRoutes = [
  '/',
  '/about/',
  '/contacts/',
  '/consent/',
  '/doctors/',
  '/documents/',
  '/kosmecevtika/',
  '/kosmetologiya/',
  '/plastika/',
  '/prices/',
  '/privacy/',
  '/terms/',
];
const lastmod = new Date().toISOString().slice(0, 10);

const routes = [
  ...staticRoutes,
  ...doctors.map((doctor) => `/doctors/${doctor.slug}/`),
];

const xmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = () =>
  new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.map((route) => `  <url><loc>${xmlEscape(`${site}${route}`)}</loc><lastmod>${lastmod}</lastmod></url>`),
      '</urlset>',
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  );
