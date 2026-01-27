import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function profitabilityCalculation(data: CellValue[][]) {
  console.log('Calculation input data:', data);

  const colCount = data[0]?.length ?? 0;

  const netProfit: number[] = [];    // zisk
  const percent: number[] = [];      // úrok
  const sales: number[] = [];        // tržby
  const assets: number[] = [];       // aktíva
  const passive: number[] = [];      // pasiva
  const capital: number[] = [];      // vlastný kapitál
  const costs: number[] = [];        // náklady
  const netIncome: number[] = [];    // hospodársky výsledok po zdanení

  for (let col = 0; col < colCount; col++) {
    netProfit[col] = Number(data[0]?.[col]) || 0;
    percent[col]   = Number(data[1]?.[col]) || 0;
    sales[col]     = Number(data[2]?.[col]) || 0;
    assets[col]    = Number(data[3]?.[col]) || 0;
    passive[col]   = Number(data[4]?.[col]) || 0;
    capital[col]   = Number(data[5]?.[col]) || 0;
    costs[col]     = Number(data[6]?.[col]) || 0;
    netIncome[col] = Number(data[7]?.[col]) || 0;
  }

  // ROI = (zisk + úrok) / tržby
  const roi = sales.map((s, i) =>
    s !== 0 ? formatNumber(((netProfit[i] + percent[i]) / s).toFixed(2)) : 0
  );

  // ROA = zisk / aktíva
  const roa = assets.map((a, i) =>
    a !== 0 ? formatNumber((netProfit[i] / a).toFixed(2)) : 0
  );

  // ROE = zisk / vlastný kapitál
  const roe = capital.map((c, i) =>
    c !== 0 ? formatNumber((netProfit[i] / c).toFixed(2)) : 0
  );

  // Rentabilita výnosov = zisk / výnosy
  const rvy = sales.map((s, i) =>
    s !== 0 ? formatNumber((netProfit[i] / s).toFixed(2)) : 0
  );

  // Rentabilita nákladov = zisk / náklady
  const rnk = costs.map((c, i) =>
    c !== 0 ? formatNumber((netIncome[i] / c).toFixed(2)) : 0
  );

  // Rentabilita celkového kapitálu = zisk / (aktíva)
  const rck = passive.map((a, i) =>
    a !== 0 ? formatNumber((netIncome[i] / a).toFixed(2)) : 0
  );

  // Rentabilita vlastného kapitálu = zisk / vlastný kapitál
  const rvk = capital.map((c, i) =>
    c !== 0 ? formatNumber((netIncome[i] / c).toFixed(2)) : 0
  );

  // Rentabilita tržieb = zisk / tržby
  const rt = sales.map((s, i) =>
    s !== 0 ? formatNumber((netIncome[i] / s).toFixed(2)) : 0
  );


  console.log('Calculation results:', { roi, roa, roe, rvy, rnk, rck, rvk, rt });

  return {
    roi: roi,
    roa: roa,
    roe: roe,
    rvy: rvy,
    rnk: rnk,
    rck: rck,
    rvk: rvk,
    rt: rt,
  };
}