export function formatBRLFromCents(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "USD" }).format(value);
}

export function brlCentsToUsd(cents: number, brlPerUsd: number) {
  const brl = cents / 100;
  const usd = brl / brlPerUsd;
  return Math.round(usd * 100) / 100;
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}
