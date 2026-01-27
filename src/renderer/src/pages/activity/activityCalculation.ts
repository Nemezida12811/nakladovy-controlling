import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function activityCalculation(data: CellValue[][]) {
  console.log('Calculation input data:', data);

  const colCount = data[0]?.length ?? 0;

  const totalCapital: number[] = [];   // Celkový kapitál
  const sales: number[] = [];          // Tržby
  const ownCapital: number[] = [];     // Vlastný kapitál
  const inventory: number[] = [];      // Zásoby
  const receivables: number[] = [];    // Pohľadávky
  const payables: number[] = [];       // Záväzky
  const fixedAssets: number[] = [];    // Stále aktíva
  const totalAssets: number[] = [];    // Celkové aktíva

  for (let col = 0; col < colCount; col++) {
    totalCapital[col] = Number(data[0]?.[col]) || 0;
    sales[col] = Number(data[1]?.[col]) || 0;
    ownCapital[col] = Number(data[2]?.[col]) || 0;
    inventory[col] = Number(data[3]?.[col]) || 0;
    receivables[col] = Number(data[4]?.[col]) || 0;
    payables[col] = Number(data[5]?.[col]) || 0;
    fixedAssets[col] = Number(data[6]?.[col]) || 0;
    totalAssets[col] = Number(data[7]?.[col]) || 0;
  }

  // Doba obratu celkového kapitálu
  const turnoverTotalCapital = sales.map((s, i) =>
    s !== 0 ? formatNumber(((totalCapital[i] / s) * 360).toFixed(2)) : 0
  );

  // Doba obratu vlastného kapitálu
  const turnoverEquity = sales.map((s, i) =>
    s !== 0 ? formatNumber(((ownCapital[i] / s) * 360).toFixed(2)) : 0
  );

  // Doba obratu zásob
  const turnoverInventory = sales.map((s, i) =>
    s !== 0 ? formatNumber(((inventory[i] / s) * 360).toFixed(2)) : 0
  );

  // Doba obratu pohľadávok
  const turnoverReceivables = sales.map((s, i) =>
    s !== 0 ? formatNumber(((receivables[i] / s) * 360).toFixed(2)) : 0
  );

  // Doba obratu záväzkov
  const turnoverPayables = sales.map((s, i) =>
    s !== 0 ? formatNumber(((payables[i] / s) * 360).toFixed(2)) : 0
  );

  // Doba obratu stálych aktív
  const turnoverFixedAssets = sales.map((s, i) =>
    s !== 0 ? formatNumber(((fixedAssets[i] / s) * 360).toFixed(2)) : 0
  );

  // Doba obratu celkových aktív
  const turnoverTotalAssets = sales.map((s, i) =>
    s !== 0 ? formatNumber(((totalAssets[i] / s) * 360).toFixed(2)) : 0
  );

  console.log('Calculation results:', {
    turnoverTotalCapital, turnoverEquity, turnoverInventory, turnoverReceivables,
    turnoverPayables, turnoverFixedAssets, turnoverTotalAssets }
  );

  return {
    turnoverTotalCapital,
    turnoverEquity,
    turnoverInventory,
    turnoverReceivables,
    turnoverPayables,
    turnoverFixedAssets,
    turnoverTotalAssets,
  };
}