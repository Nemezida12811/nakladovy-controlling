import { CellValue, Value } from '@renderer/store/rootReducer';
import { divideArrays, subtractArrays, sumArrays } from '../../helper';
import { formatNumber } from '@renderer/utils/formatNumber';

export function economicCalculation(
  data: CellValue[][],
  values: Value[],
  length: number,
) {
  let costsByYear: number[] = Array.from({ length: length }, () => 0);
  let incomeByYear: number[] = Array.from({ length: length }, () => 0);

  //sums of costs and incomes by year
  data.map((rowData, row) => {
    rowData.map((value, col) => {
      // 500-599 codes of costs, 600-699 codes od incomes
      if (parseInt(values[row].value) >= 600) {
        incomeByYear[col] = parseFloat(
          (incomeByYear[col] + +value).toFixed(12),
        );
      } else {
        costsByYear[col] = parseFloat((costsByYear[col] + +value).toFixed(12));
      }
    });
  });

  let profitByYear: number[] = subtractArrays(incomeByYear, costsByYear);

  let incomeProfitabilityByYear: number[] = divideArrays(
    profitByYear,
    incomeByYear,
  );

  let costProfitabilityByYear: number[] = divideArrays(
    profitByYear,
    costsByYear,
  );

  let costEfficiencyByYear: number[] = divideArrays(incomeByYear, costsByYear);
  let costIndicatorByYear: number[] = divideArrays(costsByYear, incomeByYear);

  // 501-507 code of material costs
    const materialIndexes = values
      .map((v, i) => (Number(v.value) >= 501 && Number(v.value) <= 507 ? i : -1))
      .filter(i => i !== -1);
    let materialCostByYear = Array.from({ length: data[0].length }, () => 0);
    for (const rowIndex of materialIndexes) {
      const rowVals = data[rowIndex].map(Number);
      materialCostByYear = sumArrays(materialCostByYear, rowVals);
    }
    materialCostByYear = divideArrays(materialCostByYear, incomeByYear);

  // 521-528 code of wage costs
  const wageIndexes = values
    .map((v, i) => (Number(v.value) >= 521 && Number(v.value) <= 528 ? i : -1))
    .filter(i => i !== -1);
  let wageCostByYear = Array.from({ length: data[0].length }, () => 0);
  for (const rowIndex of wageIndexes) {
    const rowVals = data[rowIndex].map(Number);
    wageCostByYear = sumArrays(wageCostByYear, rowVals);
  }
  wageCostByYear = divideArrays(wageCostByYear, incomeByYear);

  // 551-557 code of wage costs
  const depreciationIndexes = values
    .map((v, i) => (Number(v.value) >= 551 && Number(v.value) <= 557 ? i : -1))
    .filter(i => i !== -1);
  let depreciationCostByYear = Array.from({ length: data[0].length }, () => 0);
  for (const rowIndex of depreciationIndexes) {
    const rowVals = data[rowIndex].map(Number);
    depreciationCostByYear = sumArrays(depreciationCostByYear, rowVals);
  }
  depreciationCostByYear = divideArrays(depreciationCostByYear, incomeByYear);

  // 561 - 569
  const values561569indexes: number[] = [];
  values.forEach((value, index) => {
    if (+value.value >= 561 && +value.value <= 569) {
      values561569indexes.push(index);
    }
  });

  let financialConstByYear = values561569indexes.reduce(
    (acc, index) => {
      return sumArrays(
        acc,
        data[index].map((i) => +i),
      );
    },
    Array.from({ length: data[0].length }, () => 0),
  );

  financialConstByYear = divideArrays(financialConstByYear, incomeByYear);

  // 511 - 518
  const values511518indexes: number[] = [];
  values.forEach((value, index) => {
    if (+value.value >= 511 && +value.value <= 518) {
      values511518indexes.push(index);
    }
  });

  let servicesConstByYear = values511518indexes.reduce(
    (acc, index) => {
      return sumArrays(
        acc,
        data[index].map((i) => +i),
      );
    },
    Array.from({ length: data[0].length }, () => 0),
  );

  servicesConstByYear = divideArrays(servicesConstByYear, incomeByYear);

  // 531 - 538
  const values531538indexes: number[] = [];
  values.forEach((value, index) => {
    if (+value.value >= 531 && +value.value <= 538) {
      values531538indexes.push(index);
    }
  });

  let taxesConstByYear = values531538indexes.reduce(
    (acc, index) => {
      return sumArrays(
        acc,
        data[index].map((i) => +i),
      );
    },
    Array.from({ length: data[0].length }, () => 0),
  );
  taxesConstByYear = divideArrays(taxesConstByYear, incomeByYear);

  // 541 - 549
  const hospIndexes = values
    .map((v, i) => (Number(v.value) >= 541 && Number(v.value) <= 549 ? i : -1))
    .filter(i => i !== -1);

  let hospCostByYear = Array.from({ length: data[0].length }, () => 0);

  for (const rowIndex of hospIndexes) {
    const rowVals = data[rowIndex].map(Number);
    hospCostByYear = sumArrays(hospCostByYear, rowVals);
  }
  hospCostByYear = divideArrays(hospCostByYear, incomeByYear);

  return {
    costData: costsByYear.map(formatNumber),
    incomeData: incomeByYear.map(formatNumber),
    profitData: profitByYear.map(formatNumber),
    incomeProfitabilityData: incomeProfitabilityByYear.map(formatNumber),
    costProfitabilityData: costProfitabilityByYear.map(formatNumber),
    costEfficiencyData: costEfficiencyByYear.map(formatNumber),
    costIndicatorData: costIndicatorByYear.map(formatNumber),
    materialCostData: materialCostByYear.map(formatNumber),
    wageCostData: wageCostByYear.map(formatNumber),
    depreciationCostData: depreciationCostByYear.map(formatNumber),
    financialConstData: financialConstByYear.map(formatNumber),
    servicesConstData: servicesConstByYear.map(formatNumber),
    taxesConstData: taxesConstByYear.map(formatNumber),
    hospCostData: hospCostByYear.map(formatNumber),
  };
}
