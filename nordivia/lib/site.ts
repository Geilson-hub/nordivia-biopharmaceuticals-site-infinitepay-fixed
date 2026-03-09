export const SITE = {
  name: "Nordivia Biopharmaceuticals",
  location: "Montréal, Québec",
  founded: 1980,
};

export function getExchangeRate() {
  const v = process.env.EXCHANGE_RATE_BRL_PER_USD || "5.26";
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 5.26;
}
