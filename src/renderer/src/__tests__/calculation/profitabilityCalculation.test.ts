import { profitabilityCalculation } from '@renderer/pages/profitability/profitabilityCalculation';

describe('profitabilityCalculation', () => {
  let result: ReturnType<typeof profitabilityCalculation>;

  const data = [
    [1000, 500],  // assets
    [800, 400],   // passive
    [600, 300],   // revenue
    [700, 400],   // sales
    [400, 200],   // costs
    [50, 25],     // incomeTax
    [30, 15],     // percent
    [200, 100],   // capital
    [600, 300],   // debtCapital
    [500, 250],   // investment
  ];

  beforeAll(() => {
    result = profitabilityCalculation(data);
  });

  it('should calculate correct netProfit', () => {
    expect(result.netProfit).toEqual([150, 75]);
  });

  it('should calculate correct ROI', () => {
    expect(result.roi).toEqual([0.40, 0.40]);
  });

  it('should calculate correct ROS', () => {
    expect(result.ros).toEqual([0.21, 0.19]);
  });

  it('should calculate correct ROA', () => {
    expect(result.roa).toEqual([0.15, 0.15]);
  });

  it('should calculate correct ROE', () => {
    expect(result.roe).toEqual([0.75, 0.75]);
  });

  it('should calculate correct Rcuk', () => {
    expect(result.rcuk).toEqual([0.25, 0.25]);
  });

  it('should calculate correct RCK', () => {
    expect(result.rck).toEqual([0.19, 0.19]);
  });

  it('should calculate correct RV', () => {
    expect(result.rv).toEqual([0.25, 0.25]);
  });

  it('should calculate correct RN', () => {
    expect(result.rn).toEqual([0.38, 0.38]);
  });
});