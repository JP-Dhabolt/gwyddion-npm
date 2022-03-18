import { isEven } from '.';

describe('isEven', () => {
  const evenTestCases = [2, 4, 6, 8, 10, 198256];
  evenTestCases.forEach(n => {
    it(`should return true for ${n}`, () => {
      expect(isEven(n)).toBe(true);
    });
  });

  const oddTestCases = [1, 3, 5, 7, 9, 198255];
  oddTestCases.forEach(n => {
    it(`should return false for ${n}`, () => {
      expect(isEven(n)).toBe(false);
    });
  });
});
