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
    desc: 'Расслабляет мышцы, формирующие мимические морщины: лоб, межбровье, «гусиные лапки». Результат&nbsp;— через 7–14&nbsp;дней, держится 4–6&nbsp;месяцев.',
    prices: [
      { label: 'Диспорт', value: 'от 150 ₽/ед' },
      { label: 'Миотокс', value: 'от 300 ₽/ед' },
      { label: 'Ксеомин', value: 'от 310 ₽/ед' },
      { label: 'Новакутан БТА', value: 'от 300 ₽/ед' },
    ],
    category: 'injection',
  },
  {
    slug: 'biorevit',
    name: 'Биоревитализация',
    badge: 'ИНЪЕКЦИИ',
    desc: 'Насыщает кожу гиалуроновой кислотой, восстанавливает увлажнённость и&nbsp;тургор.',
    prices: [
      { label: 'Jalupro 3 мл', value: 'от 7 000 ₽' },
      { label: 'Биоколлагеновый ревитализант', value: 'от 45 000 ₽' },
    ],
    category: 'injection',
  },
  {
    slug: 'kontur',
    name: 'Контурная пластика',
    badge: 'ИНЪЕКЦИИ',
    desc: 'Восстанавливает объём скул, губ, подбородка. Препараты разной плотности укладываются послойно для&nbsp;естественного 3D-эффекта.',
    prices: [
      { label: 'Белотеро 1 мл', value: 'от 22 000 ₽' },
      { label: 'Скульптра 5 мл', value: 'от 48 000 ₽' },
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
      { label: '4 пробирки', value: 'от 5 200 ₽' },
    ],
    category: 'injection',
  },

  // ── Аппаратная ─────────────────────────────────────
  {
    slug: 'co2-smartxide',
    name: 'Лазерная шлифовка CO₂ (SmartXide)',
    badge: 'АППАРАТНАЯ',
    desc: 'Обновляет кожу, выравнивает рельеф, уменьшает рубцы и&nbsp;растяжки. Аппарат SmartXide работает фракционно&nbsp;— повреждает микрозоны, здоровая ткань между ними ускоряет заживление.',
    prices: [
      { label: 'Веки (верхние или нижние)', value: '4 000–20 000 ₽' },
      { label: 'Веки + «гусиные лапки»', value: '12 000–40 000 ₽' },
      { label: 'Овал лица без зоны глаз', value: '18 000–30 000 ₽' },
      { label: 'Лицо + шея', value: '30 000–45 000 ₽' },
      { label: 'Лицо + шея + декольте', value: '40 000–65 000 ₽' },
    ],
    category: 'hardware',
  },
  {
    slug: 'heleo4',
    name: 'HELEO4',
    badge: 'АППАРАТНАЯ',
    desc: 'Аппаратная процедура для&nbsp;насыщения кожи кислородом и&nbsp;улучшения микроциркуляции.',
    prices: [
      { label: 'Лицо, 1 процедура', value: '4 000 ₽' },
      { label: 'Лицо и шея', value: '5 000 ₽' },
      { label: 'Курс 5 процедур (лицо)', value: '16 000 ₽' },
    ],
    category: 'hardware',
  },
  {
    slug: 'mikrotoki',
    name: 'Микротоки',
    badge: 'АППАРАТНАЯ',
    desc: 'Восстанавливают тонус мимических мышц и&nbsp;улучшают лимфодренаж.',
    prices: [{ label: '1 процедура', value: '2 200–3 000 ₽' }],
    category: 'hardware',
  },

  // ── Терапевтическая ────────────────────────────────
  {
    slug: 'biorepeel',
    name: 'BioRePeel',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Химический пилинг без&nbsp;шелушения, выравнивает тон и&nbsp;текстуру кожи.',
    prices: [
      { label: 'Лицо', value: '4 000 ₽' },
      { label: 'Лицо + шея + декольте', value: '6 000 ₽' },
    ],
    category: 'therapy',
  },
  {
    slug: 'atrauma-chistka',
    name: 'Атравматичная чистка',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Очищение кожи без&nbsp;механических повреждений. Подходит для&nbsp;чувствительной кожи.',
    prices: [{ label: 'Процедура', value: '3 500 ₽' }],
    category: 'therapy',
  },
  {
    slug: 'kombi-chistka',
    name: 'Комбинированная чистка',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Сочетание мануальной и&nbsp;ультразвуковой чистки для&nbsp;глубокого очищения.',
    prices: [{ label: 'Процедура', value: '4 500 ₽' }],
    category: 'therapy',
  },
  {
    slug: 'holy-land',
    name: 'Глубокое очищение (Holy Land + УЗ)',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Профессиональная чистка на&nbsp;косметике Holy Land с&nbsp;ультразвуковой обработкой.',
    prices: [{ label: 'Процедура', value: '5 000 ₽' }],
    category: 'therapy',
  },
  {
    slug: 'uhod',
    name: 'Уходовые процедуры',
    badge: 'ТЕРАПЕВТИЧЕСКАЯ',
    desc: 'Профессиональные уходы для&nbsp;лица по&nbsp;показаниям.',
    prices: [{ label: 'Процедура', value: '2 500–5 500 ₽' }],
    category: 'therapy',
  },
];
