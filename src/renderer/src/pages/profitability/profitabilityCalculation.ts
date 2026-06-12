import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function profitabilityCalculation(data: CellValue[][]) {

  const colCount = data[0]?.length ?? 0;

  const assets: number[] = [];       // aktíva
  const passive: number[] = [];      // pasiva
  const revenue: number[] = [];      // výnosy
  const sales: number[] = [];        // tržby
  const costs: number[] = [];        // náklady
  const incomeTax: number[] = [];    // daň z príjmov
  const percent: number[] = [];      // úrok
  const capital: number[] = [];      // vlastný kapitál
  const debtCapital: number[] = [];  // cudzí kapitál
  const investment: number[] = [];   // investícia

  for (let col = 0; col < colCount; col++) {
    assets[col]      = Number(data[0]?.[col]) || 0;
    passive[col]     = Number(data[1]?.[col]) || 0;
    revenue[col]     = Number(data[2]?.[col]) || 0;
    sales[col]       = Number(data[3]?.[col]) || 0;
    costs[col]       = Number(data[4]?.[col]) || 0;
    incomeTax[col]   = Number(data[5]?.[col]) || 0;
    percent[col]     = Number(data[6]?.[col]) || 0;
    capital[col]     = Number(data[7]?.[col]) || 0;
    debtCapital[col] = Number(data[8]?.[col]) || 0;
    investment[col]  = Number(data[9]?.[col]) || 0;
  }

  // čistý zisk = výnosy - náklady - daň z príjmov
  const netProfit = revenue.map((r, i) =>
    formatNumber(r - costs[i] - incomeTax[i])
  );

  // ROI = zisk / investícia
  const roi = investment.map((s, i) =>
    s !== 0 ? formatNumber(((revenue[i] - costs[i]) / s).toFixed(2)) : 0
  );

  // ROS = čistý zisk / tržby
  const ros = sales.map((s, i) =>
    s !== 0 ? formatNumber(netProfit[i] / s) : 0
  );

  // ROA =  Zisk čistý / aktíva
  const roa = assets.map((a, i) =>
    a !== 0 ? formatNumber((netProfit[i] / a).toFixed(2)) : 0
  );

  // ROE = Zisk čistý / vlastný kapitál
  const roe = capital.map((c, i) =>
    c !== 0 ? formatNumber((netProfit[i] / c).toFixed(2)) : 0
  );

  // Rcuk = čistý zisk / cudzí kapitál
  const rcuk = debtCapital.map((c, i) =>
    c !== 0 ? formatNumber((netProfit[i] / c).toFixed(2)) : 0
  );

  // RCK = čistý zisk / pasíva
  const rck = passive.map((p, i) =>
    p !== 0 ? formatNumber((netProfit[i] / p).toFixed(2)) : 0
  );

  // Rentabilita výnosov = čistý zisk  / výnosy
  const rv = revenue.map((r, i) =>
    r !== 0 ? formatNumber((netProfit[i] / r).toFixed(2)) : 0
  );

  // Rentabilita nákladov = čistý zisk  / náklady
  const rn = costs.map((c, i) =>
    c !== 0 ? formatNumber((netProfit[i] / c).toFixed(2)) : 0
  );

  return {
    netProfit: netProfit,
    roi: roi,
    ros: ros,
    roa: roa,
    roe: roe,
    rcuk: rcuk,
    rck: rck,
    rv: rv,
    rn: rn,
  };
}