import { describe, expect, it } from '@jest/globals';
import {
  ToIsoDateTimeOptions,
  DateObject,
  DateObjectTz,
  ToIsoDateOptions,
  ToIsoTimeOptions,
} from '../types';
import {
  jsDateToUnixMilliseconds,
  jsDateToUnixSeconds,
  jsDateToIsoDateTime,
  jsDateToIsoDate,
  jsDateToIsoTime,
  jsDateToDateObject,
  jsDateToDateObjectTz,
} from './js-date';

describe('js-date', () => {
  describe('jsDateToUnixMilliseconds()', () => {
    interface Example {
      readonly input: string;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '2023-12-31T23:45:12.614Z',
        expected: 1_704_066_312_614,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const value = new Date(example.input);
        const actual = jsDateToUnixMilliseconds(value);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateToUnixSeconds()', () => {
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
        const value = new Date(example.input);
        const actual = jsDateToUnixSeconds(value);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateToIsoDateTime()', () => {
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
        const finalValue = new Date(value);

        const actual = jsDateToIsoDateTime(finalValue, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateToIsoDate()', () => {
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
        const finalValue = new Date(value);

        const actual = jsDateToIsoDate(finalValue, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateToIsoTime()', () => {
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
        const finalValue = new Date(value);

        const actual = jsDateToIsoTime(finalValue, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateToDateObject()', () => {
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
        const finalValue = new Date(value);
        const actual = jsDateToDateObject(finalValue, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateToDateObjectTz()', () => {
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
        const finalValue = new Date(value);

        const actual = jsDateToDateObjectTz(finalValue, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
