import { DateTime } from 'luxon';
import {
  DateObject,
  DateObjectTz,
  ToIsoDateOptions,
  ToIsoDateTimeOptions,
  ToIsoTimeOptions,
} from '../types';
import {
  toFinalIsoDateOptions,
  toFinalIsoDateTimeOptions,
  toFinalIsoTimeOptions,
} from './util';
import { TIMEZONE_UTC } from '../util';

export function unixMillisecondsToUnixSeconds(
  unixMilliseconds: number,
): number {
  return Math.floor(unixMilliseconds / 1000);
}

export function unixMillisecondsToJsDate(unixMilliseconds: number): Date {
  return new Date(unixMilliseconds);
}

export function unixMillisecondsToIsoDateTime(
  unixMilliseconds: number,
  options?: ToIsoDateTimeOptions,
): string {
  const finalOptions = toFinalIsoDateTimeOptions(options);
  const { timeFormat, timezone, offset } = finalOptions;

  const date = DateTime.fromMillis(unixMilliseconds, {
    zone: timezone,
  });

  const shouldDisplayOffset =
    offset === 'offset' ||
    (offset === 'utc-zero-or-offset' && timezone !== TIMEZONE_UTC);

  const offsetFormat = shouldDisplayOffset ? 'ZZ' : '';

  const formattedDate = date.toFormat(
    `yyyy-MM-dd'T'${timeFormat}${offsetFormat}`,
  );

  const hasZSuffix =
    offset === 'utc-zero-or-offset' && timezone === TIMEZONE_UTC;
  const zSuffixIfAny = hasZSuffix ? 'Z' : '';

  return `${formattedDate}${zSuffixIfAny}`;
}

export function unixMillisecondsToIsoDate(
  unixMilliseconds: number,
  options?: ToIsoDateOptions,
): string {
  const finalOptions = toFinalIsoDateOptions(options);
  const { format, timezone } = finalOptions;

  const date = DateTime.fromMillis(unixMilliseconds, {
    zone: timezone,
  });

  const formattedDate = date.toFormat(format);

  return formattedDate;
}

export function unixMillisecondsToIsoTime(
  unixMilliseconds: number,
  options?: ToIsoTimeOptions,
): string {
  const finalOptions = toFinalIsoTimeOptions(options);
  const { format, timezone } = finalOptions;

  const date = DateTime.fromMillis(unixMilliseconds, {
    zone: timezone,
  });

  const formattedTime = date.toFormat(format);

  return formattedTime;
}

export function unixMillisecondsToDateObject(
  unixMilliseconds: number,
  timezone?: string,
): DateObject {
  const { timezone: _ignoreTimezone, ...rest } = unixMillisecondsToDateObjectTz(
    unixMilliseconds,
    timezone,
  );
  return rest;
}

export function unixMillisecondsToDateObjectTz(
  unixMilliseconds: number,
  timezone?: string,
): DateObjectTz {
  const finalTimezone = timezone ?? TIMEZONE_UTC;

  const date = DateTime.fromMillis(unixMilliseconds, { zone: finalTimezone });
  const { year, month, day, hour, minute, second, millisecond } = date;

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
    timezone: finalTimezone,
  };
}
