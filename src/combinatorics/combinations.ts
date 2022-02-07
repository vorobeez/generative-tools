import {BinarySequence} from '../common';
import {zeroes, ones} from '../utils/array';

export function getCombinations(n: number, r: number): Array<BinarySequence> {
  if (n <= 0 || n < r) {
    return [];
  }

  if (n === r) {
    return [ones(n)];
  }

  if (r === 0) {
    return [zeroes(n)];
  }

  return [
    ...getCombinations(n - 1, r - 1).map((c) => [1, ...c] as BinarySequence),
    ...getCombinations(n - 1, r).map((c) => [0, ...c] as BinarySequence),
  ];
}

function filterCombinationsWithRestrictedIntervals(
  n: number,
  r: number,
  intervalsParams: {
    currentSize: number;
    allowedSizes: Set<number>;
  },
): Array<BinarySequence> {
  const {currentSize, allowedSizes} = intervalsParams;

  if (n <= 0 || n < r) {
    return [];
  }

  if (n === r && allowedSizes.has(1) && allowedSizes.has(currentSize)) {
    return [ones(n)];
  }

  if (r === 0 && allowedSizes.has(currentSize + n)) {
    return [zeroes(n)];
  }

  if (!allowedSizes.has(currentSize)) {
    // return only case when interval size is going to grow
    return filterCombinationsWithRestrictedIntervals(n - 1, r, {
      allowedSizes,
      currentSize: currentSize + 1,
    }).map((c) => [0, ...c] as BinarySequence);
  }

  return [
    ...filterCombinationsWithRestrictedIntervals(n - 1, r - 1, {
      currentSize: 1,
      allowedSizes,
    }).map((c) => [1, ...c] as BinarySequence),
    ...filterCombinationsWithRestrictedIntervals(n - 1, r, {
      allowedSizes,
      currentSize: currentSize + 1,
    }).map((c) => [0, ...c] as BinarySequence),
  ];
}

// Restrictions:
// - starts on the first pulse
// - interval is a sequence of type 100..0
export function getCombinationsWithRestrictedIntervals(
  n: number,
  r: number,
  allowedIntervalSizes: Set<number>,
): Array<BinarySequence> {
  return filterCombinationsWithRestrictedIntervals(n - 1, r - 1, {
    currentSize: 1,
    allowedSizes: allowedIntervalSizes,
  }).map((c) => [1, ...c]);
}
