import { round2 } from "./money";

const FEES: Record<number, number> = {
  2: 0.0541,
  3: 0.0614,
  4: 0.0687,
  5: 0.0759,
  6: 0.0830,
  7: 0.0901,
  8: 0.0971,
  9: 0.1040,
  10: 0.1108,
};

export function buildInstallments(totalBRL: number) {
  const out: { n: number; perInstallment: number; total: number }[] = [];
  out.push({ n: 1, total: round2(totalBRL), perInstallment: round2(totalBRL) });

  for (let n = 2; n <= 10; n++) {
    const fee = FEES[n] ?? 0;
    const totalWithFee = totalBRL * (1 + fee);
    out.push({
      n,
      total: round2(totalWithFee),
      perInstallment: round2(totalWithFee / n),
    });
  }
  return out;
}
