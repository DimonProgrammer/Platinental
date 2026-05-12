export type SurgicalBaseId = 'korl' | 'millenium';

export interface SurgicalBase {
  id: SurgicalBaseId;
  name: string;
  shortName: string;
  href: string;
  city: string;
  address: string;
  doctors: string;
  note: string;
}

export const surgicalBases: Record<SurgicalBaseId, SurgicalBase> = {
  korl: {
    id: 'korl',
    name: 'Клиника «Корл»',
    shortName: 'Корл',
    href: '/contacts',
    city: 'Казань',
    address: 'Казань, ул. Даурская, д. 12',
    doctors: 'Мелоян М.М., Тулатова Р.Т., Васильев М.Н.',
    note: 'Детали подготовки и даты врач подтверждает на консультации.',
  },
  millenium: {
    id: 'millenium',
    name: 'Клиника «Миллениум»',
    shortName: 'Миллениум',
    href: '/contacts',
    city: 'Казань',
    address: 'Казань, ул. Алексея Козина, д. 3',
    doctors: 'Остальные хирурги клиники.',
    note: 'Детали подготовки и даты врач подтверждает на консультации.',
  },
};

export const getSurgicalBase = (id?: SurgicalBaseId | null) =>
  id ? surgicalBases[id] : null;
