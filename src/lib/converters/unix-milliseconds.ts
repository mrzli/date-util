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

export function unixMillisecondsToJsDate(milliseconds: number): Date {
  return new Date(milliseconds);
}

export function unixMillisecondsToUnixSeconds(milliseconds: number): number {
  return Math.floor(milliseconds / 1000);
}

export function unixMillisecondsToIsoDateTime(
  milliseconds: number,
  options?: ToIsoDateTimeOptions,
): string {
  const finalOptions = toFinalIsoDateTimeOptions(options);
  const { timeFormat, timezone, offset } = finalOptions;

  const date = DateTime.fromMillis(milliseconds, {
    zone: timezone,
  });

  const shouldDisplayOffset =
    offset === 'offset' ||
    (offset === 'utc-zero-or-offset' && timezone !== 'UTC');

  const offsetFormat = shouldDisplayOffset ? 'ZZ' : '';

  const formattedDate = date.toFormat(
    `yyyy-MM-dd'T'${timeFormat}${offsetFormat}`,
  );

  const hasZSuffix = offset === 'utc-zero-or-offset' && timezone === 'UTC';
  const zSuffixIfAny = hasZSuffix ? 'Z' : '';

  return `${formattedDate}${zSuffixIfAny}`;
}

export function unixMillisecondsToIsoDate(
  milliseconds: number,
  options?: ToIsoDateOptions,
): string {
  const finalOptions = toFinalIsoDateOptions(options);
  const { format, timezone } = finalOptions;

  const date = DateTime.fromMillis(milliseconds, {
    zone: timezone,
  });

  const formattedDate = date.toFormat(format);

  return formattedDate;
}

export function unixMillisecondsToIsoTime(
  milliseconds: number,
  options?: ToIsoTimeOptions,
): string {
  const finalOptions = toFinalIsoTimeOptions(options);
  const { format, timezone } = finalOptions;

  const date = DateTime.fromMillis(milliseconds, {
    zone: timezone,
  });

  const formattedTime = date.toFormat(format);

  return formattedTime;
}

export function unixMillisecondsToDateObject(
  milliseconds: number,
  timezone: string = 'UTC',
): DateObject {
  const date = DateTime.fromMillis(milliseconds, { zone: timezone });
  const { year, month, day, hour, minute, second, millisecond } = date;

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  };
}

export function unixMillisecondsToDateObjectTz(
  milliseconds: number,
  timezone: string = 'UTC',
): DateObjectTz {
  return {
    ...unixMillisecondsToDateObject(milliseconds, timezone),
    timezone,
  };
}
