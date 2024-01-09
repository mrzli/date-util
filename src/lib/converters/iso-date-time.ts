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
  unixMillisecondsToDateObject,
  unixMillisecondsToDateObjectTz,
  unixMillisecondsToJsDate,
  unixMillisecondsToUnixSeconds,
} from './unix-milliseconds';
import { TIMEZONE_UTC } from '../util';

export function isoDateTimeToUnixMilliseconds(isoDateTime: string): number {
  const result = DateTime.fromISO(isoDateTime, {
    zone: TIMEZONE_UTC,
  }).toMillis();
  if (Number.isNaN(result)) {
    // eslint-disable-next-line unicorn/prefer-type-error
    throw new Error(`Invalid ISO date-time format: '${isoDateTime}'.`);
  }

  return result;
}

export function isoDateTimeToUnixSeconds(isoDateTime: string): number {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToUnixSeconds(unixMilliseconds);
}

export function isoDateTimeToJsDate(isoDateTime: string): Date {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToJsDate(unixMilliseconds);
}

export function isoDateTimeToIsoDateTime(
  isoDateTime: string,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToIsoDateTime(unixMilliseconds, options);
}

export function isoDateTimeToIsoDate(
  isoDateTime: string,
  options?: ToIsoDateOptions,
): string {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function isoDateTimeToIsoTime(
  isoDateTime: string,
  options?: ToIsoTimeOptions,
): string {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function isoDateTimeToDateObject(
  isoDateTime: string,
  timezone?: string,
): DateObject {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToDateObject(unixMilliseconds, timezone);
}

export function isoDateTimeToDateObjectTz(
  isoDateTime: string,
  timezone?: string,
): DateObjectTz {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  return unixMillisecondsToDateObjectTz(unixMilliseconds, timezone);
}
