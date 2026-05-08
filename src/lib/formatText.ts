export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatCurrencyHtml(value: string) {
  return value
    .replace(/(\d)\s+(?=\d)/g, '$1&nbsp;')
    .replace(/\s+₽/g, '&nbsp;₽')
    .replace(/₽\s*\/\s*/g, '₽/');
}

export function formatCurrencyPlainText(value: string) {
  return formatCurrencyHtml(escapeHtml(value));
}
