import { RequiredDeep } from 'type-fest';
import {
  ToIsoDateOptions,
  ToIsoDateTimeOptions,
  ToIsoTimeOptions,
} from '../../types';

export type FinalIsoDateTimeOptions = RequiredDeep<ToIsoDateTimeOptions>;

export function toFinalIsoDateTimeOptions(
  options?: ToIsoDateTimeOptions,
): FinalIsoDateTimeOptions {
  return {
    timeFormat: options?.timeFormat ?? 'HH:mm:ss',
    timezone: options?.timezone ?? 'UTC',
    offset: options?.offset ?? 'utc-zero-or-offset',
  };
}

export type FinalIsoDateOptions = RequiredDeep<ToIsoDateOptions>;

export function toFinalIsoDateOptions(
  options?: ToIsoDateOptions,
): FinalIsoDateOptions {
  return {
    format: options?.format ?? 'yyyy-MM-dd',
    timezone: options?.timezone ?? 'UTC',
  };
}

export type FinalIsoTimeOptions = RequiredDeep<ToIsoTimeOptions>;

export function toFinalIsoTimeOptions(
  options?: ToIsoTimeOptions,
): FinalIsoTimeOptions {
  return {
    format: options?.format ?? 'HH:mm:ss',
    timezone: options?.timezone ?? 'UTC',
  };
}
