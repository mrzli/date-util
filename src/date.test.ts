import { describe, expect, it } from '@jest/globals';
import {
  dateToUnixMilliseconds,
  dateToUnixSeconds,
  unixMillisecondsToDate,
} from './date';

describe('date', () => {
  describe('dateToUnixMilliseconds()', () => {
    interface Example {
      readonly input: string;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '2022-01-01T00:00:00.000Z',
        expected: 1_640_995_200_000,
      },
      {
        input: '2022-01-01T01:01:01.001Z',
        expected: 1_640_998_861_001,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = dateToUnixMilliseconds(new Date(example.input));
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateToUnixSeconds()', () => {
    interface Example {
      readonly input: string;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '2022-01-01T00:00:00.000Z',
        expected: 1_640_995_200,
      },
      {
        input: '2022-01-01T00:00:00.001Z',
        expected: 1_640_995_200,
      },
      {
        input: '2022-01-01T00:00:00.999Z',
        expected: 1_640_995_200,
      },
      {
        input: '2022-01-01T01:01:01.000Z',
        expected: 1_640_998_861,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = dateToUnixSeconds(new Date(example.input));
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToDate()', () => {
    interface Example {
      readonly input: number;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: 1_640_995_200_000,
        expected: '2022-01-01T00:00:00.000Z',
      },
      {
        input: 1_640_998_861_001,
        expected: '2022-01-01T01:01:01.001Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = unixMillisecondsToDate(example.input).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
