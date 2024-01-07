export interface ToIsoTimeOptions {
  readonly format?: IsoTimeFormat;
  readonly timezone?: string;
}

export const ISO_TIME_FORMATS = [
  'HH:mm:ss.SSS',
  'HH:mm:ss',
  'HH:mm',
  'HH',
  'mm',
  'ss',
  'SSS',
] as const;

export type IsoTimeFormat = (typeof ISO_TIME_FORMATS)[number];
