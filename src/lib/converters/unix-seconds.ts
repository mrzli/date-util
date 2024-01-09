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
} from './unix-milliseconds';

export function unixSecondsToUnixMilliseconds(unixSeconds: number): number {
  return unixSeconds * 1000;
}

export function unixSecondsToJsDate(unixSeconds: number): Date {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  return unixMillisecondsToJsDate(unixMilliseconds);
}

export function unixSecondsToIsoDateTime(
  unixSeconds: number,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  return unixMillisecondsToIsoDateTime(unixMilliseconds, options);
}

export function unixSecondsToIsoDate(
  unixSeconds: number,
  options?: ToIsoDateOptions,
): string {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function unixSecondsToIsoTime(
  unixSeconds: number,
  options?: ToIsoTimeOptions,
): string {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function unixSecondsToDateObject(
  unixSeconds: number,
  timezone?: string,
): DateObject {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  return unixMillisecondsToDateObject(unixMilliseconds, timezone);
}

export function unixSecondsToDateObjectTz(
  unixSeconds: number,
  timezone?: string,
): DateObjectTz {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  return unixMillisecondsToDateObjectTz(unixMilliseconds, timezone);
}
