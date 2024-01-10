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

export function unixMillisecondsAdd(
  unixMilliseconds: number,
  inputTimezone: string | undefined,
  amount: Duration,
): number {
  const finalInputTimezone = inputTimezone ?? TIMEZONE_UTC;

  return DateTime.fromMillis(unixMilliseconds, { zone: finalInputTimezone })
    .plus(amount)
    .toMillis();
}

export function unixSecondsAdd(
  unixSeconds: number,
  inputTimezone: string | undefined,
  amount: Duration,
): number {
  const unixMilliseconds = unixSecondsToUnixMilliseconds(unixSeconds);
  const newUnixMilliseconds = unixMillisecondsAdd(
    unixMilliseconds,
    inputTimezone,
    amount,
  );
  return unixMillisecondsToUnixSeconds(newUnixMilliseconds);
}

export function jsDateAdd(
  date: Date,
  inputTimezone: string | undefined,
  amount: Duration,
): Date {
  const unixMilliseconds = jsDateToUnixMilliseconds(date);
  const newUnixMilliseconds = unixMillisecondsAdd(
    unixMilliseconds,
    inputTimezone,
    amount,
  );
  return unixMillisecondsToJsDate(newUnixMilliseconds);
}

export function isoDateTimeAdd(
  isoDateTime: string,
  inputTimezone: string | undefined,
  amount: Duration,
  options?: ToIsoDateTimeOptions,
): string {
  const unixMilliseconds = isoDateTimeToUnixMilliseconds(isoDateTime);
  const newUnixMilliseconds = unixMillisecondsAdd(
    unixMilliseconds,
    inputTimezone,
    amount,
  );
  return unixMillisecondsToIsoDateTime(newUnixMilliseconds, options);
}

export function dateObjectAdd(
  dateObject: DateObject,
  amount: Duration,
): DateObject {
  const unixMilliseconds = dateObjectToUnixMilliseconds(
    dateObject,
    TIMEZONE_UTC,
  );
  const newUnixMilliseconds = unixMillisecondsAdd(
    unixMilliseconds,
    TIMEZONE_UTC,
    amount,
  );
  return unixMillisecondsToDateObject(newUnixMilliseconds, TIMEZONE_UTC);
}

export function dateObjectTzAdd(
  dateObject: DateObjectTz,
  amount: Duration,
): DateObjectTz {
  const { timezone } = dateObject;

  const unixMilliseconds = dateObjectTzToUnixMilliseconds(dateObject);
  const newUnixMilliseconds = unixMillisecondsAdd(
    unixMilliseconds,
    timezone,
    amount,
  );
  return unixMillisecondsToDateObjectTz(newUnixMilliseconds, timezone);
}
