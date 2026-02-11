import { profitabilityCalculation } from '@renderer/pages/profitability/profitabilityCalculation';

describe('profitabilityCalculation', () => {
  let result: ReturnType<typeof profitabilityCalculation>;

  const data = [
    [100, 50],
    [20, 10],
    [500, 200],
    [1000, 500],
    [700, 300],
    [400, 200],
    [300, 150],
    [80, 40],
  ];

  beforeAll(() => {
    result = profitabilityCalculation(data);
  });

  it('should calculate correct ROI', () => {
    expect(result.roi).toEqual([0.24, 0.3]);
  });

  it('should calculate correct ROA', () => {
    expect(result.roa).toEqual([0.1, 0.1]);
  });

  it('should calculate correct ROE', () => {
    expect(result.roe).toEqual([0.25, 0.25]);
  });

  it('should calculate correct RVY', () => {
    expect(result.rvy).toEqual([0.2, 0.25]);
  });

  it('should calculate correct RNK', () => {
    expect(result.rnk).toEqual([0.27, 0.27]);
  });

  it('should calculate correct RCK', () => {
    expect(result.rck).toEqual([0.11, 0.13]);
  });

  it('should calculate correct RVK', () => {
    expect(result.rvk).toEqual([0.2, 0.2]);
  });

  it('should calculate correct RT', () => {
    expect(result.rt).toEqual([0.16, 0.2]);
  });
});
