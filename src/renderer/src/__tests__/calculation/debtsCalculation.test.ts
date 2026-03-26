import { debtsCalculation } from '@renderer/pages/debts/debtsCalculation';

describe('debtsCalculation', () => {
  let result: ReturnType<typeof debtsCalculation>;

  const data = [
    [400, 200],   // CuK
    [100, 50],    // VK
    [1000, 500],  // A
    [500, 300],   // Z
    [500, 200],   // P
    [1000, 500],  // DM
    [600, 100],   // Zd
    [300, 200],   // Zk
  ];

  beforeAll(() => {
    result = debtsCalculation(data);
  });

  it('should calculate correct totalCapital', () => {
    expect(result.totalCapital).toEqual([500, 250]);
  });

  it('should calculate correct selfFinRatio', () => {
    expect(result.selfFinRatio).toEqual([0.20, 0.20]);
  });

  it('should calculate correct debtRatio', () => {
    expect(result.debtRatio).toEqual([0.80, 0.80]);
  });

  it('should calculate correct insolvencyInd', () => {
    expect(result.insolvencyInd).toEqual([1.80, 1.50]);
  });

  it('should calculate correct fixAssetsCovRatio', () => {
    expect(result.fixAssetsCovRatio).toEqual([0.50, 0.50]);
  });

  it('should calculate correct totalDebt', () => {
    expect(result.totalDebt).toEqual([0.90, 0.60]);
  });

  it('should calculate correct indepLevel', () => {
    expect(result.indepLevel).toEqual([0.10, 0.10]);
  });
});