import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function activityCalculation(data: CellValue[][]) {

  const colCount = data[0]?.length ?? 0;

  const debtCapital : number[] = [];     // Cudzí kapitál
  const ownCapital: number[] = [];       // Vlastný kapitál
  const assets: number[] = [];           // Aktíva
  const longTermAssets: number[] = [];   // dlhodobý majetok
  const inventory: number[] = [];        // Zásoby
  const receivables: number[] = [];      // Pohľadávky
  const shortTermLiabil: number[] = [];  // Záväzky krátkodobé
  const sales: number[] = [];            // Tržby

  for (let col = 0; col < colCount; col++) {
    debtCapital[col] = Number(data[0]?.[col]) || 0
    ownCapital[col] = Number(data[1]?.[col]) || 0;
    assets[col] = Number(data[2]?.[col]) || 0;
    longTermAssets[col] = Number(data[3]?.[col]) || 0;
    inventory[col] = Number(data[4]?.[col]) || 0;
    receivables[col] = Number(data[5]?.[col]) || 0;
    shortTermLiabil[col] = Number(data[6]?.[col]) || 0;
    sales[col] = Number(data[7]?.[col]) || 0;
  }

  // (CK) celkový kapitál = CuK+VK
  const totalCapital = debtCapital.map((d, i) =>
    formatNumber(d + ownCapital[i])
  );

  // Doba obratu celkového kapitálu
  const turnoverTotalCapital = sales.map((s, i) =>
    s !== 0 ? formatNumber(((totalCapital[i] / s) * 365).toFixed(2)) : 0
  );

  // Doba obratu dlhodobého majetku (stálych aktív)
  const turnoverFixedAssets = sales.map((s, i) =>
    s !== 0 ? formatNumber(((longTermAssets[i] / s) * 365).toFixed(2)) : 0
  );

  // Doba obratu celkových aktív
  const turnoverTotalAssets = sales.map((s, i) =>
    s !== 0 ? formatNumber(((assets[i] / s) * 365).toFixed(2)) : 0
  );

  // Celkový obrat aktív = tržby / aktíva
  const coa = assets.map((a, i) =>
    a !== 0 ? formatNumber((sales[i] / a).toFixed(2)) : 0
  );

  // Doba obratu vlastného kapitálu
  const turnoverEquity = sales.map((s, i) =>
    s !== 0 ? formatNumber(((ownCapital[i] / s) * 365).toFixed(2)) : 0
  );

  // Doba obratu zásob
  const turnoverInventory = sales.map((s, i) =>
    s !== 0 ? formatNumber(((inventory[i] / s) * 365).toFixed(2)) : 0
  );

  // Doba obratu pohľadávok
  const turnoverReceivables = sales.map((s, i) =>
    s !== 0 ? formatNumber(((receivables[i] / s) * 365).toFixed(2)) : 0
  );

  // Doba obratu záväzkov
  const turnoverPayables = sales.map((s, i) =>
    s !== 0 ? formatNumber(((shortTermLiabil[i] / s) * 365).toFixed(2)) : 0
  );



  return {
    totalCapital,
    turnoverTotalCapital,
    turnoverEquity,
    turnoverInventory,
    coa,
    turnoverReceivables,
    turnoverPayables,
    turnoverFixedAssets,
    turnoverTotalAssets,
  };
}