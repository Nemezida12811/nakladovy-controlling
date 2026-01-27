import { CellValue } from '@renderer/store/rootReducer';
import { formatNumber } from '@renderer/utils/formatNumber';

export function liquidityCalculation(data: CellValue[][]) {
  console.log('Calculation input data:', data);

  const colCount = data[0]?.length ?? 0;

  const finAssets: number[] = [];        // Finančný majetok
  const shortTermLiabil: number[] = [];  // Krátkodobé záväzky
  const shortTermReceiv: number[] = [];  // Krátkodobé pohľadávky
  const resources: number[] = [];        // Zásoby

  for (let col = 0; col < colCount; col++) {
    finAssets[col]        = Number(data[0]?.[col]) || 0;
    shortTermLiabil[col]  = Number(data[1]?.[col]) || 0;
    shortTermReceiv[col]  = Number(data[2]?.[col]) || 0;
    resources[col]        = Number(data[3]?.[col]) || 0;
  }

  // Okamžitá likvidita
  const immediateLiq = finAssets.map((fa, i) =>
    shortTermLiabil[i] !== 0
      ? formatNumber((fa / shortTermLiabil[i]).toFixed(2)) : 0
  );

  // Bežná likvidita
  const currentLiq = shortTermReceiv.map((rec, i) =>
    shortTermLiabil[i] !== 0
      ? formatNumber(((finAssets[i] + rec) / shortTermLiabil[i]).toFixed(2)) : 0
  );

  // Celková likvidita
  const totalLiquidity = resources.map((res, i) =>
    shortTermLiabil[i] !== 0
      ? formatNumber(((finAssets[i] + shortTermReceiv[i] + res) / shortTermLiabil[i]).toFixed(2)) : 0
  );

  console.log('Calculation results:', {
    immediateLiq, currentLiq, totalLiquidity }
  );

  return {
    immediateLiq, currentLiq, totalLiquidity
  };
}
