import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function debtsCalculation(data: CellValue[][]) {
  console.log('Calculation input data:', data);

  const colCount = data[0]?.length ?? 0;

  const longTermLiab: number[] = [];      // Dlhodobé záväzky
  const shortTermLiab: number[] = [];     // Krátkodobé záväzky
  const totalAssets: number[] = [];       // Aktíva celkom
  const totalLiab: number[] = [];         // Cudzí kapitál
  const equity: number[] = [];            // Vlastný kapitál
  const totalCapital: number[] = [];      // Celkový kapitál
  const liabilities: number[] = [];       // Záväzky
  const receivables: number[] = [];       // Pohľadávky
  const fixedAssets: number[] = [];       // Stále aktíva

  for (let col = 0; col < colCount; col++) {
    longTermLiab[col] = Number(data[0]?.[col]) || 0;
    shortTermLiab[col] = Number(data[1]?.[col]) || 0;
    totalAssets[col]  = Number(data[2]?.[col]) || 0;
    totalLiab[col]    = Number(data[3]?.[col]) || 0;
    equity[col]       = Number(data[4]?.[col]) || 0;
    totalCapital[col] = Number(data[5]?.[col]) || 0;
    liabilities[col]  = Number(data[6]?.[col]) || 0;
    receivables[col]  = Number(data[7]?.[col]) || 0;
    fixedAssets[col]  = Number(data[8]?.[col]) || 0;
  }

  // Celková zadlženosť
  const totalDebt = totalAssets.map((assets, i) =>
    assets !== 0 ? formatNumber(((longTermLiab[i] + shortTermLiab[i]) / assets).toFixed(2)) : 0
  );

  // Stupeň finančnej samostatnosti
  const indepLevel = equity.map((eq, i) =>
    eq !== 0 ? formatNumber((totalLiab[i] / eq).toFixed(2)) : 0
  );

  // Stupeň samofinancovania
  const selfFinRatio = totalCapital.map((cap, i) =>
    cap !== 0 ? formatNumber((equity[i] / cap).toFixed(2)) : 0
  );

  // Stupeň zadlženosti
  const debtRatio = totalCapital.map((cap, i) =>
    cap !== 0 ? formatNumber((totalLiab[i] / cap).toFixed(2)) : 0
  );

  // Platobná neschopnosť
  const insolvencyInd = receivables.map((rec, i) =>
    rec !== 0 ? formatNumber((liabilities[i] / rec).toFixed(2)) : 0
  );

  // Krytie investičného majetku
  const fixAssetsCovRatio = fixedAssets.map((fa, i) =>
    fa !== 0 ? formatNumber((totalLiab[i] / fa).toFixed(2)) : 0
  );

  console.log('Calculation results:', {
    totalDebt, indepLevel, selfFinRatio, debtRatio, insolvencyInd, fixAssetsCovRatio });

  return {
    totalDebt,
    indepLevel,
    selfFinRatio,
    debtRatio,
    insolvencyInd,
    fixAssetsCovRatio
  };
}
