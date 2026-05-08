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
    name: 'Клиника КОРЛ',
    shortName: 'КОРЛ',
    href: 'https://korl.ru/',
    city: 'Казань',
    address: 'ул. Даурская, 12',
    doctors: 'Мелоян М.М., Тулатова Р.Т., Васильев М.Н.',
    note: 'Партнёрская операционная база для части пластических операций. Консультационный маршрут и показания определяет врач The Platinental.',
  },
  millenium: {
    id: 'millenium',
    name: 'Millenium Clinic',
    shortName: 'Millenium',
    href: 'https://milleniumclinic.ru/',
    city: 'Казань',
    address: 'ул. Алексея Козина, 3',
    doctors: 'Мамедов В.А., Марданова Д.М., Бречко М.А., Сорвин В.А.',
    note: 'Партнёрская операционная база для части хирургических маршрутов. Для спорных маршрутов база уточняется после консультации.',
  },
};

export const getSurgicalBase = (id?: SurgicalBaseId | null) =>
  id ? surgicalBases[id] : null;
