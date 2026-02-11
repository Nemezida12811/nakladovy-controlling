import { activityCalculation } from '@renderer/pages/activity/activityCalculation';

describe('activityCalculation', () => {
  let result: ReturnType<typeof activityCalculation>;

  const data = [
    [1000, 500],
    [5000, 2000],
    [400, 200],
    [300, 100],
    [200, 50],
    [150, 60],
    [800, 300],
    [1500, 600],
  ];

  beforeAll(() => {
    result = activityCalculation(data);
  });

  it('should calculate correct turnoverTotalCapital', () => {
    expect(result.turnoverTotalCapital).toEqual([72, 90]);
  });

  it('should calculate correct turnoverEquity', () => {
    expect(result.turnoverEquity).toEqual([28.8, 36]);
  });

  it('should calculate correct turnoverInventory', () => {
    expect(result.turnoverInventory).toEqual([21.6, 18]);
  });

  it('should calculate correct turnoverReceivables', () => {
    expect(result.turnoverReceivables).toEqual([14.4, 9]);
  });

  it('should calculate correct turnoverPayables', () => {
    expect(result.turnoverPayables).toEqual([10.8, 10.8]);
  });

  it('should calculate correct turnoverFixedAssets', () => {
    expect(result.turnoverFixedAssets).toEqual([57.6, 54]);
  });

  it('should calculate correct turnoverTotalAssets', () => {
    expect(result.turnoverTotalAssets).toEqual([108, 108]);
  });
});
