// Прайс-лист клиники Platinental Казань — источник: wireframes/prices.html
// Данные из прототипа 1-в-1.

// TODO(prices-confirm): 21.04.2026 Александра попросила перевести все цены в формат «от X ₽».
// Для токсинов допустим «от X ₽/ед» (Диспорт/Ксеомин/Новакутан/Миотокс).
// Для процедур (губы, филлеры, биоревитализация) — «от X ₽».
// Финальные «от» цены уточнить у Гульнары (инъекции) и Гузель (хирургия).

export interface PriceRow {
  service: string;
  sub?: string;
  code?: string;
  price?: string;
  primary?: string;
  repeat?: string;
  online?: string;
}

export interface PriceGroup {
  title: string;
  columns?: Array<{ key: string; label: string; width?: string; align?: 'left' | 'right' }>;
  rows: PriceRow[];
}

export interface PriceCategory {
  key: string;
  label: string;
  count: number;
  groups: PriceGroup[];
}

// ── Консультации ─────────────────────────────────────
const consultations: PriceGroup = {
  title: 'Консультации врачей',
  columns: [
    { key: 'service', label: 'Врач', width: '55%' },
    { key: 'primary', label: 'Первичная', width: '15%', align: 'right' },
    { key: 'repeat', label: 'Повторная', width: '15%', align: 'right' },
    { key: 'online', label: 'Онлайн', width: '15%', align: 'right' },
  ],
  rows: [
    { service: 'Мелоян М.М.', sub: ' — пластический хирург', code: 'B01.057.003/004', primary: '7 000 ₽', repeat: '5 000 ₽', online: '4 000 ₽' },
    { service: 'Тулатова Р.Т.', sub: ' — пластический хирург', code: 'B01.057.003/004', primary: '7 000 ₽', repeat: '5 000 ₽', online: '4 000 ₽' },
    { service: 'Васильев М.Н.', sub: ' — пластический хирург', code: 'B01.057.003/004', primary: '7 000 ₽', repeat: '5 000 ₽', online: '4 000 ₽' },
    { service: 'Мамедов В.А.', sub: ' — челюстно-лицевой хирург', code: 'B01.057.003/004', primary: '10 000 ₽', repeat: '7 000 ₽', online: '5 000 ₽' },
    { service: 'Марданова Д.М.', sub: ' — пластический хирург', code: 'B01.057.003/004', primary: '5 000 ₽', repeat: '2 500 ₽', online: '3 500 ₽' },
    { service: 'Бречко М.А.', sub: ' — пластический хирург', code: 'B01.057.003/004', primary: '5 000 ₽', repeat: '2 500 ₽', online: '3 500 ₽' },
    { service: 'Сорвин В.А.', sub: ' — челюстно-лицевой хирург', code: 'B01.057.003', primary: '10 000 ₽', repeat: '—', online: '10 000 ₽' },
    { service: 'Грицай О.А.', sub: ' — врач-косметолог', code: 'B01.008.003/004', primary: '2 000 ₽', repeat: '700 ₽', online: '—' },
  ],
};

