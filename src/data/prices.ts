// Прайс-лист клиники The Platinental Казань — источник: wireframes/prices.html
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
    { key: 'primary', label: 'Первичная консультация', width: '15%', align: 'right' },
    { key: 'repeat', label: 'Повторная консультация', width: '15%', align: 'right' },
    { key: 'online', label: 'Онлайн-консультация', width: '15%', align: 'right' },
  ],
  rows: [
    { service: 'Мелоян М.М.', sub: ' — эстетическая и реконструктивная хирургия', code: 'B01.057.003/004', primary: '7 000 ₽', repeat: '5 000 ₽', online: '4 000 ₽' },
    { service: 'Тулатова Р.Т.', sub: ' — хирургия лица и век', code: 'B01.057.003/004', primary: '7 000 ₽', repeat: '5 000 ₽', online: '4 000 ₽' },
    { service: 'Васильев М.Н.', sub: ' — хирургия лица и тела', code: 'B01.057.003/004', primary: '7 000 ₽', repeat: '5 000 ₽', online: '4 000 ₽' },
    { service: 'Мамедов В.А.', sub: ' — челюстно-лицевой хирург', code: 'B01.057.003/004', primary: '10 000 ₽', repeat: '7 000 ₽', online: '5 000 ₽' },
    { service: 'Марданова Д.М.', sub: ' — ринопластика и блефаропластика', code: 'B01.057.003/004', primary: '5 000 ₽', repeat: '2 500 ₽', online: '3 500 ₽' },
    { service: 'Бречко М.А.', sub: ' — хирургия лица', code: 'B01.057.003/004', primary: '5 000 ₽', repeat: '2 500 ₽', online: '3 500 ₽' },
    { service: 'Сорвин В.А.', sub: ' — челюстно-лицевой хирург', code: 'B01.057.003', primary: '10 000 ₽', repeat: '10 000 ₽', online: '10 000 ₽' },
    { service: 'Грицай О.А.', sub: ' — врач-косметолог', code: 'B01.008.003/004', primary: '2 000 ₽', repeat: '700 ₽', online: '—' },
  ],
};

// ── Пластика лица ────────────────────────────────────
const face: PriceGroup[] = [
  {
    title: 'Блефаропластика',
    rows: [
      { service: 'Удаление грыжи верхнего/нижнего века', code: 'A16.26.111', price: 'от 100 000 ₽' },
      { service: 'Блефаропластика «ПИНЧ»-метод', code: 'A16.26.111', price: 'от 100 000 ₽' },
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
      { service: 'Ультразвуковая ринопластика', code: 'A16.08.008', price: 'от 353 000 ₽' },
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
      { service: 'Круговая подтяжка лица и шеи (SMAS)', code: 'A16.07.022', price: 'от 405 000 ₽' },
      { service: 'Подтяжка нижней трети (2-я кат.)', code: 'A16.07.022', price: 'от 400 000 ₽' },
      { service: 'Лифтинг верхней трети', code: 'A16.25.024', price: 'от 260 000 ₽' },
      { service: 'Темпоропластика', code: 'A16.25.024', price: 'от 250 000 ₽' },
      { service: 'Гармонизация нижней трети', code: 'A16.25.024', price: 'от 370 000 ₽' },
      { service: 'Подтяжка висков', code: 'A16.07.022', price: 'от 250 000 ₽' },
      { service: 'Подтяжка бровей', code: 'A16.07.022', price: 'от 135 000 ₽' },
      { service: 'Голливудская платизмопластика (шея)', code: 'A16.07.022', price: 'от 355 000 ₽' },
    ],
  },
  {
    title: 'Прочие операции на лице',
    rows: [
      { service: 'Удаление комков Биша (1-я кат.)', code: 'A16.07.022', price: 'от 189 000 ₽' },
      { service: 'Удаление комков Биша (2-я кат.)', code: 'A16.07.022', price: 'от 189 000 ₽' },
      { service: 'Отопластика', code: 'A16.07.022', price: 'от 126 000 ₽' },
      { service: 'Пластика мочек уха', code: 'A16.07.022', price: 'от 78 000 ₽' },
      { service: 'Ментопластика (имплант)', code: 'A16.07.022', price: 'от 420 000 ₽' },
      { service: 'Булхорн (1-я кат.)', code: 'A16.07.022', price: 'от 105 000 ₽' },
      { service: 'Кантопластика', code: 'A16.07.022', price: 'от 189 000 ₽' },
      { service: 'Удаление гидрогеля из губ', code: 'A16.07.022', price: 'от 200 000 ₽' },
    ],
  },
];

