import { describe, expect, it } from '@jest/globals';
import {
  ToIsoDateTimeOptions,
  ToIsoDateOptions,
  ToIsoTimeOptions,
  DateObject,
  DateObjectTz,
} from '../types';
import {
  dateObjectToDateObjectTz,
  dateObjectToIsoDate,
  dateObjectToIsoDateTime,
  dateObjectToIsoTime,
  dateObjectToJsDate,
  dateObjectToUnixMilliseconds,
  dateObjectToUnixSeconds,
} from './date-object';

const DATE_OBJECT: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45,
  second: 12,
  millisecond: 614,
};

describe('date-object', () => {
  describe('dateObjectToUnixMilliseconds()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
        },
        expected: 1_704_066_312_614,
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'America/New_York',
        },
        expected: 1_704_084_312_614,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = dateObjectToUnixMilliseconds(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectToUnixSeconds()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
        },
        expected: 1_704_066_312,
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'America/New_York',
        },
        expected: 1_704_084_312,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = dateObjectToUnixSeconds(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectToJsDate()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
        },
        expected: '2023-12-31T23:45:12.614Z',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'America/New_York',
        },
        expected: '2024-01-01T04:45:12.614Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone } = example.input;
        const actual = dateObjectToJsDate(value, timezone).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectToIsoDateTime()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
        readonly options: ToIsoDateTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
          options: undefined,
        },
        expected: '2023-12-31T23:45:12Z',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
          options: {
            timeFormat: 'HH:mm:ss.SSS',
            offset: 'utc-zero-or-offset',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01-01T08:45:12.614+09:00',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'America/New_York',
          options: {
            timeFormat: 'HH:mm:ss.SSS',
            offset: 'utc-zero-or-offset',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01-01T13:45:12.614+09:00',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone, options } = example.input;
        const actual = dateObjectToIsoDateTime(value, timezone, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectToIsoDate()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
        readonly options: ToIsoDateOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
          options: undefined,
        },
        expected: '2023-12-31',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
          options: {
            format: 'yyyy-MM',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'America/New_York',
          options: {
            format: 'yyyy-MM',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2024-01',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'Asia/Tokyo',
          options: {
            format: 'yyyy-MM',
            timezone: 'Asia/Tokyo',
          },
        },
        expected: '2023-12',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, timezone, options } = example.input;
        const actual = dateObjectToIsoDate(value, timezone, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectToIsoTime()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
        readonly options: ToIsoTimeOptions | undefined;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
          options: undefined,
        },
        expected: '23:45:12',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: undefined,
          options: {
            format: 'HH:mm:ss.SSS',
            timezone: 'America/New_York',
          },
        },
        expected: '18:45:12.614',
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'Europe/Berlin',
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
        const { value, timezone, options } = example.input;
        const actual = dateObjectToIsoTime(value, timezone, options);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectToDateObjectTz()', () => {
    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly timezone: string | undefined;
      };
      readonly expected: DateObjectTz;
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
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 614,
          timezone: 'UTC',
        },
      },
      {
        input: {
          value: DATE_OBJECT,
          timezone: 'America/New_York',
        },
        expected: {
          year: 2023,
          month: 12,
          day: 31,
          hour: 23,
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
        const actual = dateObjectToDateObjectTz(value, timezone);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