// ── Пластика лица ────────────────────────────────────
const face: PriceGroup[] = [
  {
    title: 'Блефаропластика',
    rows: [
      { service: 'Удаление грыжи верхнего/нижнего века', code: 'A16.26.111', price: 'от 60 000 ₽' },
      { service: 'Блефаропластика «ПИНЧ»-метод', code: 'A16.26.111', price: 'от 60 000 ₽' },
      { service: 'Трансконъюнктивальная блефаропластика нижних век', code: 'A16.26.111', price: 'от 130 000 ₽' },
      { service: 'Пластика века (2-я категория сложности)', code: 'A16.26.111', price: 'от 130 000 ₽' },
      { service: 'Круговая блефаропластика с подтяжкой средней зоны', code: 'A16.26.111', price: 'от 320 000 ₽' },
      { service: 'Лазерная блефаропластика CO₂ верхних + нижних век', code: 'A22.01.002', price: 'от 40 000 ₽' },
      { service: 'Лазерная блефаропластика CO₂ (одна зона)', code: 'A22.01.002', price: 'от 20 000 ₽' },
    ],
  },
  {
    title: 'Ринопластика',
    rows: [
      { service: 'Ультразвуковая ринопластика', code: 'A16.08.008', price: 'от 300 000 ₽' },
      { service: 'Ультразвуковая риносептопластика', code: 'A16.08.008', price: 'от 350 000 ₽' },
      { service: 'Вторичная риносептопластика (1-я кат.)', code: 'A16.08.008', price: 'от 400 000 ₽' },
      { service: 'Вторичная риносептопластика (2-я кат.)', code: 'A16.08.008', price: 'от 450 000 ₽' },
      { service: 'Ринопластика Мамедов В.А.', code: 'A16.08.008', price: 'от 1 000 000 ₽' },
      { service: 'Вторичная Мамедов В.А. (1-я кат.)', code: 'A16.08.008', price: 'от 1 200 000 ₽' },
      { service: 'Вторичная Мамедов В.А. (2-я кат.)', code: 'A16.08.008', price: 'от 1 500 000 ₽' },
      { service: 'Пластика кончика носа', code: 'A16.08.008', price: 'от 200 000 ₽' },
      { service: 'Пластика колумеллы', code: 'A16.08.008', price: 'от 50 000 ₽' },
    ],
  },
  {
    title: 'Подтяжка лица',
    rows: [
      { service: 'Круговая подтяжка лица и шеи (SMAS)', code: 'A16.07.022', price: 'от 530 000 ₽' },
      { service: 'Подтяжка нижней трети (2-я кат.)', code: 'A16.07.022', price: 'от 400 000 ₽' },
      { service: 'Лифтинг верхней трети', code: 'A16.25.024', price: 'от 260 000 ₽' },
      { service: 'Темпоропластика', code: 'A16.25.024', price: 'от 320 000 ₽' },
      { service: 'Гармонизация нижней трети', code: 'A16.25.024', price: 'от 370 000 ₽' },
      { service: 'Подтяжка висков', code: 'A16.07.022', price: 'от 250 000 ₽' },
      { service: 'Подтяжка бровей', code: 'A16.07.022', price: 'от 140 000 ₽' },
      { service: 'Голливудская платизмопластика (шея)', code: 'A16.07.022', price: 'от 350 000 ₽' },
    ],
  },
  {
    title: 'Прочие операции на лице',
    rows: [
      { service: 'Удаление комков Биша (1-я кат.)', code: 'A16.07.022', price: 'от 125 000 ₽' },
      { service: 'Удаление комков Биша (2-я кат.)', code: 'A16.07.022', price: 'от 140 000 ₽' },
      { service: 'Отопластика', code: 'A16.07.022', price: 'от 120 000 ₽' },
      { service: 'Пластика мочек уха', code: 'A16.07.022', price: 'от 75 000 ₽' },
      { service: 'Ментопластика (имплант)', code: 'A16.07.022', price: 'от 350 000 ₽' },
      { service: 'Булхорн (1-я кат.)', code: 'A16.07.022', price: 'от 100 000 ₽' },
      { service: 'Кантопластика', code: 'A16.07.022', price: 'от 100 000 ₽' },
      { service: 'Удаление гидрогеля из губ', code: 'A16.07.022', price: 'от 200 000 ₽' },
    ],
  },
];

