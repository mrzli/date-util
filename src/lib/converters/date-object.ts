import { DateTime } from 'luxon';
import { ToIsoDateTimeOptions, DateObject, DateObjectTz } from '../types';
import {
  unixMillisecondsToIsoDateTime,
  unixMillisecondsToIsoDate,
  unixMillisecondsToIsoTime,
  unixMillisecondsToJsDate,
  unixMillisecondsToUnixSeconds,
} from './unix-milliseconds';

export function dateObjectToUnixMilliseconds(
  dateObject: DateObject,
  timezone: string = 'UTC',
): number {
  return DateTime.fromObject(dateObject, { zone: timezone }).toMillis();
}

export function dateObjectToUnixSeconds(
  dateObject: DateObject,
  timezone: string = 'UTC',
): number {
  const unixMilliseconds = dateObjectToUnixMilliseconds(dateObject, timezone);
  return unixMillisecondsToUnixSeconds(unixMilliseconds);
}

export function dateObjectToJsDate(
  dateObject: DateObject,
  timezone: string = 'UTC',
): Date {
  const unixMilliseconds = dateObjectToUnixMilliseconds(dateObject, timezone);
  return unixMillisecondsToJsDate(unixMilliseconds);
}

export function dateObjectToIsoDateTime(
  dateObject: DateObject,
  timezone: string = 'UTC',
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectToUnixMilliseconds(dateObject, timezone);
  return unixMillisecondsToIsoDateTime(unixMilliseconds, options);
}

export function dateObjectToIsoDate(
  dateObject: DateObject,
  timezone: string = 'UTC',
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectToUnixMilliseconds(dateObject, timezone);
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function dateObjectToIsoTime(
  dateObject: DateObject,
  timezone: string = 'UTC',
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectToUnixMilliseconds(dateObject, timezone);
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function dateObjectToDateObjectTz(
  dateObject: DateObject,
  timezone: string = 'UTC',
): DateObjectTz {
  return {
    ...dateObject,
    timezone,
  };
}
