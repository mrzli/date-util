import { describe, expect, it } from '@jest/globals';
import {
  DateObject,
  DateObjectTz,
  Duration,
  ToIsoDateTimeOptions,
} from '../types';
import {
  dateObjectChangeTime,
  dateObjectTzChangeTime,
  isoDateTimeChangeTime,
  jsDateChangeTime,
  unixMillisecondsChangeTime,
  unixSecondsChangeTime,
} from './change-date';

describe('change-date', () => {
  describe('unixMillisecondsChangeTime()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly inputTimezone: string | undefined;
        readonly amount: Duration;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: {},
        },
        expected: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { years: 1 },
        },
        expected: 1_735_688_712_614, // 2024-12-31T23:45:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { months: 1 },
        },
        expected: 1_706_744_712_614, // 2024-01-31T23:45:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { weeks: 1 },
        },
        expected: 1_704_671_112_614, // 2024-01-07T23:45:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { days: 1 },
        },
        expected: 1_704_152_712_614, // 2024-01-01T23:45:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { hours: 1 },
        },
        expected: 1_704_069_912_614, // 2024-01-01T00:45:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { minutes: 1 },
        },
        expected: 1_704_066_372_614, // 2023-12-31T23:46:12.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { seconds: 1 },
        },
        expected: 1_704_066_313_614, // 2023-12-31T23:45:13.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { milliseconds: 1 },
        },
        expected: 1_704_066_312_615, // 2023-12-31T23:45:12.615Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { seconds: 5 },
        },
        expected: 1_704_066_317_614, // 2023-12-31T23:45:17.614Z
      },
      {
        input: {
          value: 1_704_066_312_614, // 2023-12-31T23:45:12.614Z
          inputTimezone: undefined,
          amount: { seconds: -5 },
        },
        expected: 1_704_066_307_614, // 2023-12-31T23:45:07.614Z
      },
      {
        input: {
          value: 1_698_536_712_614, // 2023-10-28T23:45:12.614Z
          inputTimezone: 'UTC',
          amount: { days: 1 },
        },
        expected: 1_698_623_112_614, // 2023-10-29T23:45:12.614Z
      },
      // this one is affected by daylight saving time
      // adding 1 day adds 25 hours instead of 24
      {
        input: {
          value: 1_698_536_712_614, // 2023-10-28T23:45:12.614Z (2023-10-29T01:45:12.614+02:00)
          inputTimezone: 'Europe/Berlin',
          amount: { days: 1 },
        },
        expected: 1_698_626_712_614, // 2023-10-30T00:45:12.614Z (2023-10-30T01:45:12.614+01:00)
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, inputTimezone, amount } = example.input;
        const actual = unixMillisecondsChangeTime(value, inputTimezone, amount);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('unixSecondsChangeTime()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly inputTimezone: string | undefined;
        readonly amount: Duration;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1_698_536_712, // 2023-10-28T23:45:12Z
          inputTimezone: undefined,
          amount: { days: 1 },
        },
        expected: 1_698_623_112, // 2023-10-29T23:45:12Z
      },
      {
        input: {
          value: 1_698_536_712, // 2023-10-28T23:45:12Z
          inputTimezone: 'UTC',
          amount: { days: 1 },
        },
        expected: 1_698_623_112, // 2023-10-29T23:45:12Z
      },
      {
        input: {
          value: 1_698_536_712, // 2023-10-28T23:45:12Z (2023-10-29T01:45:12+02:00)
          inputTimezone: 'Europe/Berlin',
          amount: { days: 1 },
        },
        expected: 1_698_626_712, // 2023-10-30T00:45:12Z (2023-10-30T01:45:12+01:00)
      },
      {
        input: {
          value: 1_698_536_712, // 2023-10-28T23:45:12Z
          inputTimezone: undefined,
          amount: { milliseconds: 614 },
        },
        expected: 1_698_536_712, // 2023-10-28T23:45:12Z
      },
      {
        input: {
          value: 1_698_536_712, // 2023-10-28T23:45:12Z
          inputTimezone: undefined,
          amount: { milliseconds: 1614 },
        },
        expected: 1_698_536_713, // 2023-10-28T23:45:13Z
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, inputTimezone, amount } = example.input;
        const actual = unixSecondsChangeTime(value, inputTimezone, amount);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('jsDateTimeChangeTime()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly inputTimezone: string | undefined;
        readonly amount: Duration;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-10-28T23:45:12.614Z',
          inputTimezone: undefined,
          amount: { days: 1 },
        },
        expected: '2023-10-29T23:45:12.614Z',
      },
      {
        input: {
          value: '2023-10-28T23:45:12.614Z',
          inputTimezone: 'UTC',
          amount: { days: 1 },
        },
        expected: '2023-10-29T23:45:12.614Z',
      },
      {
        input: {
          value: '2023-10-28T23:45:12.614Z', // 2023-10-29T01:45:12.614+02:00
          inputTimezone: 'Europe/Berlin',
          amount: { days: 1 },
        },
        expected: '2023-10-30T00:45:12.614Z', // 2023-10-30T01:45:12.614+01:00
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, inputTimezone, amount } = example.input;
        const finalValue = new Date(value);
        const actual = jsDateChangeTime(
          finalValue,
          inputTimezone,
          amount,
        ).toISOString();
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('isoDateTimeChangeTime()', () => {
    interface Example {
      readonly input: {
        readonly value: string;
        readonly inputTimezone: string | undefined;
        readonly amount: Duration;
      };
      readonly expected: string;
    }

    const OPTIONS: ToIsoDateTimeOptions = {
      timeFormat: 'HH:mm:ss.SSS',
      timezone: 'UTC',
      offset: 'utc-zero-or-offset',
    };

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: '2023-10-28T23:45:12.614Z',
          inputTimezone: undefined,
          amount: { days: 1 },
        },
        expected: '2023-10-29T23:45:12.614Z',
      },
      {
        input: {
          value: '2023-10-28T23:45:12.614Z',
          inputTimezone: 'UTC',
          amount: { days: 1 },
        },
        expected: '2023-10-29T23:45:12.614Z',
      },
      {
        input: {
          value: '2023-10-28T23:45:12.614Z', // 2023-10-29T01:45:12.614+02:00
          inputTimezone: 'Europe/Berlin',
          amount: { days: 1 },
        },
        expected: '2023-10-30T00:45:12.614Z', // 2023-10-30T01:45:12.614+01:00
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, inputTimezone, amount } = example.input;
        const actual = isoDateTimeChangeTime(
          value,
          inputTimezone,
          amount,
          OPTIONS,
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectChangeTime()', () => {
    const DATE_OBJECT: DateObject = {
      year: 2023,
      month: 10,
      day: 28,
      hour: 23,
      minute: 45,
      second: 12,
      millisecond: 614,
    };

    interface Example {
      readonly input: {
        readonly value: DateObject;
        readonly amount: Duration;
      };
      readonly expected: DateObject;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          amount: { days: 1 },
        },
        expected: {
          year: 2023,
          month: 10,
          day: 29,
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 614,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, amount } = example.input;
        const actual = dateObjectChangeTime(value, amount);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('dateObjectTzChangeTime()', () => {
    const DATE_OBJECT: DateObjectTz = {
      year: 2023,
      month: 10,
      day: 28,
      hour: 23,
      minute: 45,
      second: 12,
      millisecond: 614,
      timezone: 'Europe/Berlin',
    };

    interface Example {
      readonly input: {
        readonly value: DateObjectTz;
        readonly amount: Duration;
      };
      readonly expected: DateObjectTz;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: DATE_OBJECT,
          amount: { days: 1 },
        },
        expected: {
          year: 2023,
          month: 10,
          day: 29,
          hour: 23,
          minute: 45,
          second: 12,
          millisecond: 614,
          timezone: 'Europe/Berlin',
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, amount } = example.input;
        const actual = dateObjectTzChangeTime(value, amount);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
