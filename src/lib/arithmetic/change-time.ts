import { DateTime } from 'luxon';
import {
  DateObject,
  DateObjectTz,
  Duration,
  ToIsoDateTimeOptions,
} from '../types';
import { TIMEZONE_UTC } from '../util';
import {
  dateObjectToUnixMilliseconds,
  dateObjectTzToUnixMilliseconds,
  isoDateTimeToUnixMilliseconds,
  jsDateToUnixMilliseconds,
  unixMillisecondsToDateObject,
  unixMillisecondsToDateObjectTz,
  unixMillisecondsToIsoDateTime,
  unixMillisecondsToJsDate,
  unixMillisecondsToUnixSeconds,
  unixSecondsToUnixMilliseconds,
} from '../converters';

export function unixMillisecondsChangeTime(
  unixMilliseconds: number,
  inputTimezone: string | undefined,
  amount: Duration,
): number {
  const finalInputTimezone = inputTimezone ?? TIMEZONE_UTC;

  return DateTime.fromMillis(unixMilliseconds, { zone: finalInputTimezone })
    .plus(amount)
    .toMillis();
}

export function unixSecondsChangeTime(
  unixSeconds: number,
  inputTimezone: string | undefined,
  amount: Duration,
): number {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  const newUnixMilliseconds = unixMillisecondsChangeTime(
    unixMilliseconds,
    inputTimezone,
    amount,
  );
  return unixMillisecondsToUnixSeconds(newUnixMilliseconds);
}

export function jsDateChangeTime(
  date: Date,
  inputTimezone: string | undefined,
  amount: Duration,
): Date {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  const newUnixMilliseconds = unixMillisecondsChangeTime(
    unixMilliseconds,
    inputTimezone,
    amount,
  );
  return unixMillisecondsToJsDate(newUnixMilliseconds);
}

export function isoDateTimeChangeTime(
  isoDateTime: string,
  inputTimezone: string | undefined,
  amount: Duration,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  const newUnixMilliseconds = unixMillisecondsChangeTime(
    unixMilliseconds,
    inputTimezone,
    amount,
  );
  return unixMillisecondsToIsoDateTime(newUnixMilliseconds, options);
}

export function dateObjectChangeTime(
  dateObject: DateObject,
  amount: Duration,
): DateObject {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    TIMEZONE_UTC,
  );
  const newUnixMilliseconds = unixMillisecondsChangeTime(
    unixMilliseconds,
    TIMEZONE_UTC,
    amount,
  );
  return unixMillisecondsToDateObject(newUnixMilliseconds, TIMEZONE_UTC);
}

export function dateObjectTzChangeTime(
  dateObject: DateObjectTz,
  amount: Duration,
): DateObject {
  const { timezone } = dateObject;

  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  const newUnixMilliseconds = unixMillisecondsChangeTime(
    unixMilliseconds,
    timezone,
    amount,
  );
  return unixMillisecondsToDateObjectTz(newUnixMilliseconds, timezone);
}
