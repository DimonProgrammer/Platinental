import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const surface = '#FFFDF8';
const ink = '#0A0A0A';

const cases = [
  {
    doctor: 'vasilev',
    items: [
      ['01', 'Васильев до:после/IMG_1728.JPG'],
      ['02', 'Васильев до:после/IMG_2455.JPG'],
      ['03', 'Васильев до:после/IMG_2456.JPG'],
      ['04', 'Васильев до:после/IMG_2786.JPG'],
      ['05', 'Васильев до:после/IMG_6847.JPG'],
    ],
  },
  {
    doctor: 'mamedov',
    items: [
      ['01', 'public/doctors/mamedov/gallery/02.jpg'],
      ['02', 'public/doctors/mamedov/gallery/05.jpg'],
      ['03', 'public/doctors/mamedov/gallery/06.jpg'],
    ],
  },
  {
    doctor: 'mardanova',
    items: [
      ['01', 'public/doctors/mardanova/gallery/01.jpg'],
      ['02', 'public/doctors/mardanova/gallery/05.jpg'],
      ['03', 'public/doctors/mardanova/gallery/09.jpg'],
    ],
  },
  {
    doctor: 'brechko',
    items: [
      ['01', 'public/doctors/brechko/gallery/01.jpg'],
      ['02', 'public/doctors/brechko/gallery/07.jpg'],
      ['03', 'public/doctors/brechko/gallery/15.jpg'],
    ],
  },
];

const labelSvg = (text) => `
  <svg width="180" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="180" height="42" rx="2" fill="${surface}" fill-opacity="0.9"/>
    <text x="22" y="27" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${ink}" letter-spacing="0.08em">${text}</text>
  </svg>
`;

async function normalizeCase(sourceRelative, outputRelative) {
  const source = path.join(root, sourceRelative);
  const output = path.join(root, outputRelative);
  const image = await sharp(source)
    .rotate()
    .resize(1600, 1000, {
      fit: 'contain',
      background: surface,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp({
    create: {
      width: 1600,
      height: 1000,
      channels: 3,
      background: surface,
    },
  })
    .composite([
      { input: image, left: 0, top: 0 },
      { input: Buffer.from(labelSvg('ДО')), left: 36, top: 36 },
      { input: Buffer.from(labelSvg('ПОСЛЕ')), left: 836, top: 36 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(output);
}

for (const group of cases) {
  for (const [index, source] of group.items) {
    await normalizeCase(source, `public/doctors/${group.doctor}/cases/${index}.jpg`);
  }
}
