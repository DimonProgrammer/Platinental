// Процедуры косметологии — источник: wireframes/kosmetologiya.html

export interface KosmProc {
  slug: string;
  name: string;
  badge: string;
  desc: string;
  prices: Array<{ label: string; value: string }>;
  category: 'injection' | 'hardware' | 'therapy';
}

export const kosmProcs: KosmProc[] = [
  // ── Инъекционная ───────────────────────────────────
  {
    slug: 'botulotoxin',
    name: 'Ботулотоксин',
    badge: 'ИНЪЕКЦИИ',
    desc: 'Расслабляет мышцы, формирующие мимические морщины: лоб, межбровье, «гусиные лапки». Результат — через 7–14 дней, держится 4–6 месяцев.',
    prices: [
      { label: 'Диспорт', value: 'от 150 ₽/ед' },
      { label: 'Миотокс', value: 'от 300 ₽/ед' },
      { label: 'Ксеомин', value: 'от 310 ₽/ед' },
      { label: 'Новакутан БТА', value: 'от 300 ₽/ед' },
      { label: 'Подмышечные впадины, 300 ед', value: 'от 30 000 ₽' },
    ],
    category: 'injection',
  },
  {
    slug: 'biorevit',
    name: 'Биоревитализация',
    badge: 'ИНЪЕКЦИИ',
    desc: 'Насыщает кожу гиалуроновой кислотой, восстанавливает увлажнённость и тургор.',
    prices: [
      { label: 'BELLARTI Hydrate 1 мл', value: 'от 10 000 ₽' },
      { label: 'Novacutan SBio / YBio 2 мл', value: 'от 17 000 ₽' },
      { label: 'PROFHILO 2 мл', value: 'от 24 000 ₽' },
      { label: 'Коллост 15% 1,5 мл', value: 'от 20 000 ₽' },
    ],
    category: 'injection',
  },
  {
    slug: 'kontur',
    name: 'Контурная пластика',
    badge: 'ИНЪЕКЦИИ',
    desc: 'Восстанавливает объём скул, губ, подбородка. Препараты разной плотности укладываются послойно для естественного 3D-эффекта.',
    prices: [
      { label: 'Belotero Balance / Intens / Soft / Volume 1 мл', value: 'от 22 000 ₽' },
      { label: 'Belotero Lips 0.6 мл', value: 'от 15 000 ₽' },
      { label: 'Radiesse 1,5 мл', value: 'от 25 000 ₽' },
      { label: 'Sculptra 5 мл', value: 'от 48 000 ₽' },
    ],
    category: 'injection',
  },
  {
    slug: 'prp',
    name: 'Плазмотерапия (PRP)',
    badge: 'ИНЪЕКЦИИ',
    desc: 'Стимулирует регенерацию кожи собственной плазмой крови пациента.',
    prices: [
      { label: '1 пробирка', value: 'от 1 600 ₽' },
      { label: '2 пробирки', value: 'от 3 000 ₽' },
      { label: '3 пробирки', value: 'от 4 200 ₽' },
      { label: '4 пробирки', value: 'от 5 200 ₽' },
    ],
    category: 'injection',
  },

  // ── Аппаратная ─────────────────────────────────────
  {
    slug: 'co2-smartxide',
    name: 'CO₂-лазер SmartXide DOT',
    badge: 'АППАРАТНАЯ',
    desc: 'Работает с рельефом кожи, постакне, рубцами и растяжками. SmartXide DOT действует фракционно: врач заранее объясняет подготовку и восстановление.',
    prices: [
      { label: 'Верхние веки', value: 'от 4 000 ₽' },
      { label: 'Нижние веки', value: 'от 6 000 ₽' },
      { label: 'Веки + «гусиные лапки»', value: 'от 12 000 ₽' },
      { label: 'Овал лица без зоны глаз', value: 'от 18 000 ₽' },
      { label: 'Лицо + шея', value: 'от 30 000 ₽' },
      { label: 'Лицо + шея + декольте', value: 'от 40 000 ₽' },
    ],
    category: 'hardware',
  },
  {
    slug: 'heleo4',
    name: 'HELEO4',
    badge: 'АППАРАТНАЯ',
    desc: 'Аппаратная процедура для ухода за качеством кожи и поддержки восстановления.',
    prices: [
      { label: 'Лицо, 1 процедура', value: 'от 4 000 ₽' },
      { label: 'Лицо и шея', value: 'от 5 000 ₽' },
      { label: 'Жёлтый свет без активатора', value: 'от 1 500 ₽' },
      { label: 'Курс 5 процедур (лицо)', value: 'от 16 000 ₽' },
    ],
    category: 'hardware',
  },
  {
    slug: 'mikrotoki',
    name: 'Микротоки',
    badge: 'АППАРАТНАЯ',
    desc: 'Поддерживают тонус тканей и лимфодренаж, в том числе в восстановительном уходе.',
    prices: [
      { label: 'После операции в клинике', value: 'от 2 200 ₽' },
      { label: 'После операции в другой клинике', value: 'от 3 000 ₽' },
      { label: 'Курс 5 процедур', value: 'от 5 500 ₽' },
    ],
    category: 'hardware',
  },

  // ── Терапевтическая ────────────────────────────────
  {
    slug: 'biorepeel',
    name: 'BioRePeel',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Химический пилинг без шелушения, выравнивает тон и текстуру кожи.',
    prices: [
      { label: 'Лицо', value: 'от 4 000 ₽' },
      { label: 'PRX-T33 WIQO', value: 'от 5 500 ₽' },
      { label: 'Жёлтый ретиноловый', value: 'от 4 500 ₽' },
    ],
    category: 'therapy',
  },
  {
    slug: 'atrauma-chistka',
    name: 'Атравматичная чистка',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Очищение кожи без механических повреждений. Подходит для чувствительной кожи.',
    prices: [{ label: 'Ультразвуковая чистка лица и шеи', value: 'от 5 000 ₽' }],
    category: 'therapy',
  },
  {
    slug: 'kombi-chistka',
    name: 'Комбинированная чистка',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Сочетание мануальной и ультразвуковой чистки для глубокого очищения.',
    prices: [{ label: 'Процедура', value: 'от 4 500 ₽' }],
    category: 'therapy',
  },
  {
    slug: 'holy-land',
    name: 'Глубокое очищение (Holy Land + УЗ)',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Профессиональная чистка на косметике Holy Land с ультразвуковой обработкой.',
    prices: [{ label: 'Процедура', value: 'от 5 000 ₽' }],
    category: 'therapy',
  },
  {
    slug: 'uhod',
    name: 'Уходовые процедуры',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Профессиональные уходы для очищения, увлажнения и поддержки качества кожи.',
    prices: [
      { label: 'Green Tea', value: 'от 4 000 ₽' },
      { label: 'Обновление', value: 'от 5 500 ₽' },
      { label: 'Сияние кожи', value: 'от 4 000 ₽' },
      { label: 'Благородная роскошь', value: 'от 5 000 ₽' },
    ],
    category: 'therapy',
  },
];
