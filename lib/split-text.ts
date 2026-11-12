export function splitText(text: string, locale: string): string[] {
  if (!/[\u0E00-\u0E7F]/.test(text)) return text.match(/\s+|\S+/gu) ?? [];
  return Array.from(new Intl.Segmenter(locale, { granularity: "word" }).segment(text), (part) => part.segment);
}

