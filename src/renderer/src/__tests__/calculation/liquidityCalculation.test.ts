import { liquidityCalculation } from '@renderer/pages/liquidity/liquidityCalculation';

describe('liquidityCalculation', () => {
  let result: ReturnType<typeof liquidityCalculation>;

  const data = [
    [200, 100],  // finAssets
    [400, 50],   // shortTermLiabil
    [100, 30],   // shortTermReceiv
    [50, 20],    // resources
  ];

  beforeAll(() => {
    result = liquidityCalculation(data);
  });

  it('should calculate correct immediateLiq', () => {
    expect(result.immediateLiq).toEqual([0.50, 2.00]);
  });

  it('should calculate correct currentLiq', () => {
    expect(result.currentLiq).toEqual([0.75, 2.60]);
  });

  it('should calculate correct totalLiquidity', () => {
    expect(result.totalLiquidity).toEqual([0.88, 3.00]);
  });

  it('should calculate correct netMonetaryCapital', () => {
    expect(result.netMonetaryCapital).toEqual([-50, 100]);
  });

  it('should calculate correct netMonetaryAssets', () => {
    expect(result.netMonetaryAssets).toEqual([-100, 80]);
  });

  it('should calculate correct netReadyFunds', () => {
    expect(result.netReadyFunds).toEqual([-200, 50]);
  });
});