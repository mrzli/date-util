export interface ToIsoDateTimeOptions {
  readonly timeFormat?: IsoDateTimeTimeFormat;
  readonly timezone?: string;
  readonly offset?: IsoOffsetType;
}

export const ISO_DATE_TIME_TIME_FORMATS = [
  'HH:mm',
  'HH:mm:ss',
  'HH:mm:ss.SSS',
] as const;

export type IsoDateTimeTimeFormat = (typeof ISO_DATE_TIME_TIME_FORMATS)[number];

export const ISO_OFFSET_TYPES = [
  'none',
  'utc-zero-or-offset',
  'offset',
] as const;

export type IsoOffsetType = (typeof ISO_OFFSET_TYPES)[number];
