import { DateTime } from 'luxon';
import {
  ToIsoDateTimeOptions,
  DateObject,
  DateObjectTz,
  ToIsoDateOptions,
  ToIsoTimeOptions,
} from '../types';
import {
  unixMillisecondsToIsoDateTime,
  unixMillisecondsToIsoDate,
  unixMillisecondsToIsoTime,
  unixMillisecondsToJsDate,
  unixMillisecondsToUnixSeconds,
  unixMillisecondsToDateObject,
} from './unix-milliseconds';

export function dateObjectTzToUnixMilliseconds(
  dateObject: DateObjectTz,
): number {
  const { timezone, ...rest } = dateObject;
  return DateTime.fromObject(rest, { zone: timezone }).toMillis();
}

export function dateObjectTzToUnixSeconds(dateObject: DateObjectTz): number {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToUnixSeconds(unixMilliseconds);
}

export function dateObjectTzToJsDate(dateObject: DateObjectTz): Date {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToJsDate(unixMilliseconds);
}

export function dateObjectTzToIsoDateTime(
  dateObject: DateObjectTz,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToIsoDateTime(unixMilliseconds, options);
}

export function dateObjectTzToIsoDate(
  dateObject: DateObjectTz,
  options?: ToIsoDateOptions,
): string {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function dateObjectTzToIsoTime(
  dateObject: DateObjectTz,
  options?: ToIsoTimeOptions,
): string {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function dateObjectTzToDateObject(
  dateObject: DateObjectTz,
  timezone?: string,
): DateObject {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToDateObject(unixMilliseconds, timezone);
}
