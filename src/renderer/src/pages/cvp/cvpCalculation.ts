import { CellValue } from '@renderer/store/rootReducer';
import {
  divideArrays,
  multiplyArrays,
  subtractArrays,
  sumArrays,
} from '../../helper';
import { formatNumber } from '@renderer/utils/formatNumber';

export function cvpCalculation(
  data: CellValue[][],
) {
  const volumes: number[] = [];
  const prices: number[] = [];
  const costs: number[] = [];
  const fix: number[] = [];
  const minProfit: number[] = [];

  data.forEach((rowData, idx) => {
    // objem produkcie
    volumes[idx] = formatNumber(rowData[0]);

    // predajná cena jednotková
    prices[idx] = formatNumber(rowData[2]);

    // variabilné náklady jednotkové
    costs[idx] = formatNumber(rowData[3]);

    // fixne náklady
    fix[idx] = formatNumber(rowData[4]);

    // zisk minimálny
    minProfit[idx] = formatNumber(rowData[5]);
  });

  // minimanly zisk
  const minProfits = minProfit;

  // nulový bod
  const zeroTon = divideArrays(fix, subtractArrays(prices, costs)).map(
    (i) => Math.ceil(i),
  );

  // nulový bod (€)
  const ones = new Array(fix.length).fill(1);
  const zeroEur = divideArrays(
    fix,
    subtractArrays(ones, divideArrays(costs, prices))
  );

  // nulový bod Zmin (ks)
  const zeroProf = divideArrays(
    costs.map((_, index) =>
      parseFloat((fix[index] + minProfits[index]).toFixed(12)),
    ),
    subtractArrays(prices, costs),
  ).map((i) => Math.ceil(i));

  // pri predajnej cene
  const zeroSellPrice = divideArrays(fix, sumArrays(volumes, costs));

  // príspevok na úhradu fixných nákladov a zisku
  const paymentMoney = subtractArrays(prices, costs);

  // náklady fixné jednotkové
  const fixedCosts = divideArrays(fix, volumes);

  // kritické využitie výrobnej kapacity
  const capacityUsage = multiplyArrays(
    divideArrays(zeroTon, volumes),
    new Array(volumes.length).fill(100),
  );

  const totalCosts = sumArrays(fix, multiplyArrays(volumes, costs));

  const incomeTotal = multiplyArrays(volumes, prices);

  const economicResult = subtractArrays(incomeTotal, totalCosts);

  return {
    volumes: volumes.map(formatNumber),
    prices: prices.map(formatNumber),
    costs: costs.map(formatNumber),
    zeroEur: zeroEur.map(formatNumber),
    zeroTon: zeroTon.map(formatNumber),
    zeroProf: zeroProf.map(formatNumber),
    fixTotals: fix.map(formatNumber),
    minProfits: minProfits.map(formatNumber),
    zeroSellPrice: zeroSellPrice.map(formatNumber),
    paymentMoney: paymentMoney.map(formatNumber),
    fixedCosts: fixedCosts.map(formatNumber),
    capacityUsage: capacityUsage.map(formatNumber),
    totalCosts: totalCosts.map(formatNumber),
    incomeTotal: incomeTotal.map(formatNumber),
    economicResult: economicResult.map(formatNumber),
  };
}