// ── Пластика тела ────────────────────────────────────
const body: PriceGroup[] = [
  {
    title: 'Маммопластика',
    rows: [
      { service: 'Увеличение груди (1-я кат.)', code: 'A16.20.086', price: 'от 450 000 ₽' },
      { service: 'Увеличение груди (2-я кат.)', code: 'A16.21.027', price: 'от 550 000 ₽' },
      { service: 'Аугментация + подтяжка (1-я кат.)', code: 'A16.20.086', price: 'от 550 000 ₽' },
      { service: 'Аугментация + подтяжка (2-я кат.)', code: 'A16.20.086', price: 'от 660 000 ₽' },
      { service: 'Мастопексия T-доступ с имплантом (1-я кат.)', code: 'A16.20.085', price: 'от 450 000 ₽' },
      { service: 'Мамморедукция с подтяжкой (1-я кат.)', code: 'A16.20.085', price: 'от 480 000 ₽' },
      { service: 'Ареолярная подтяжка', code: 'A16.20.085', price: 'от 250 000 ₽' },
      { service: 'Гинекомастия', code: 'A16.07.022', price: 'от 150 000 ₽' },
      { service: 'Удаление имплантов', code: 'A16.30.026', price: 'от 250 000 ₽' },
      { service: 'Пластика ареолы (уменьшение)', code: 'A16.20.085', price: 'от 125 000 ₽' },
    ],
  },
  {
    title: 'Абдоминопластика и тело',
    rows: [
      { service: 'Миниабдоминопластика (1-я кат.)', code: 'A16.01.034', price: 'от 250 000 ₽' },
      { service: 'Миниабдоминопластика (2-я кат.)', code: 'A16.01.034', price: 'от 350 000 ₽' },
      { service: 'Абдоминопластика (3-я кат.)', code: 'A16.01.034', price: 'от 480 000 ₽' },
      { service: 'Брахиопластика (пластика рук)', code: 'A16.01.034', price: 'от 180 000 ₽' },
      { service: 'Глютеопластика', code: 'A16.01.034', price: 'от 350 000 ₽' },
      { service: 'Боди лифтинг (бёдра, ягодицы)', code: 'A16.01.034', price: 'от 220 000 ₽' },
      { service: 'Лабиопластика', code: 'A16.08.010', price: 'от 100 000 ₽' },
    ],
  },
  {
    title: 'Липосакция и липофилинг',
    rows: [
      { service: 'Липосакция (1-я кат.)', code: 'A16.26.111', price: 'от 70 000 ₽' },
      { service: 'Липосакция (2-я кат.)', code: 'A16.26.111', price: 'от 120 000 ₽' },
      { service: 'Липосакция передней брюшной стенки', code: 'A16.26.111', price: 'от 160 000 ₽' },
      { service: 'Липосакция бёдер', code: 'A16.26.111', price: 'от 180 000 ₽' },
      { service: 'Липосакция подбородка', code: 'A16.26.111', price: 'от 55 000 ₽' },
      { service: 'Липофилинг 1 зона', code: 'A16.25.024', price: 'от 55 000 ₽' },
      { service: 'Липофилинг молочных желёз', code: 'A16.25.024', price: 'от 240 000 ₽' },
      { service: 'Липофилинг ягодиц', code: 'A16.25.024', price: 'от 290 000 ₽' },
    ],
  },
  {
    title: 'Коррекция рубцов',
    rows: [
      { service: 'Коррекция рубца до 5 см', code: 'A16.01.034', price: 'от 18 000 ₽' },
      { service: 'Коррекция рубца до 10 см', code: 'A16.01.034', price: 'от 35 000 ₽' },
      { service: 'Коррекция рубца до 20 см', code: 'A16.01.034', price: 'от 65 000 ₽' },
      { service: 'Коррекция рубца от 30 см', code: 'A16.01.034', price: 'от 120 000 ₽' },
    ],
  },
];

// ── Косметология ─────────────────────────────────────
const cosmetology: PriceGroup[] = [
  {
    title: 'Лазерная шлифовка CO₂ (SmartXide)',
    rows: [
      { service: 'Верхних/нижних век', code: 'A22.01.002', price: 'от 4 000 ₽' },
      { service: 'Век + «гусиные лапки»', code: 'A22.01.002', price: 'от 12 000 ₽' },
      { service: 'Овал лица без глаз', code: 'A22.01.002', price: 'от 18 000 ₽' },
      { service: 'Лицо + шея', code: 'A22.01.002', price: 'от 30 000 ₽' },
      { service: 'Лицо + шея + декольте', code: 'A22.01.002', price: 'от 40 000 ₽' },
      { service: 'Шлифовка рубцов (5–15 см)', code: 'A22.01.002', price: 'от 8 000 ₽' },
      { service: 'Шлифовка растяжек (живот)', code: 'A22.01.002', price: 'от 15 000 ₽' },
    ],
  },
  {
    title: 'Ботулотоксин',
    rows: [
      { service: 'Диспорт', code: 'A11.02.002', price: 'от 150 ₽/ед' },
      { service: 'Миотокс', code: 'A11.02.002', price: 'от 300 ₽/ед' },
      { service: 'Ксеомин', code: 'A11.02.002', price: 'от 310 ₽/ед' },
      { service: 'Новакутан БТА', code: 'A11.02.002', price: 'от 300 ₽/ед' },
    ],
  },
  {
    title: 'Контурная пластика',
    rows: [
      { service: 'Белотеро 1 мл', code: 'A16.07.022', price: 'от 22 000 ₽' },
      { service: 'Скульптра 5 мл', code: 'A16.07.022', price: 'от 48 000 ₽' },
      { service: 'Радиесс', code: 'A16.07.022', price: 'от 30 000 ₽' },
    ],
  },
  {
    title: 'Биоревитализация',
    rows: [
      { service: 'Jalupro 3 мл', code: 'A11.01.003', price: 'от 7 000 ₽' },
      { service: 'Биоколлагеновый ревитализант', code: 'A11.01.003', price: 'от 45 000 ₽' },
    ],
  },
  {
    title: 'Плазмотерапия (PRP)',
    rows: [
      { service: '1 пробирка', code: 'A11.01.10', price: 'от 1 600 ₽' },
      { service: '2 пробирки', code: 'A11.01.11', price: 'от 3 000 ₽' },
      { service: '4 пробирки', code: 'A11.01.13', price: 'от 5 200 ₽' },
    ],
  },
  {
    title: 'HELEO4',
    rows: [
      { service: 'Лицо, 1 процедура', code: 'A20.01.005', price: 'от 4 000 ₽' },
      { service: 'Лицо и шея', code: 'A20.01.005', price: 'от 5 000 ₽' },
      { service: 'Курс 5 процедур (лицо)', code: 'A20.01.005', price: 'от 16 000 ₽' },
    ],
  },
  {
    title: 'Микротоки',
    rows: [
      { service: '1 процедура', code: 'A17.01.010', price: 'от 2 200 ₽' },
    ],
  },
  {
    title: 'Чистки и уходы',
    rows: [
      { service: 'BioRePeel (лицо)', code: 'A16.01.024', price: 'от 4 000 ₽' },
      { service: 'BioRePeel (лицо + шея + декольте)', code: 'A16.01.024', price: 'от 6 000 ₽' },
      { service: 'Атравматичная чистка', code: 'A14.01.005', price: 'от 3 500 ₽' },
      { service: 'Комбинированная чистка', code: 'A14.01.005', price: 'от 4 500 ₽' },
      { service: 'Глубокое очищение Holy Land + УЗ', code: 'A14.01.005', price: 'от 5 000 ₽' },
      { service: 'Уходовые процедуры', code: 'A11.01.014', price: 'от 2 500 ₽' },
    ],
  },
];

