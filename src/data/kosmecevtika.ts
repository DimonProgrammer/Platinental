// Источник: прайс-лист клиента Excel, лист «Косметика», апрель 2026
// ТОЛЬКО реальные позиции из официального прайса — ничего не выдумывать

export interface Brand {
  slug: string;
  name: string;
  country: string;
  tagline: string;
}

export interface Category {
  key: string;
  label: string;
  shortLabel?: string;
  description: string;
}

export interface Product {
  slug: string;
  brand: string;
  name: string;
  volume: string;
  benefit: string;
  price: string;
  category: string;
  badge?: 'new' | 'best' | 'rx';
  tone: 'cream' | 'blush' | 'sage' | 'stone' | 'champagne' | 'ink';
}

export const brands: Brand[] = [
  { slug: 'anubis', name: 'ANUBIS', country: 'Испания', tagline: 'Космецевтика для ухода за кожей' },
  { slug: 'ultraceuticals', name: 'Ultraceuticals', country: 'Австралия', tagline: 'Средства для ухода за кожей' },
  { slug: 'heliocare', name: 'HELIOCARE', country: 'Испания', tagline: 'Средства SPF-защиты' },
  { slug: 'careju', name: 'CAREJU', country: '', tagline: 'Средства для ухода за кожей' },
];

export const categories: Category[] = [
  {
    key: 'face',
    label: 'Уход за лицом',
    shortLabel: 'Лицо',
    description: 'Кремы, сыворотки и гели с активными ингредиентами — увлажнение, регенерация, выравнивание тона.',
  },
  {
    key: 'post',
    label: 'Постпроцедурный уход',
    shortLabel: 'Постуход',
    description: 'Восстановление после инъекций, лазера и пилингов — интенсивное увлажнение и успокоение кожи.',
  },
  {
    key: 'spf',
    label: 'Солнцезащита',
    shortLabel: 'SPF',
    description: 'SPF-защита для периода после процедур, операций и активного ухода.',
  },
];

export const products: Product[] = [
  // ANUBIS — face
  {
    slug: 'anubis-best-cream',
    brand: 'anubis',
    name: 'Best Cream',
    volume: '50 мл',
    benefit: 'Регенерирующий крем — восстанавливает барьерную функцию, питает и смягчает кожу.',
    price: '5 199 ₽',
    category: 'face',
    badge: 'best',
    tone: 'champagne',
  },
  {
    slug: 'anubis-total-hydrating-bigel',
    brand: 'anubis',
    name: 'Total Hydrating Bi-Gel',
    volume: '50 мл',
    benefit: 'Гель двойного действия — абсолютное увлажнение. Мгновенный и пролонгированный эффект.',
    price: '6 299 ₽',
    category: 'face',
    tone: 'cream',
  },
  {
    slug: 'anubis-total-hydrating-serum',
    brand: 'anubis',
    name: 'Total Hydrating Serum',
    volume: '30 мл',
    benefit: 'Сыворотка абсолютного увлажнения — концентрированный уход для обезвоженной кожи.',
    price: '6 899 ₽',
    category: 'face',
    tone: 'blush',
  },
  {
    slug: 'anubis-hydroelastin',
    brand: 'anubis',
    name: 'Универсальный крем Гидроэластин',
    volume: '50 мл',
    benefit: 'Универсальный крем с повышенным увлажнением и упругостью — подходит для любого типа кожи.',
    price: '5 099 ₽',
    category: 'face',
    tone: 'sage',
  },
  {
    slug: 'anubis-new-even-cleansing-gel',
    brand: 'anubis',
    name: 'New Even Cleansing Gel',
    volume: '250 мл',
    benefit: 'Очищающий гель с AHA-кислотами — мягко отшелушивает, выравнивает тон и готовит кожу к уходу.',
    price: '3 799 ₽',
    category: 'face',
    tone: 'stone',
  },

  // Ultraceuticals — face & post
  {
    slug: 'ultra-b2-hydration-serum',
    brand: 'ultraceuticals',
    name: 'Ultra B2 Hydrating Serum',
    volume: '30 мл',
    benefit: 'Увлажняющая сыворотка с витамином B₂ — восстанавливает уровень влажности и укрепляет кожный барьер.',
    price: '8 000 ₽',
    category: 'face',
    badge: 'best',
    tone: 'champagne',
  },
  {
    slug: 'ultra-b2-hydration-mask',
    brand: 'ultraceuticals',
    name: 'Ultra B2 Hydration Mask',
    volume: '',
    benefit: 'Увлажняющая маска с витамином B₂ — интенсивный уход после процедур и в период реабилитации.',
    price: '2 200 ₽',
    category: 'post',
    tone: 'cream',
  },
  {
    slug: 'ultra-energising-mask',
    brand: 'ultraceuticals',
    name: 'Energising Mask',
    volume: '75 мл',
    benefit: 'Энергетическая маска — восстанавливает сияние, питает и тонизирует уставшую кожу.',
    price: '8 400 ₽',
    category: 'post',
    tone: 'blush',
  },
  {
    slug: 'ultra-moisturising-cream',
    brand: 'ultraceuticals',
    name: 'Ultra Moisturising Cream',
    volume: '75 мл',
    benefit: 'Увлажняющий крем с церамидами — восстанавливает липидный барьер и удерживает влагу.',
    price: '7 200 ₽',
    category: 'face',
    tone: 'stone',
  },

  // HELIOCARE — spf
  {
    slug: 'heliocare-360-md-ak-fluid',
    brand: 'heliocare',
    name: '360° MD AK Fluid Sunscreen 100+',
    volume: '50 мл',
    benefit: 'Медицинский флюид с максимальной защитой SPF 100+ — для чувствительной кожи после процедур.',
    price: '4 200 ₽',
    category: 'spf',
    badge: 'best',
    tone: 'champagne',
  },

  // CAREJU — face
  {
    slug: 'careju-vitacare-bs-plus',
    brand: 'careju',
    name: 'Vitacare Bs Plus Edition',
    volume: '100 мл',
    benefit: 'Профессиональный крем — питание и восстановление кожи.',
    price: '5 950 ₽',
    category: 'face',
    tone: 'cream',
  },
];

export const badgeLabels: Record<NonNullable<Product['badge']>, string> = {
  new: 'Новинка',
  best: 'Хит',
  rx: 'По рецепту',
};
