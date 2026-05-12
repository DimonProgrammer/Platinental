const PHONE_PATTERN = '\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}';

const getNationalDigits = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) return digits.slice(1, 11);
  if (digits.startsWith('7')) return digits.slice(1, 11);
  return digits.slice(0, 10);
};

const formatPhone = (value: string): string => {
  const digits = getNationalDigits(value);
  if (!digits) return '+7 ';

  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ];

  let result = '+7';
  if (parts[0]) result += ` (${parts[0]}`;
  if (parts[0].length === 3) result += ')';
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;

  return result;
};

const setupPhone = (input: HTMLInputElement) => {
  if (input.dataset.phoneMaskBound === '1') return;
  input.dataset.phoneMaskBound = '1';
  input.pattern = input.pattern || PHONE_PATTERN;
  input.maxLength = 18;
  input.inputMode = 'tel';
  input.autocomplete = input.autocomplete || 'tel';

  const applyMask = () => {
    input.value = formatPhone(input.value);
    input.setSelectionRange(input.value.length, input.value.length);
  };

  input.addEventListener('focus', () => {
    if (!input.value.trim()) input.value = '+7 ';
  });
  input.addEventListener('touchstart', () => {
    if (!input.value.trim()) input.value = '+7 ';
  }, { passive: true });
  input.addEventListener('input', applyMask);
  input.addEventListener('paste', () => window.setTimeout(applyMask, 0));
  input.addEventListener('blur', () => {
    if (getNationalDigits(input.value).length === 0) input.value = '';
  });
};

const setupForms = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLInputElement>('input[type="tel"], input[data-phone-mask]').forEach(setupPhone);
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setupForms(), { once: true });
  } else {
    setupForms();
  }
  document.addEventListener('astro:page-load', () => setupForms());
}

export {};
