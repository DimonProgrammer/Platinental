export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const NO_BREAK_SPACE = '\u00A0';

const SHORT_RU_WORDS = [
  'а',
  'в',
  'во',
  'и',
  'к',
  'ко',
  'о',
  'об',
  'обо',
  'от',
  'до',
  'за',
  'из',
  'изо',
  'на',
  'не',
  'но',
  'по',
  'под',
  'при',
  'про',
  'с',
  'со',
  'у',
  'без',
  'для',
  'или',
  'как',
] as const;

const SHORT_RU_WORD_PATTERN = SHORT_RU_WORDS.join('|');
const HTML_TAG_PATTERN = /(<[^>]+>)/g;
const HANGING_RU_WORD_PATTERN = new RegExp(
  `(^|[\\s([{«„])(${SHORT_RU_WORD_PATTERN})[ \\t]+(?=\\S)`,
  'giu',
);

function keepShortRussianWordsWithNext(value: string) {
  return value.replace(HANGING_RU_WORD_PATTERN, `$1$2${NO_BREAK_SPACE}`);
}

export function formatTypographyHtml(value: string) {
  return value
    .split(HTML_TAG_PATTERN)
    .map((part) => (part.startsWith('<') && part.endsWith('>') ? part : keepShortRussianWordsWithNext(part)))
    .join('');
}

export function formatCurrencyHtml(value: string) {
  return formatTypographyHtml(value)
    .replace(/(\d)\s+(?=\d)/g, `$1${NO_BREAK_SPACE}`)
    .replace(/\s+₽/g, `${NO_BREAK_SPACE}₽`)
    .replace(/₽\s*\/\s*/g, '₽/');
}

export function formatCurrencyPlainText(value: string) {
  return formatCurrencyHtml(escapeHtml(value));
}
