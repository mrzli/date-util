# Date Util

This library implements functions for:

- Manipulating dates.
- Converting dates between various forms.

Date forms which are supported:

- `JsDate` - Native JavaScript `Date` object.
- `UnixMilliseconds` - Timestamps representing number of milliseconds since the Unix epoch.
- `UnixSeconds` - Timestamps representing number of seconds since the Unix epoch.
- `IsoDateTime` - ISO datetime strings.
- `IsoDate` - ISO date strings.
- `IsoTime` - ISO time strings.
- `DateObject` - See [DateObject](#dateobject).
- `DateObjectTz` - See [DateObjectTz](#dateobjecttz).

## Installation

```bash
npm install --save @gmjs/date-util
```

## API

- `dateToUnixMilliseconds(date: Date): number`
  - Description - Converts a date to the number of milliseconds since the Unix epoch.
- `dateToUnixSeconds(date: Date): number`
  - Description - Converts a date to the number of seconds since the Unix epoch.
- `unixMillisecondsToDate(milliseconds: number): Date`
  - Description - Converts the number of milliseconds since the Unix epoch to a date.

### Types

#### `ToIsoDateTimeOptions`

```ts
interface ToIsoDateTimeOptions {
  readonly timeFormat?: IsoDateTimeTimeFormat;
  readonly timezone?: string;
  readonly offset?: IsoOffsetType;
}
```

- `IsoDateTimeTimeFormat`

  ```ts
  type IsoDateTimeTimeFormat = 'HH:mm' | 'HH:mm:ss' | 'HH:mm:ss.SSS';
  ```

  Determines whether to display secons and milliseconds in an ISO datetime string:

  - `HH:mm` - Only hours and minutes are displayed.
  - `HH:mm:ss` - Hours, minutes and seconds are displayed.
  - `HH:mm:ss.SSS` - Hours, minutes, seconds and milliseconds are displayed.

- `IsoOffsetType`

  Determines what type of offset is included in an ISO datetime string:

  - `none` - No offset is included.
  - `utc-zero-or-offset`
    - When `UTC` is used as the timezone option, the resulting ISO string will have `Z` suffix.
    - When a timezone option other that `UTC` is used, even if the resulting offset is `00:00`, the resulting ISO string will have `+HH:mm` or `-HH:mm` offset.
  - `offset` - Offset is always in the format `+HH:mm` or `-HH:mm`.

  ```ts
  type IsoOffsetType = 'none' | 'utc-zero-or-offset' | 'offset';
  ```

#### `ToIsoDateOptions`

```ts
interface ToIsoDateOptions {
  readonly format?: IsoDateFormat;
  readonly timezone?: string;
}
```

- `IsoDateFormat`

  Determines what date parts are included in an ISO date string:

  - `yyyy-MM-dd` - Year, month and day are included.
  - `yyyy-MM` - Year and month are included.
  - `MM-dd` - Month and day are included.
  - `yyyy` - Year is included.
  - `MM` - Month is included.
  - `dd` - Day is included.

  ```ts
  type IsoDateFormat = 'yyyy-MM-dd' | 'yyyy-MM' | 'MM-dd' | 'yyyy' | 'MM' | 'dd';
  ```

#### `ToIsoTimeOptions`

```ts
interface ToIsoTimeOptions {
  readonly format?: IsoTimeFormat;
  readonly timezone?: string;
}
```

- `IsoTimeFormat`

  Determines what time parts are included in an ISO time string:

  - `HH:mm:ss.SSS` - Hours, minutes, seconds and milliseconds are included.
  - `HH:mm:ss` - Hours, minutes and seconds are included.
  - `HH:mm` - Hours and minutes are included.
  - `HH` - Hours are included.
  - `mm` - Minutes are included.
  - `ss` - Seconds are included.
  - `SSS` - Milliseconds are included.

  ```ts
  type IsoTimeFormat = 'HH:mm:ss.SSS' | 'HH:mm:ss' | 'HH:mm' | 'HH' | 'mm' | 'ss' | 'SSS';
  ```

#### `DateObject`

Object containing date and time components, such as `year`, `hour` etc.

This is an abstract representation of a date and time, not tied to a particular timezone, and thus not tied to a particular point in time (i.e. it cannot be converted to a timestamp without providing a timezone).

```ts
interface DateObject {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;
  readonly millisecond: number;
}
```

#### `DateObjectTz`

Object containing date and time components, such as `year`, `hour` etc., and a `timezone`.

This is a concrete representation of a date and time, tied to a particular timezone, and thus tied to a particular point in time (i.e. it can be converted to a timestamp).

```ts
interface DateObjectTz {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;
  readonly millisecond: number;
  readonly timezone: string;
}
```
