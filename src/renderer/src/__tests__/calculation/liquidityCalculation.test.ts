import { liquidityCalculation } from '@renderer/pages/liquidity/liquidityCalculation';

describe('liquidityCalculation', () => {
  let result: ReturnType<typeof liquidityCalculation>;

  const data = [
    [200, 100],
    [400, 50],
    [100, 30],
    [50, 20],
  ];

  beforeAll(() => {
    result = liquidityCalculation(data);
  });

  it('should calculate correct immediateLiq', () => {
    expect(result.immediateLiq).toEqual([0.5, 2]);
  });

  it('should calculate correct currentLiq', () => {
    expect(result.currentLiq).toEqual([0.75, 2.6]);
  });

  it('should calculate correct totalLiquidity', () => {
    expect(result.totalLiquidity).toEqual([0.88, 3]);
  });
});
