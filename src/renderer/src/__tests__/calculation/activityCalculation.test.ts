import { activityCalculation } from '@renderer/pages/activity/activityCalculation';

describe('activityCalculation', () => {
  let result: ReturnType<typeof activityCalculation>;

  const data = [
    [1000, 500],   // debtCapital
    [5000, 2000],  // ownCapital
    [400, 200],    // assets
    [300, 100],    // longTermAssets
    [200, 50],     // inventory
    [150, 60],     // receivables
    [800, 300],    // shortTermLiabil
    [1500, 600],   // sales
  ];

  beforeAll(() => {
    result = activityCalculation(data);
  });

  it('should calculate correct totalCapital', () => {
    expect(result.totalCapital).toEqual([6000, 2500]);
  });

  it('should calculate correct turnoverTotalCapital', () => {
    expect(result.turnoverTotalCapital).toEqual([1460, 1520.83]);
  });

  it('should calculate correct turnoverFixedAssets', () => {
    expect(result.turnoverFixedAssets).toEqual([73, 60.83]);
  });

  it('should calculate correct turnoverTotalAssets', () => {
    expect(result.turnoverTotalAssets).toEqual([97.33, 121.67]);
  });

  it('should calculate correct coa', () => {
    expect(result.coa).toEqual([3.75, 3.00]);
  });

  it('should calculate correct turnoverEquity', () => {
    expect(result.turnoverEquity).toEqual([1216.67, 1216.67]);
  });

  it('should calculate correct turnoverInventory', () => {
    expect(result.turnoverInventory).toEqual([48.67, 30.42]);
  });

  it('should calculate correct turnoverReceivables', () => {
    expect(result.turnoverReceivables).toEqual([36.50, 36.50]);
  });

  it('should calculate correct turnoverPayables', () => {
    expect(result.turnoverPayables).toEqual([194.67, 182.50]);
  });
});