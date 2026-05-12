export const legalDocuments = {
  license: {
    title: 'Лицензия на осуществление медицинской деятельности',
    label: 'Скачать выписку из лицензии',
    href: '/documents/liczenziya-vypiska.pdf',
    type: 'PDF',
    size: '373 КБ',
  },
  onlineOffer: {
    title: 'Договор-оферта на оказание услуг по проведению онлайн-консультации',
    label: 'Скачать договор-оферту',
    href: '/documents/dogovor-oferta-onlajn-usluga.docx',
    type: 'DOCX',
    size: '31 КБ',
  },
  privacy: {
    title: 'Политика в отношении обработки персональных данных',
    label: 'Скачать политику',
    href: '/documents/politika-konfidenczialnosti.pdf',
    type: 'PDF',
    size: '304 КБ',
  },
  consent: {
    title: 'Согласие на обработку персональных данных',
    label: 'Скачать согласие',
    href: '/documents/soglasie.pdf',
    type: 'PDF',
    size: '74 КБ',
  },
  onlineConsent: {
    title: 'Согласие на обработку персональных данных для онлайн-услуги',
    label: 'Скачать согласие для онлайн-услуги',
    href: '/documents/soglasie-na-obrabotku-personalnyh-dannyh-oferta-onlajn-usluga.pdf',
    type: 'PDF',
    size: '243 КБ',
  },
  taxCertificate: {
    title: 'Свидетельство о постановке на учёт в налоговом органе',
    label: 'Открыть свидетельство',
    href: '/documents/svidetelstvo-o-postanovke-na-uchet.jpeg',
    type: 'JPEG',
    size: '312 КБ',
  },
  terms: {
    title: 'Пользовательское соглашение сайта',
    label: 'Скачать пользовательское соглашение',
    href: '/documents/polzovatelskoe-soglashenie.pdf',
    type: 'PDF',
    size: '3,1 МБ',
  },
} as const;

export const documentsList = [
  legalDocuments.license,
  legalDocuments.onlineOffer,
  legalDocuments.privacy,
  legalDocuments.consent,
  legalDocuments.onlineConsent,
  legalDocuments.taxCertificate,
  legalDocuments.terms,
] as const;
