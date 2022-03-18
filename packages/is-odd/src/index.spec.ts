import { isOdd } from '.';

describe('isOdd', () => {
  const evenTestCases = [2, 4, 6, 8, 10, 198256];
  evenTestCases.forEach(n => {
    it(`should return false for ${n}`, () => {
      expect(isOdd(n)).toBe(false);
    });
  });

  const oddTestCases = [1, 3, 5, 7, 9, 198255];
  oddTestCases.forEach(n => {
    it(`should return true for ${n}`, () => {
      expect(isOdd(n)).toBe(true);
    });
  });
});
