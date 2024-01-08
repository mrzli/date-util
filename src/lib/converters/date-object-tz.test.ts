import { describe, expect, it } from '@jest/globals';
import {
  ToIsoDateTimeOptions,
  ToIsoDateOptions,
  ToIsoTimeOptions,
  DateObject,
  DateObjectTz,
} from '../types';
import {
  dateObjectTzToDateObject,
  dateObjectTzToIsoDate,
  dateObjectTzToIsoDateTime,
  dateObjectTzToIsoTime,
  dateObjectTzToJsDate,
  dateObjectTzToUnixMilliseconds,
  dateObjectTzToUnixSeconds,
} from './date-object-tz';

const DATE_OBJECT: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45,
  second: 12,
  millisecond: 614,
  timezone: 'Europe/Berlin',
};

describe('date-object-tz', () => {
  describe('dateObjectTzToUnixMilliseconds()', () => {
    interface Example {
      readonly input: DateObjectTz;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: DATE_OBJECT,
        expected: 1_704_062_712_614,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = dateObjectTzToUnixMilliseconds(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzToUnixSeconds()', () => {
    interface Example {
      readonly input: DateObjectTz;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: DATE_OBJECT,
        expected: 1_704_062_712,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = dateObjectTzToUnixSeconds(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzToJsDate()', () => {
    interface Example {
      readonly input: DateObjectTz;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: DATE_OBJECT,
        expected: '2023-12-31T22:45:12.614Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = dateObjectTzToJsDate(example.input).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzToIsoDateTime()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObjectTz;
        readonly options: ToIsoDateTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          options: undefined,
        },
        expected: '2023-12-31T22:45:12Z',
      },
      {
        input: {
          value: DATE_OBJECT,
          options: {
            timeFormat: 'HH:mm:ss.SSS',
            offset: 'utc-zero-or-offset',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01-01T07:45:12.614+09:00',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = dateObjectTzToIsoDateTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzToIsoDate()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObjectTz;
        readonly options: ToIsoDateOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          options: undefined,
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: DATE_OBJECT,
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
        const actual = dateObjectTzToIsoDate(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzToIsoTime()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObjectTz;
        readonly options: ToIsoTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          options: undefined,
        },
        expected: '22:45:12',
      },
      {
        input: {
          value: DATE_OBJECT,
          options: {
            format: 'HH:mm:ss.SSS',
            timezone: 'America/New_York',
          },
        },
        expected: '17:45:12.614',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, options } = example.input;
        const actual = dateObjectTzToIsoTime(value, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzToDateObject()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObjectTz;
        readonly timezone: string | undefined;
      };
      readonly expected: DateObject;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 22,
          minute: 45,
          second: 12,
          millisecond: 614,
        },
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'Europe/Berlin',
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
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = dateObjectTzToDateObject(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