// ── Прайс по врачам (из Excel клиента, апрель 2026) ──────────────────────────
export interface DoctorPriceItem {
  procedure: string;
  price: string;
}

export interface DoctorPriceSheet {
  doctorSlug: string;
  doctorName: string;
  items: DoctorPriceItem[];
}

export const doctorPriceSheets: DoctorPriceSheet[] = [
  {
    doctorSlug: 'vasilev',
    doctorName: 'Васильев М.Н.',
    items: [
      { procedure: 'Блефаропластика', price: 'от 189 000 ₽' },
      { procedure: 'Липосакция', price: 'от 105 000 ₽' },
      { procedure: 'Липофилинг', price: 'от 105 000 ₽' },
      { procedure: 'Хейлопластика (Булхорн)', price: 'от 189 000 ₽' },
      { procedure: 'Кантопексия / кантопластика', price: 'от 189 000 ₽' },
      { procedure: 'Круговая подтяжка лица и шеи (SMAS)', price: 'от 630 000 ₽' },
      { procedure: 'Отопластика', price: 'от 189 000 ₽' },
      { procedure: 'Пластика мочек уха', price: 'от 168 000 ₽' },
      { procedure: 'Платизмопластика (Голливудская шея)', price: 'от 420 000 ₽' },
      { procedure: 'Подтяжка бровей', price: 'от 189 000 ₽' },
      { procedure: 'Подтяжка висков', price: 'от 315 000 ₽' },
      { procedure: 'Удаление комков Биша', price: 'от 189 000 ₽' },
      { procedure: 'Пластика лба с бровями (эндоскопия)', price: 'от 367 000 ₽' },
      { procedure: 'Пластика подбородка имплантом', price: 'от 420 000 ₽' },
      { procedure: 'Маммопластика (с имплантом)', price: 'от 630 000 ₽' },
      { procedure: 'Маммопластика + подтяжка', price: 'от 525 000 ₽' },
      { procedure: 'Коррекция втянутого соска', price: 'от 189 000 ₽' },
      { procedure: 'Пластика ареолы (уменьшение)', price: 'от 210 000 ₽' },
      { procedure: 'Абдоминопластика', price: 'от 367 000 ₽' },
      { procedure: 'Коррекция рубца', price: 'от 31 000 ₽' },
    ],
  },
  {
    doctorSlug: 'meloyan',
    doctorName: 'Мелоян М.М.',
    items: [
      { procedure: 'Блефаропластика', price: 'от 136 000 ₽' },
      { procedure: 'Липосакция', price: 'от 57 000 ₽' },
      { procedure: 'Липофилинг', price: 'от 57 000 ₽' },
      { procedure: 'Отопластика', price: 'от 126 000 ₽' },
      { procedure: 'Пластика мочек уха', price: 'от 78 000 ₽' },
      { procedure: 'Маммопластика', price: 'от 572 000 ₽' },
      { procedure: 'Коррекция втянутого соска', price: 'от 126 000 ₽' },
      { procedure: 'Абдоминопластика', price: 'от 262 000 ₽' },
      { procedure: 'Коррекция рубца', price: 'от 31 000 ₽' },
      { procedure: 'Ультразвуковая ринопластика', price: 'от 367 000 ₽' },
    ],
  },
  {
    doctorSlug: 'tulatova',
    doctorName: 'Тулатова Р.Т.',
    items: [
      { procedure: 'Блефаропластика', price: 'от 135 000 ₽' },
      { procedure: 'Хейлопластика (Булхорн)', price: 'от 105 000 ₽' },
      { procedure: 'Круговая подтяжка лица и шеи (SMAS)', price: 'от 405 000 ₽' },
      { procedure: 'Платизмопластика (Голливудская шея)', price: 'от 355 000 ₽' },
      { procedure: 'Подтяжка бровей', price: 'от 135 000 ₽' },
      { procedure: 'Подтяжка висков', price: 'от 255 000 ₽' },
      { procedure: 'Пластика лба с бровями (эндоскопия)', price: 'от 305 000 ₽' },
    ],
  },
  {
    doctorSlug: 'brechko',
    doctorName: 'Бречко М.А.',
    items: [
      { procedure: 'Блефаропластика', price: 'от 100 000 ₽' },
      { procedure: 'Круговая подтяжка лица и шеи (SMAS)', price: 'от 600 000 ₽' },
      { procedure: 'Эндоскопический лифтинг лба', price: 'от 200 000 ₽' },
      { procedure: 'Височный лифтинг', price: 'от 250 000 ₽' },
      { procedure: 'Булхорн', price: 'от 150 000 ₽' },
      { procedure: 'Липофилинг', price: 'от 100 000 ₽' },
    ],
  },
  {
    doctorSlug: 'mardanova',
    doctorName: 'Марданова Д.М.',
    items: [
      { procedure: 'Блефаропластика', price: 'от 120 000 ₽' },
      { procedure: 'Ультразвуковая ринопластика', price: 'от 353 000 ₽' },
    ],
  },
  {
    doctorSlug: 'mamedov',
    doctorName: 'Мамедов В.А.',
    items: [
      { procedure: 'Блефаропластика', price: 'от 250 000 ₽' },
      { procedure: 'Эндоскопический лифтинг лба', price: 'от 500 000 ₽' },
      { procedure: 'Гениопластика', price: 'от 700 000 ₽' },
      { procedure: 'Ультразвуковая ринопластика', price: 'от 1 000 000 ₽' },
    ],
  },
  {
    doctorSlug: 'sorvin',
    doctorName: 'Сорвин (ЧЛХ)',
    items: [
      { procedure: 'Гениопластика', price: 'от 550 000 ₽' },
      { procedure: 'Остеотомия нижней челюсти', price: 'от 650 000 ₽' },
      { procedure: 'Остеотомия верхней челюсти', price: 'от 650 000 ₽' },
      { procedure: 'Ортогнатия', price: 'от 1 450 000 ₽' },
      { procedure: 'Снятие минипластин после ортогнатии', price: 'от 250 000 ₽' },
      { procedure: 'Снятие дистракционного аппарата', price: 'от 15 000 ₽' },
      { procedure: 'Хирургическое расширение челюсти', price: 'от 525 000 ₽' },
      { procedure: 'Резекция углов нижней челюсти', price: 'от 200 000 ₽' },
      { procedure: '3D-планирование с шаблонами/сплинтами', price: 'от 250 000 ₽' },
    ],
  },
];

export const priceCategories: PriceCategory[] = [
  { key: 'consultations', label: 'Консультации', count: 7, groups: [consultations] },
  { key: 'face', label: 'Пластика лица', count: face.length, groups: face },
  { key: 'body', label: 'Пластика тела', count: body.length, groups: body },
  { key: 'cosmetology', label: 'Косметология', count: cosmetology.length, groups: cosmetology },
];
