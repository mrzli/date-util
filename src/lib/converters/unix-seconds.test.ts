import { describe, expect, it } from '@jest/globals';
import {
  ToIsoDateTimeOptions,
  DateObject,
  DateObjectTz,
  ToIsoDateOptions,
  ToIsoTimeOptions,
} from '../types';
import {
  unixSecondsToUnixMilliseconds,
  unixSecondsToJsDate,
  unixSecondsToIsoDateTime,
  unixSecondsToIsoDate,
  unixSecondsToIsoTime,
  unixSecondsToDateObject,
  unixSecondsToDateObjectTz,
} from './unix-seconds';

describe('unix-seconds', () => {
  describe('unixSecondsToUnixMilliseconds()', () => {
    interface Example {
      readonly input: number;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: 1_704_066_312,
        expected: 1_704_066_312_000,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = unixSecondsToUnixMilliseconds(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsToJsDate()', () => {
    interface Example {
      readonly input: number;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: 1_704_066_312,
        expected: '2023-12-31T23:45:12.000Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = unixSecondsToJsDate(example.input).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsToIsoDateTime()', () => {
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
          value: 1_704_066_312,
          options: undefined,
        },
        expected: '2023-12-31T23:45:12Z',
      },
      {
        input: {
          value: 1_704_066_312,
          options: {
            timeFormat: 'HH:mm:ss.SSS',
            offset: 'utc-zero-or-offset',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01-01T08:45:12.000+09:00',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = unixSecondsToIsoDateTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsToIsoDate()', () => {
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
          value: 1_704_066_312,
          options: undefined,
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: 1_704_066_312,
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
        const actual = unixSecondsToIsoDate(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsToIsoTime()', () => {
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
          value: 1_704_066_312,
          options: undefined,
        },
        expected: '23:45:12',
      },
      {
        input: {
          value: 1_704_066_312,
          options: {
            format: 'HH:mm:ss.SSS',
            timezone: 'America/New_York',
          },
        },
        expected: '18:45:12.000',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = unixSecondsToIsoTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsToDateObject()', () => {
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
          value: 1_704_066_312,
          timezone: undefined,
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 0,
        },
      },
      {
        input: {
          value: 1_704_066_312,
          timezone: 'America/New_York',
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 18,
          minute: 45,
          second: 12,
          millisecond: 0,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = unixSecondsToDateObject(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsToDateObjectTz()', () => {
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
          value: 1_704_066_312,
          timezone: undefined,
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 0,
          timezone: 'UTC',
        },
      },
      {
        input: {
          value: 1_704_066_312,
          timezone: 'America/New_York',
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 18,
          minute: 45,
          second: 12,
          millisecond: 0,
          timezone: 'America/New_York',
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = unixSecondsToDateObjectTz(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
