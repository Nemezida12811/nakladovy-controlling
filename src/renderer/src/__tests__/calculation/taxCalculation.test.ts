import { taxCalculation } from '@renderer/pages/tax/taxCalculation';

describe('economicCalculation', () => {
  let result: ReturnType<typeof taxCalculation>;
  const data = [
    [6, 3, 10],
    [8, 4, 20],
    [9, 5, 30],
  ];

  beforeAll(() => {
    result = taxCalculation(data, 23);
  });

  it('should calculate correct uznaneNakladySum', () => {
    expect(result.uznaneNakladySum).toEqual(23);
  });

  it('should calculate correct neuznaneNakladySum', () => {
    expect(result.neuznaneNakladySum).toEqual(12);
  });

  it('should calculate correct vynosySum', () => {
    expect(result.vynosySum).toEqual(60);
  });

  it('should calculate correct nakladyCelkove', () => {
    expect(result.nakladyCelkove).toEqual(35);
  });

  it('should calculate correct vysledokHospodareniaUctovny', () => {
    expect(result.vysledokHospodareniaUctovny).toEqual(25);
  });

  it('should calculate correct vysledokHospodareniaDanovy', () => {
    expect(result.vysledokHospodareniaDanovy).toEqual(37);
  });

  it('should calculate correct rozdielVysledkuHodpodarenia', () => {
    expect(result.rozdielVysledkuHodpodarenia).toEqual(-12);
  });

  it('should calculate correct danovaPovinnost', () => {
    expect(result.danovaPovinnost).toEqual(8.51);
  });
});
