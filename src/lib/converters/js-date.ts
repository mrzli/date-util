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
  unixMillisecondsToUnixSeconds,
} from './unix-milliseconds';

export function jsDateToUnixMilliseconds(date: Date): number {
  return date.getTime();
}

export function jsDateToUnixSeconds(date: Date): number {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  return unixMillisecondsToUnixSeconds(unixMilliseconds);
}

export function jsDateToIsoDateTime(
  date: Date,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  return unixMillisecondsToIsoDateTime(unixMilliseconds, options);
}

export function jsDateToIsoDate(
  date: Date,
  options?: ToIsoDateOptions,
): string {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function jsDateToIsoTime(
  date: Date,
  options?: ToIsoTimeOptions,
): string {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function jsDateToDateObject(date: Date, timezone?: string): DateObject {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  return unixMillisecondsToDateObject(unixMilliseconds, timezone);
}

export function jsDateToDateObjectTz(
  date: Date,
  timezone?: string,
): DateObjectTz {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  return unixMillisecondsToDateObjectTz(unixMilliseconds, timezone);
}
