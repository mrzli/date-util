import { describe, expect, it } from '@jest/globals';
import {
  ToIsoDateTimeOptions,
  DateObject,
  DateObjectTz,
  ToIsoDateOptions,
  ToIsoTimeOptions,
} from '../types';
import {
  isoDateTimeToUnixMilliseconds,
  isoDateTimeToUnixSeconds,
  isoDateTimeToJsDate,
  isoDateTimeToIsoDateTime,
  isoDateTimeToIsoDate,
  isoDateTimeToIsoTime,
  isoDateTimeToDateObject,
  isoDateTimeToDateObjectTz,
} from './iso-date-time';

describe('iso-date-time', () => {
  describe('isoDateTimeToUnixMilliseconds()', () => {
    describe('valid', () => {
      interface Example {
        readonly input: string;
        readonly expected: number;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: '2023-12-31T23:45:12.614Z',
          expected: 1_704_066_312_614,
        },
        {
          input: '2023-12-31T23:45:12Z',
          expected: 1_704_066_312_000,
        },
        {
          input: '2023-12-31T23:45Z',
          expected: 1_704_066_300_000,
        },
        {
          input: '2023-12-31T23:45:12.614+00:00',
          expected: 1_704_066_312_614,
        },
        {
          input: '2023-12-31T23:45:12.614-01:00',
          expected: 1_704_069_912_614,
        },
        {
          input: '2023-12-31T23:45:12.614+01:00',
          expected: 1_704_062_712_614,
        },
        {
          input: '2023-12-31T23:45:12+01:00',
          expected: 1_704_062_712_000,
        },
        {
          input: '2023-12-31T23:45+01:00',
          expected: 1_704_062_700_000,
        },
        {
          input: '2023-12-31T23:45:12.614',
          expected: 1_704_066_312_614,
        },
        {
          input: '2023-12-31T23:45:12',
          expected: 1_704_066_312_000,
        },
        {
          input: '2023-12-31T23:45',
          expected: 1_704_066_300_000,
        },
        {
          input: '2024-01-01',
          expected: 1_704_067_200_000,
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const actual = isoDateTimeToUnixMilliseconds(example.input);
          expect(actual).toEqual(example.expected);
        });
      }
    });

    describe('throws', () => {
      interface Example {
        readonly input: string;
      }

      const EXAMPLES: readonly Example[] = [
        {
          input: 'aaa',
        },
        {
          input: '2023-13-01',
        },
        {
          input: '2023-12-32',
        },
        {
          input: '2023-02-29',
        },
        {
          input: '2023-12-31T24:01:00',
        },
        {
          input: '2023-12-31T23:60:00',
        },
        {
          input: '2023-12-31T23:59:60',
        },
      ];

      for (const example of EXAMPLES) {
        it(JSON.stringify(example), () => {
          const call = (): number =>
            isoDateTimeToUnixMilliseconds(example.input);
          expect(call).toThrow();
        });
      }
    });
  });

  describe('isoDateTimeToUnixSeconds()', () => {
    interface Example {
      readonly input: string;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '2023-12-31T23:45:12.614Z',
        expected: 1_704_066_312,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = isoDateTimeToUnixSeconds(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeToJsDate()', () => {
    interface Example {
      readonly input: string;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '2023-12-31T23:45:12.614Z',
        expected: '2023-12-31T23:45:12.614Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = isoDateTimeToJsDate(example.input).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeToIsoDateTime()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly options: ToIsoDateTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          options: undefined,
        },
        expected: '2023-12-31T23:45:12Z',
      },
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          options: {
            timeFormat: 'HH:mm:ss.SSS',
            offset: 'utc-zero-or-offset',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01-01T08:45:12.614+09:00',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = isoDateTimeToIsoDateTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeToIsoDate()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly options: ToIsoDateOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          options: undefined,
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          options: {
            format: 'yyyy-MM',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = isoDateTimeToIsoDate(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeToIsoTime()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly options: ToIsoTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          options: undefined,
        },
        expected: '23:45:12',
      },
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          options: {
            format: 'HH:mm:ss.SSS',
            timezone: 'America/New_York',
          },
        },
        expected: '18:45:12.614',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = isoDateTimeToIsoTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeToDateObject()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly timezone: string | undefined;
      };
      readonly expected: DateObject;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          timezone: undefined,
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 614,
        },
      },
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          timezone: 'America/New_York',
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 18,
          minute: 45,
          second: 12,
          millisecond: 614,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = isoDateTimeToDateObject(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeToDateObjectTz()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly timezone: string | undefined;
      };
      readonly expected: DateObjectTz;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          timezone: undefined,
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 614,
          timezone: 'UTC',
        },
      },
      {
        input: {
          value: '2023-12-31T23:45:12.614Z',
          timezone: 'America/New_York',
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 18,
          minute: 45,
          second: 12,
          millisecond: 614,
          timezone: 'America/New_York',
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = isoDateTimeToDateObjectTz(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
