export interface ToIsoDateOptions {
  readonly format?: IsoDateFormat;
  readonly timezone?: string;
}

export const ISO_DATE_FORMATS = [
  'yyyy-MM-dd',
  'yyyy-MM',
  'MM-dd',
  'yyyy',
  'MM',
  'dd',
] as const;

export type IsoDateFormat = (typeof ISO_DATE_FORMATS)[number];