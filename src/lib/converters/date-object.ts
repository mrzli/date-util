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
  unixMillisecondsToDateObjectTz,
} from './unix-milliseconds';
import { TIMEZONE_UTC } from '../util';

export function dateObjectToUnixMilliseconds(
  dateObject: DateObject,
  inputTimezone?: string,
): number {
  const finalInputTimezone = inputTimezone ?? TIMEZONE_UTC;
  return DateTime.fromObject(dateObject, {
    zone: finalInputTimezone,
  }).toMillis();
}

export function dateObjectToUnixSeconds(
  dateObject: DateObject,
  inputTimezone?: string,
): number {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    inputTimezone,
  );
  return unixMillisecondsToUnixSeconds(unixMilliseconds);
}

export function dateObjectToJsDate(
  dateObject: DateObject,
  inputTimezone?: string,
): Date {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    inputTimezone,
  );
  return unixMillisecondsToJsDate(unixMilliseconds);
}

export function dateObjectToIsoDateTime(
  dateObject: DateObject,
  inputTimezone?: string,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    inputTimezone,
  );
  return unixMillisecondsToIsoDateTime(unixMilliseconds, options);
}

export function dateObjectToIsoDate(
  dateObject: DateObject,
  inputTimezone?: string,
  options?: ToIsoDateOptions,
): string {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    inputTimezone,
  );
  return unixMillisecondsToIsoDate(unixMilliseconds, options);
}

export function dateObjectToIsoTime(
  dateObject: DateObject,
  inputTimezone?: string,
  options?: ToIsoTimeOptions,
): string {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    inputTimezone,
  );
  return unixMillisecondsToIsoTime(unixMilliseconds, options);
}

export function dateObjectToDateObjectTz(
  dateObject: DateObject,
  inputTimezone?: string,
  timezone?: string,
): DateObjectTz {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    inputTimezone,
  );
  return unixMillisecondsToDateObjectTz(unixMilliseconds, timezone);
}
