import { sortimentCalculation } from '@renderer/pages/sortiment/sortimentCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof sortimentCalculation>;
  const data = [
    [6, 3],
    ['ks', 'kg'],
    [9, 10],
    [5, 6],
    [80, 5],
  ];

  beforeAll(() => {
    result = sortimentCalculation(data as number[][]);
  });

  it('should calculate correct rentCost', () => {
    expect(result.rentCost).toEqual([1500, -16.67]);
  });

  it('should calculate correct rentIncome', () => {
    expect(result.rentIncome).toEqual([94, -20]);
  });

  it('should calculate correct marginProfit', () => {
    expect(result.marginProfit).toEqual([94, -20]);
  });

  it('should calculate correct marginGross', () => {
    expect(result.marginGross).toEqual([71, -5]);
  });

  it('should calculate correct allowance', () => {
    expect(result.allowance).toEqual([0.89, -1]);
  });

  it('should calculate correct profit', () => {
    expect(result.unitProfit).toEqual([75, -1]);
  });

  it('should calculate correct totalDirectCosts', () => {
    expect(result.totalDirectCosts).toEqual([9, 10]);
  });

  it('should calculate correct totalIndirectCosts', () => {
    expect(result.totalIndirectCosts).toEqual([-4, -4]);
  });

  it('should calculate correct unitProfit', () => {
    expect(result.unitProfit).toEqual([75, -1]);
  });

  it('should calculate correct income', () => {
    expect(result.income).toEqual([480, 15]);
  });

  it('should calculate correct totalCosts', () => {
    expect(result.totalCosts).toEqual([30, 18]);
  });

  it('should calculate correct totalProfit', () => {
    expect(result.totalProfit).toEqual([450, -3]);
  });
});
