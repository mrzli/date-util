import { describe, expect, it } from '@jest/globals';
import {
  unixMillisecondsToDateObject,
  unixMillisecondsToDateObjectTz,
  unixMillisecondsToIsoDate,
  unixMillisecondsToIsoDateTime,
  unixMillisecondsToIsoTime,
  unixMillisecondsToJsDate,
  unixMillisecondsToUnixSeconds,
} from './unix-milliseconds';
import {
  DateObject,
  DateObjectTz,
  ToIsoDateOptions,
  ToIsoDateTimeOptions,
  ToIsoTimeOptions,
} from '../types';

describe('unix-milliseconds', () => {
  describe('unixMillisecondsToJsDate()', () => {
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
      {
        input: 1_704_066_312_614,
        expected: '2023-12-31T23:45:12.614Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = unixMillisecondsToJsDate(example.input).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToUnixSeconds()', () => {
    interface Example {
      readonly input: number;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: 1_640_995_200_000,
        expected: 1_640_995_200,
      },
      {
        input: 1_640_998_861_001,
        expected: 1_640_998_861,
      },
      {
        input: 1_640_998_861_500,
        expected: 1_640_998_861,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = unixMillisecondsToUnixSeconds(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToIsoDateTime()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly options: ToIsoDateTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_704_066_312_614,
          options: undefined,
        },
        expected: '2023-12-31T23:45:12Z',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss',
            timezone: 'UTC',
            offset: 'utc-zero-or-offset',
          },
        },
        expected: '2023-12-31T23:45:12Z',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm',
            timezone: 'UTC',
            offset: 'utc-zero-or-offset',
          },
        },
        expected: '2023-12-31T23:45Z',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss.SSS',
            timezone: 'UTC',
            offset: 'utc-zero-or-offset',
          },
        },
        expected: '2023-12-31T23:45:12.614Z',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss',
            timezone: 'UTC',
            offset: 'offset',
          },
        },
        expected: '2023-12-31T23:45:12+00:00',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss',
            timezone: 'Europe/London',
            offset: 'utc-zero-or-offset',
          },
        },
        expected: '2023-12-31T23:45:12+00:00',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss',
            timezone: 'America/New_York',
            offset: 'utc-zero-or-offset',
          },
        },
        expected: '2023-12-31T18:45:12-05:00',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss',
            timezone: 'America/New_York',
            offset: 'none',
          },
        },
        expected: '2023-12-31T18:45:12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            timeFormat: 'HH:mm:ss',
            timezone: 'Asia/Tokyo',
            offset: 'utc-zero-or-offset',
          },
        },
        expected: '2024-01-01T08:45:12+09:00',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;

        const actual = unixMillisecondsToIsoDateTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToIsoDate()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly options: ToIsoDateOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_704_066_312_614,
          options: undefined,
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy-MM-dd',
            timezone: 'UTC',
          },
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy-MM',
            timezone: 'UTC',
          },
        },
        expected: '2023-12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'MM-dd',
            timezone: 'UTC',
          },
        },
        expected: '12-31',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy',
            timezone: 'UTC',
          },
        },
        expected: '2023',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'MM',
            timezone: 'UTC',
          },
        },
        expected: '12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'dd',
            timezone: 'UTC',
          },
        },
        expected: '31',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy-MM-dd',
            timezone: 'Europe/London',
          },
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy-MM-dd',
            timezone: 'Europe/Berlin',
          },
        },
        expected: '2024-01-01',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy-MM-dd',
            timezone: 'America/New_York',
          },
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'yyyy-MM-dd',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01-01',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;

        const actual = unixMillisecondsToIsoDate(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToIsoTime()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly options: ToIsoTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_704_066_312_614,
          options: undefined,
        },
        expected: '23:45:12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm:ss',
            timezone: 'UTC',
          },
        },
        expected: '23:45:12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm:ss.SSS',
            timezone: 'UTC',
          },
        },
        expected: '23:45:12.614',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm',
            timezone: 'UTC',
          },
        },
        expected: '23:45',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH',
            timezone: 'UTC',
          },
        },
        expected: '23',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'mm',
            timezone: 'UTC',
          },
        },
        expected: '45',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'ss',
            timezone: 'UTC',
          },
        },
        expected: '12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'SSS',
            timezone: 'UTC',
          },
        },
        expected: '614',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm:ss',
            timezone: 'Europe/London',
          },
        },
        expected: '23:45:12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm:ss',
            timezone: 'Europe/Berlin',
          },
        },
        expected: '00:45:12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm:ss',
            timezone: 'America/New_York',
          },
        },
        expected: '18:45:12',
      },
      {
        input: {
          value: 1_704_066_312_614,
          options: {
            format: 'HH:mm:ss',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '08:45:12',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;

        const actual = unixMillisecondsToIsoTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToDateObject()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly timezone: string | undefined;
      };
      readonly expected: DateObject;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_704_066_312_614,
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
          value: 1_704_066_312_614,
          timezone: 'UTC',
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
          value: 1_704_066_312_614,
          timezone: 'Asia/Tokyo',
        },
        expected: {
          year: 2024,
          month: 1,
          day: 1,
          hour: 8,
          minute: 45,
          second: 12,
          millisecond: 614,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;

        const actual = unixMillisecondsToDateObject(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixMillisecondsToDateObjectTz()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly timezone: string | undefined;
      };
      readonly expected: DateObjectTz;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_704_066_312_614,
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
          value: 1_704_066_312_614,
          timezone: 'UTC',
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
          value: 1_704_066_312_614,
          timezone: 'Asia/Tokyo',
        },
        expected: {
          year: 2024,
          month: 1,
          day: 1,
          hour: 8,
          minute: 45,
          second: 12,
          millisecond: 614,
          timezone: 'Asia/Tokyo',
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;

        const actual = unixMillisecondsToDateObjectTz(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
