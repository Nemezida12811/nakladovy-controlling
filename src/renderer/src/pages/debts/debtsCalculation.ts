import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function debtsCalculation(data: CellValue[][]) {

  const colCount = data[0]?.length ?? 0;

  const debtCapital: number[] = [];       // Cudzí kapitál
  const ownCapital: number[] = [];        // Vlastný kapitál
  const assets: number[] = [];            // Aktíva
  const liabilities: number[] = [];       // Záväzky
  const receivables: number[] = [];       // Pohľadávky
  const fixedAssets: number[] = [];       // Dlhodobý majetok
  const longTermLiab: number[] = [];      // Dlhodobé záväzky
  const shortTermLiab: number[] = [];     // Krátkodobé záväzky

  for (let col = 0; col < colCount; col++) {
    debtCapital[col] = Number(data[0]?.[col]) || 0;
    ownCapital[col] = Number(data[1]?.[col]) || 0;
    assets[col]  = Number(data[2]?.[col]) || 0;
    liabilities[col]    = Number(data[3]?.[col]) || 0;
    receivables[col]       = Number(data[4]?.[col]) || 0;
    fixedAssets[col] = Number(data[5]?.[col]) || 0;
    longTermLiab[col]  = Number(data[6]?.[col]) || 0;
    shortTermLiab[col]  = Number(data[7]?.[col]) || 0;
  }

  // (CK) celkový kapitál = CuK+VK
  const totalCapital = debtCapital.map((d, i) =>
    formatNumber(d + ownCapital[i])
  );

  // Stupeň samofinancovania
  const selfFinRatio = totalCapital.map((t, i) =>
    t !== 0 ? formatNumber((ownCapital[i] / t).toFixed(2)) : 0
  );

  // Stupeň zadlženosti
  const debtRatio = totalCapital.map((t, i) =>
    t !== 0 ? formatNumber((debtCapital[i] / t).toFixed(2)) : 0
  );

  // Platobná neschopnosť
  const insolvencyInd = receivables.map((rec, i) =>
    rec !== 0 ? formatNumber(((longTermLiab[i] + shortTermLiab[i])/ rec).toFixed(2)) : 0
  );

  // Krytie investičného majetku
  const fixAssetsCovRatio = fixedAssets.map((fa, i) =>
    fa !== 0 ? formatNumber((totalCapital[i] / fa).toFixed(2)) : 0
  );

  // Celková zadlženosť
  const totalDebt = assets.map((a, i) =>
    a !== 0 ? formatNumber(((longTermLiab[i] + shortTermLiab[i]) / a).toFixed(2)) : 0
  );

  // Stupeň finančnej samostatnosti
  const indepLevel = assets.map((a, i) =>
    a !== 0 ? formatNumber((ownCapital[i] / a).toFixed(2)) : 0
  );

  return {
    totalCapital,
    selfFinRatio,
    debtRatio,
    insolvencyInd,
    fixAssetsCovRatio,
    totalDebt,
    indepLevel,
  };
}
