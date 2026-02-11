import { debtsCalculation } from '@renderer/pages/debts/debtsCalculation';

describe('debtsCalculation', () => {
  let result: ReturnType<typeof debtsCalculation>;

  const data = [
    [400, 200],
    [100, 50],
    [1000, 500],  
    [500, 300],
    [500, 200],
    [1000, 500],
    [600, 100],
    [300, 200],
    [800, 400],
  ];

  beforeAll(() => {
    result = debtsCalculation(data);
  });

  it('should calculate correct totalDebt', () => {
    expect(result.totalDebt).toEqual([0.5, 0.5]);
  });

  it('should calculate correct indepLevel', () => {
    expect(result.indepLevel).toEqual([1, 1.5]);
  });

  it('should calculate correct selfFinRatio', () => {
    expect(result.selfFinRatio).toEqual([0.5, 0.4]);
  });

  it('should calculate correct debtRatio', () => {
    expect(result.debtRatio).toEqual([0.5, 0.6]);
  });

  it('should calculate correct insolvencyInd', () => {
    expect(result.insolvencyInd).toEqual([2, 0.5]);
  });

  it('should calculate correct fixAssetsCovRatio', () => {
    expect(result.fixAssetsCovRatio).toEqual([0.63, 0.75]);
  });
});
