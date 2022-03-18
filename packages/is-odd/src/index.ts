import { isEven } from '@gwyddion/is-even';

export function isOdd(n: number): boolean {
  return !isEven(n);
}
