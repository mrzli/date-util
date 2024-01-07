import { DateTime } from 'luxon';
import { ToIsoDateTimeOptions, DateObject, DateObjectTz } from '../types';
import {
  unixMillisecondsToIsoDateTime,
  unixMillisecondsToIsoDate,
  unixMillisecondsToIsoTime,
  unixMillisecondsToJsDate,
  unixMillisecondsToUnixSeconds,
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
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function dateObjectTzToIsoTime(
  dateObject: DateObjectTz,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function dateObjectTzToDateObject(dateObject: DateObjectTz): DateObject {
  const { timezone: _ignoreTimezone, ...rest } = dateObject;

  return rest;
}