// ── Пластика тела ────────────────────────────────────
const body: PriceGroup[] = [
  {
    title: 'Маммопластика',
    rows: [
      { service: 'Увеличение груди (1-я кат.)', code: 'A16.20.086', price: 'от 572 000 ₽' },
      { service: 'Увеличение груди (2-я кат.)', code: 'A16.21.027', price: 'от 572 000 ₽' },
      { service: 'Аугментация + подтяжка (1-я кат.)', code: 'A16.20.086', price: 'от 525 000 ₽' },
      { service: 'Аугментация + подтяжка (2-я кат.)', code: 'A16.20.086', price: 'от 660 000 ₽' },
      { service: 'Мастопексия T-доступ с имплантом (1-я кат.)', code: 'A16.20.085', price: 'от 450 000 ₽' },
      { service: 'Мамморедукция с подтяжкой (1-я кат.)', code: 'A16.20.085', price: 'от 480 000 ₽' },
      { service: 'Ареолярная подтяжка', code: 'A16.20.085', price: 'от 250 000 ₽' },
      { service: 'Гинекомастия', code: 'A16.07.022', price: 'от 150 000 ₽' },
      { service: 'Удаление имплантов', code: 'A16.30.026', price: 'от 250 000 ₽' },
      { service: 'Пластика ареолы (уменьшение)', code: 'A16.20.085', price: 'от 210 000 ₽' },
    ],
  },
  {
    title: 'Абдоминопластика и тело',
    rows: [
      { service: 'Миниабдоминопластика (1-я кат.)', code: 'A16.01.034', price: 'от 250 000 ₽' },
      { service: 'Миниабдоминопластика (2-я кат.)', code: 'A16.01.034', price: 'от 350 000 ₽' },
      { service: 'Абдоминопластика (3-я кат.)', code: 'A16.01.034', price: 'от 262 000 ₽' },
      { service: 'Брахиопластика (пластика рук)', code: 'A16.01.034', price: 'от 180 000 ₽' },
      { service: 'Глютеопластика', code: 'A16.01.034', price: 'от 350 000 ₽' },
      { service: 'Боди лифтинг (бёдра, ягодицы)', code: 'A16.01.034', price: 'от 220 000 ₽' },
      { service: 'Лабиопластика', code: 'A16.08.010', price: 'от 100 000 ₽' },
    ],
  },
  {
    title: 'Липосакция и липофилинг',
    rows: [
      { service: 'Липосакция (1-я кат.)', code: 'A16.26.111', price: 'от 57 000 ₽' },
      { service: 'Липосакция (2-я кат.)', code: 'A16.26.111', price: 'от 120 000 ₽' },
      { service: 'Липосакция передней брюшной стенки', code: 'A16.26.111', price: 'от 160 000 ₽' },
      { service: 'Липосакция бёдер', code: 'A16.26.111', price: 'от 180 000 ₽' },
      { service: 'Липосакция подбородка', code: 'A16.26.111', price: 'от 55 000 ₽' },
      { service: 'Липофилинг 1 зона', code: 'A16.25.024', price: 'от 57 000 ₽' },
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
    title: 'Лазерная шлифовка CO₂ (SmartXide DOT) — косметология',
    rows: [
      { service: 'Век + «гусиные лапки»', code: 'A22.01.002', price: 'от 12 000 ₽' },
      { service: 'Верхние веки', code: 'A22.01.002', price: 'от 4 000 ₽' },
      { service: '«Гусиные лапки»', code: 'A22.01.002', price: 'от 6 000 ₽' },
      { service: 'Нижние веки', code: 'A22.01.002', price: 'от 6 000 ₽' },
      { service: 'Лоб', code: 'A22.01.002', price: 'от 10 000 ₽' },
      { service: 'Нос', code: 'A22.01.002', price: 'от 6 000 ₽' },
      { service: 'Носогубный треугольник', code: 'A22.01.002', price: 'от 13 000 ₽' },
      { service: 'Щёки', code: 'A22.01.002', price: 'от 14 000 ₽' },
      { service: 'Овал лица без глаз', code: 'A22.01.002', price: 'от 18 000 ₽' },
      { service: 'Шея', code: 'A22.01.002', price: 'от 20 000 ₽' },
      { service: 'Декольте', code: 'A22.01.002', price: 'от 20 000 ₽' },
      { service: 'Лицо + шея', code: 'A22.01.002', price: 'от 30 000 ₽' },
      { service: 'Лицо + шея + декольте', code: 'A22.01.002', price: 'от 40 000 ₽' },
      { service: 'Кисти рук', code: 'A22.01.002', price: 'от 20 000 ₽' },
      { service: 'Шлифовка рубцов 5–15 см', code: 'A22.01.002', price: 'от 8 000 ₽' },
      { service: 'Шлифовка рубцов 15–35 см', code: 'A22.01.002', price: 'от 16 000 ₽' },
      { service: 'Шлифовка растяжек — живот', code: 'A22.01.002', price: 'от 15 000 ₽' },
      { service: 'Шлифовка растяжек — бедро', code: 'A22.01.002', price: 'от 18 000 ₽' },
    ],
  },
  {
    title: 'Лазерная шлифовка CO₂ (SmartXide DOT) — пластические хирурги',
    rows: [
      { service: 'Век + «гусиные лапки» (ПХ)', code: 'A22.01.002', price: 'от 40 000 ₽' },
      { service: 'Верхние веки (ПХ)', code: 'A22.01.002', price: 'от 20 000 ₽' },
      { service: '«Гусиные лапки» (ПХ)', code: 'A22.01.002', price: 'от 20 000 ₽' },
      { service: 'Нижние веки (ПХ)', code: 'A22.01.002', price: 'от 20 000 ₽' },
      { service: 'Носогубный треугольник (ПХ)', code: 'A22.01.002', price: 'от 25 000 ₽' },
      { service: 'Щёки (ПХ)', code: 'A22.01.002', price: 'от 25 000 ₽' },
      { service: 'Овал лица без глаз (ПХ)', code: 'A22.01.002', price: 'от 30 000 ₽' },
      { service: 'Шея (ПХ)', code: 'A22.01.002', price: 'от 35 000 ₽' },
      { service: 'Декольте (ПХ)', code: 'A22.01.002', price: 'от 40 000 ₽' },
      { service: 'Лицо + шея (ПХ)', code: 'A22.01.002', price: 'от 45 000 ₽' },
      { service: 'Лицо + шея + декольте (ПХ)', code: 'A22.01.002', price: 'от 65 000 ₽' },
      { service: 'Шлифовка рубцов 5–15 см (ПХ)', code: 'A22.01.002', price: 'от 10 000 ₽' },
      { service: 'Шлифовка рубцов 15–35 см (ПХ)', code: 'A22.01.002', price: 'от 25 000 ₽' },
    ],
  },
  {
    title: 'Физиотерапия',
    rows: [
      { service: 'HELEO4 — лицо', code: 'A20.01.005', price: 'от 4 000 ₽' },
      { service: 'HELEO4 — лицо и шея', code: 'A20.01.005', price: 'от 5 000 ₽' },
      { service: 'HELEO4 — жёлтый свет без активатора', code: 'A20.01.005', price: 'от 1 500 ₽' },
      { service: 'HELEO4 — курс 5 процедур (лицо)', code: 'A20.01.005', price: 'от 16 000 ₽' },
      { service: 'HELEO4 — курс 5 процедур (лицо и шея)', code: 'A20.01.005', price: 'от 20 000 ₽' },
      { service: 'Микротоки — лицо после операции в Platinental', code: 'A17.01.010', price: 'от 2 200 ₽' },
      { service: 'Микротоки — лицо после операции в другой клинике', code: 'A17.01.010', price: 'от 3 000 ₽' },
      { service: 'Микротоки — курс 5 процедур после операции', code: 'A17.01.010', price: 'от 5 500 ₽' },
      { service: 'Микротоки — одна зона после операции', code: 'A17.01.010', price: 'от 2 600 ₽' },
      { service: 'Микротоки — одна зона после операции в другой клинике', code: 'A17.01.010', price: 'от 4 000 ₽' },
      { service: 'Микротоки — курс 5 процедур, одна зона', code: 'A17.01.010', price: 'от 6 500 ₽' },
    ],
  },
  {
    title: 'Дерматохирургия',
    rows: [
      { service: 'Субцизия, 1 элемент', code: 'A16.01.031', price: 'от 3 000 ₽' },
    ],
  },
  {
    title: 'Аутоплазмотерапия',
    rows: [
      { service: 'Аутоплазмолифтинг, 1 пробирка', price: 'от 1 600 ₽' },
      { service: 'Аутоплазмолифтинг, 2 пробирки', price: 'от 3 000 ₽' },
      { service: 'Аутоплазмолифтинг, 3 пробирки', price: 'от 4 200 ₽' },
      { service: 'Аутоплазмолифтинг, 4 пробирки', price: 'от 5 200 ₽' },
    ],
  },
  {
    title: 'Биоревитализация',
    rows: [
      { service: 'Arion Hydro 2 мл', code: 'A11.01.003', price: 'от 15 000 ₽' },
      { service: 'BELLARTI Hydrate 1 мл', code: 'A11.01.003', price: 'от 10 000 ₽' },
      { service: 'BELLARTI Lift 1 мл', code: 'A11.01.003', price: 'от 12 000 ₽' },
      { service: 'Bellarty Lift 1.8% 2 мл', code: 'A11.01.003', price: 'от 12 000 ₽' },
      { service: 'Belotero Revive 1 мл', code: 'A16.07.022', price: 'от 15 000 ₽' },
      { service: 'MESO EYE 1 мл', code: 'A11.01.003', price: 'от 19 000 ₽' },
      { service: 'Meso-Wharton P199 1,5 мл', code: 'A11.01.003', price: 'от 19 000 ₽' },
      { service: 'Meso-Xantin F199 1,5 мл', code: 'A11.01.003', price: 'от 19 000 ₽' },
      { service: 'Mesosculpt C71 1 мл', code: 'A11.01.003', price: 'от 19 000 ₽' },
      { service: 'Neauvia Hydro Delux 2.5 мл', code: 'A11.01.003', price: 'от 11 000 ₽' },
      { service: 'Nithya 70 мг', code: 'A11.01.003', price: 'от 22 000 ₽' },
      { service: 'Novacutan SBio 2 мл', code: 'A11.01.003', price: 'от 17 000 ₽' },
      { service: 'Novacutan YBio 2 мл', code: 'A11.01.003', price: 'от 17 000 ₽' },
      { service: 'Plinest Fast 2 мл', code: 'A11.01.003', price: 'от 19 000 ₽' },
      { service: 'Plinest 2 мл', code: 'A11.01.003', price: 'от 19 000 ₽' },
      { service: 'PROFHILO 2 мл', code: 'A16.07.022', price: 'от 24 000 ₽' },
      { service: 'Repart 4 Aqua Balance 1 мл', code: 'A11.01.003', price: 'от 2 600 ₽' },
      { service: 'Repart PG 2 мл', code: 'A11.01.003', price: 'от 15 000 ₽' },
      { service: 'Аллергопроба на Коллост', code: 'A11.01.003', price: 'от 4 000 ₽' },
      { service: 'Коллост 15% 1,5 мл', code: 'A11.01.003', price: 'от 20 000 ₽' },
      { service: 'Коллост 7% 0,5 мл', code: 'A11.01.003', price: 'от 8 000 ₽' },
      { service: 'Коллост 7% 1 мл', code: 'A11.01.003', price: 'от 12 000 ₽' },
      { service: 'Коллост 7% 1,5 мл', code: 'A11.01.003', price: 'от 14 000 ₽' },
      { service: 'Коллост Микро 0,15 г', code: 'A11.01.003', price: 'от 17 500 ₽' },
      { service: 'РЕВИ EYE 1% 1 мл', code: 'A11.01.003', price: 'от 9 000 ₽' },
      { service: 'РЕВИ STRONG 1.5% 1 мл', code: 'A11.01.003', price: 'от 14 000 ₽' },
      { service: 'РЕВИ СТАИЛ 1% 1 мл', code: 'A11.01.003', price: 'от 9 000 ₽' },
    ],
  },
  {
    title: 'Ботулинотерапия',
    rows: [
      { service: 'Диспорт, 1 ед', code: 'A11.02.002', price: 'от 150 ₽/ед' },
      { service: 'Ксеомин, 1 ед', code: 'A11.02.002', price: 'от 310 ₽/ед' },
      { service: 'Миотокс, 1 ед', code: 'A11.02.002', price: 'от 300 ₽/ед' },
      { service: 'Новакутан БТА, 1 ед', code: 'A11.02.002', price: 'от 300 ₽/ед' },
      { service: 'Диспорт, подмышечные впадины 300 ед', price: 'от 30 000 ₽' },
      { service: 'Диспорт, подмышечные впадины 500 ед', price: 'от 35 000 ₽' },
    ],
  },
  {
    title: 'Контурная пластика',
    rows: [
      { service: 'Belotero Balance 1 мл', code: 'A16.07.022', price: 'от 22 000 ₽' },
      { service: 'Belotero Hydro 1 мл', code: 'A11.01.003', price: 'от 12 000 ₽' },
      { service: 'Belotero Intens 1 мл', code: 'A16.07.022', price: 'от 22 000 ₽' },
      { service: 'Belotero Lips Contour 0.6 мл', code: 'A16.07.022', price: 'от 15 000 ₽' },
      { service: 'Belotero Lips Shape 0.6 мл', code: 'A16.07.022', price: 'от 15 000 ₽' },
      { service: 'Belotero Soft 1 мл', code: 'A16.07.022', price: 'от 22 000 ₽' },
      { service: 'Belotero Volume 1 мл', code: 'A16.07.022', price: 'от 22 000 ₽' },
      { service: 'Jalupro 3 мл', code: 'A11.01.003', price: 'от 12 000 ₽' },
      { service: 'Jalupro HMW 2,5 мл', code: 'A11.01.003', price: 'от 15 000 ₽' },
      { service: 'Novacutan S-Bio/F-Bio 1 мл', code: 'A16.07.022', price: 'от 17 000 ₽' },
      { service: 'Radiesse 1,5 мл', code: 'A16.07.022', price: 'от 25 000 ₽' },
      { service: 'Radiesse 2 × 1,5 мл', code: 'A16.07.022', price: 'от 48 000 ₽' },
      { service: 'Radiesse 3 мл', code: 'A16.07.022', price: 'от 47 000 ₽' },
      { service: 'Repart PLA 10 мл', code: 'A16.07.022', price: 'от 33 000 ₽' },
      { service: 'Sculptra 5 мл', price: 'от 48 000 ₽' },
    ],
  },
  {
    title: 'Уходовые процедуры',
    rows: [
      { service: 'Очищение кожи лица и шеи (ультразвуковая чистка)', price: 'от 5 000 ₽' },
      { service: 'Уходовая процедура Green Tea', price: 'от 4 000 ₽' },
      { service: 'Уходовая процедура «Обновление»', code: 'A11.01.014', price: 'от 5 500 ₽' },
      { service: 'Уходовая процедура «Сияние кожи»', code: 'A11.01.014', price: 'от 4 000 ₽' },
      { service: 'Уходовая процедура «Благородная роскошь»', price: 'от 5 000 ₽' },
    ],
  },
  {
    title: 'Пилинг',
    rows: [
      { service: 'Жёлтый пилинг (ретиноловый)', code: 'A16.01.024', price: 'от 4 500 ₽' },
      { service: 'Пилинг BioRePeel — лицо', code: 'A16.01.024', price: 'от 4 000 ₽' },
      { service: 'Пилинг PRX-T33 WIQO', code: 'A16.01.024', price: 'от 5 500 ₽' },
      { service: 'Пилинг Джесснера', code: 'A16.01.024', price: 'от 2 500 ₽' },
      { service: 'Пилинг миндальный MCP (экспресс)', code: 'A16.01.024', price: 'от 1 500 ₽' },
      { service: 'Феруловый пилинг Medi+derma', code: 'A16.01.024', price: 'от 5 500 ₽' },
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
    doctorSlug: 'iskornev',
    doctorName: 'Искорнев А.А.',
    items: [
      { procedure: 'Deep plane SMAS-лифтинг', price: '2 000 000 ₽' },
      { procedure: 'Deep plane SMAS-лифтинг + глубокая платизмопластика', price: '2 600 000 ₽' },
      { procedure: 'Височный лифтинг', price: '850 000 ₽' },
      { procedure: 'Височный лифтинг + эндоскопия лба', price: '1 600 000 ₽' },
      { procedure: 'Верхняя блефаропластика дополнительно к операции', price: '+380 000 ₽' },
      { procedure: 'Нижняя блефаропластика дополнительно к операции', price: '+400 000 ₽' },
    ],
  },
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
      { procedure: 'Вторичная ринопластика', price: 'от 1 200 000 ₽' },
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
