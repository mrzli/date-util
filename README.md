# Date Util

This library implements functions for:

- Manipulating dates.
- Converting dates between various forms.

Date forms which are supported:

- `JsDate` - Native JavaScript `Date` object.
- `UnixMilliseconds` - Timestamps representing number of milliseconds since the Unix epoch.
- `UnixSeconds` - Timestamps representing number of seconds since the Unix epoch.
- `IsoDateTime` - ISO datetime string.
- `DateObject` - See [DateObject](#dateobject).
- `DateObjectTz` - See [DateObjectTz](#dateobjecttz).

## Installation

```bash
npm install --save @gmjs/date-util
```

## API

### Converters

These are the functions for converting dates between various forms. Conversion between most pairs of forms are supported.

#### `dateObjectToUnixMilliseconds`

Converts from a [DateObject](#dateobject) Unix milliseconds timestamp.

It accepts `timezone` as a second parameter, which is optional and defaults to `UTC`. Since [DateObject](#dateobject) is not tied to a particular timezone, the `timezone` parameter is required to determine the point in time.

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};

const output1 = dateObjectToUnixMilliseconds(input);
console.log(output1);
// 1_704_066_312_614 (equal to 2023-12-31T23:45:12.614Z)

const output2 = dateObjectToUnixMilliseconds(input, 'UTC'); // same as output1
console.log(output2);
// 1_704_066_312_614 (equal to 2023-12-31T23:45:12.614Z)

const output3 = dateObjectToUnixMilliseconds(input, 'America/New_York');
console.log(output3);
// 1_704_084_312_614 (equal to 2024-01-01T04:45:12.614Z)
```

#### `dateObjectToUnixSeconds`

Accepts exactly the same parameters as [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). It returns a Unix seconds timestamp. It returns the whole number, i.e. the milliseconds part is truncated (seconds are not rounded).

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};

const output1 = dateObjectToUnixSeconds(input);
console.log(output1);
// 1_704_066_312 (equal to 2023-12-31T23:45:12Z)

const output2 = dateObjectToUnixSeconds(input, 'UTC');
console.log(output2);
// 1_704_066_312 (equal to 2023-12-31T23:45:12Z)

const output3 = dateObjectToUnixSeconds(input, 'America/New_York');
console.log(output3);
// 1_704_084_312 (equal to 2024-01-01T04:45:12Z)
```

#### `dateObjectToJsDate`

Accepts exactly the same parameters as [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). It returns a Unix seconds timestamp. It returns the whole number, i.e. the milliseconds part is truncated (not rounded).

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};
const output1 = dateObjectToJsDate(input);
console.log(output1);
// 2023-12-31T23:45:12Z
// (output will vary depending on how your environment prints Date objects)

const output2 = dateObjectToJsDate(input, 'UTC'); // same as output1
console.log(output2);
// 2023-12-31T23:45:12Z

const output = dateObjectToJsDate(input, 'America/New_York');
console.log(output);
// 2024-01-01T04:45:12Z
```

#### `dateObjectToIsoDateTime`

First two parameters are exactly the same as in [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). The third parameters is an optional [ToIsoDateTimeOptions](#toisodatetimeoptions) object (see link for description of fields).

The second parameter, the standalone `timezone` refers to the timezone that will be assigned to the abstract time defined by the first parameter's [DateObject](#dateobject). The `timezone` field in the `options` object refers to the timezone (offset) of the output ISO datetime string.

Defaults for `options` are:

```ts
{
  timeFormat: 'HH:mm:ss',
  timezone: 'UTC',
  offset: 'utc-zero-or-offset',
}
```

Examples:

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};

const output1 = dateObjectToIsoDateTime(input);
console.log(output1);
// 2023-12-31T23:45:12Z

const output2 = dateObjectToIsoDateTime(input, 'America/New_York');
console.log(output2);
// 2024-01-01T04:45:12Z
// the output is (by default) in UTC
// it refers (of course) to the same point in time as the input
//   which is in 'America/New_York' timezone, at 2023-12-31T23:45:12.614-05:00

const output3 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'America/New_York',
});
console.log(output3);
// 2023-12-31T23:45:12-05:00
// now we display the input time point (2023-12-31T23:45:12-05:00)
//   in the 'America/New_York', which is again '2023-12-31T23:45:12-05:00'

const output4 = dateObjectToIsoDateTime(input, 'UTC', {
  timezone: 'America/New_York',
});
console.log(output4);
// 2023-12-31T18:45:12-05:00
// now we display the input time point (2023-12-31T23:45:12Z)
//   in the 'America/New_York', which '2023-12-31T18:45:12-05:00'

const output5 = dateObjectToIsoDateTime(input, 'UTC', {
  timeFormat: 'HH:mm:ss.SSS',
  timezone: 'America/New_York',
});
console.log(output5);
// 2023-12-31T18:45:12.614-05:00
// various output formats are supported, see ToIsoDateTimeOptions

const output6 = dateObjectToIsoDateTime(input, 'UTC', {
  timeFormat: 'HH:mm:ss.SSS',
  timezone: 'America/New_York',
  offset: 'none'
});
console.log(output6);
// 2023-12-31T18:45:12.614
// removes the offset part from the output
```

```ts
const output7 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'UTC',
  offset: 'utc-zero-or-offset'
});
console.log(output7);  // 2024-01-01T04:45:12Z

const output8 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'UTC',
  offset: 'offset'
});
console.log(output8);  // 2024-01-01T04:45:12+00:00

const output9 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'Europe/London',
  offset: 'utc-zero-or-offset'
});
console.log(output9);  // 2024-01-01T04:45:12+00:00

const output10 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'America/New_York',
  offset: 'utc-zero-or-offset'
});
console.log(output10); // 2023-12-31T23:45:12-05:00

// the input time point is (2023-12-31T23:45:12.614-05:00) for all three calls
// offset parameter determines how (and whether) the offset is displayed in the output
// if the value of offset is 'offset'
//   - the offset is always displayed in the +/-HH:mm format
// if the value of offset is 'utc-zero-or-offset'
//   - if the timezone is 'UTC', the offset is displayed as 'Z'
//   - if the timezone is not 'UTC',
//     even if the timezone offset is same as for UTC at +00:00
//     (like for 'Europe/London' in the output9 example above),
//     the offset is displayed in the +/-HH:mm format
```

#### `dateObjectToIsoDate`

First two parameters are exactly the same as in [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). The third parameters is an optional [ToIsoDateOptions](#toisodateoptions) object (see link for description of fields).

Works similar to [dateObjectToIsoDateTime](#dateobjecttoisodatetime), except that the output is the date-only part of the ISO string, and offset is never displayed. This means that there is no `offset` option in the `options` object, and `format` options are different than `timeFormat` options in [ToIsoDateTimeOptions](#toisodatetimeoptions), but formatting in principle works the same way, and timezones are handled the same way.

Defaults for `options` are:

```ts
{
  format: 'yyyy-MM-dd',
  timezone: 'UTC',
}
```

Examples:

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};

const output1 = dateObjectToIsoDate(input);
console.log(output1);
// 2023-12-31

const output2 = dateObjectToIsoDate(input, 'America/New_York');
console.log(output2);
// 2024-01-01

const output3 = dateObjectToIsoDate(input, 'America/New_York', {
  timezone: 'America/New_York',
});
console.log(output3);
// 2023-12-31

const output4 = dateObjectToIsoDate(input, 'UTC', {
  timezone: 'America/New_York',
});
console.log(output4);
// 2023-12-31

const output5 = dateObjectToIsoDate(input, 'America/New_York', {
  timezone: 'Europe/Berlin',
});
console.log(output5);
// 2024-01-01
// in other words, when it is 2023-12-31T23:45:12.614-05:00 in New York,
//   it is 2024-01-01T05:45:12.614+01:00 in Berlin
//   (same point in time, but one part of the world already went into its New Year)

const output6 = dateObjectToIsoDate(input, 'UTC', {
  timeFormat: 'yyyy-MM',
});
console.log(output6);
// 2023-12
```

#### `dateObjectToIsoTime`

First two parameters are exactly the same as in [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). The third parameters is an optional [ToIsoTimeOptions](#toisotimeoptions) object (see link for description of fields).

Works similar to [dateObjectToIsoDateTime](#dateobjecttoisodatetime), except that the output is the time-only part of the ISO string, and offset is never displayed. This means that there is no `offset` option in the `options` object, and `format` options are different than `timeFormat` options in [ToIsoDateTimeOptions](#toisodatetimeoptions), but formatting in principle works the same way, and timezones are handled the same way.

Defaults for `options` are:

```ts
{
  format: 'HH:mm:ss',
  timezone: 'UTC',
}
```

Examples:

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};

const output1 = dateObjectToIsoTime(input);
console.log(output1);
// 23:45:12

const output2 = dateObjectToIsoTime(input, 'America/New_York');
console.log(output2);
// 04:45:12

const output3 = dateObjectToIsoTime(input, 'America/New_York', {
  timezone: 'America/New_York',
});
console.log(output3);
// 23:45:12

const output4 = dateObjectToIsoTime(input, 'UTC', {
  timezone: 'America/New_York',
});
console.log(output4);
// 18:45:12

const output5 = dateObjectToIsoTime(input, 'America/New_York', {
  timezone: 'Europe/Berlin',
});
console.log(output5);
// 05:45:12

const output6 = dateObjectToIsoTime(input, 'UTC', {
  timeFormat: 'HH:mm:ss.SSS',
});
console.log(output6);
// 23:45:12.614
```

#### `dateObjectToDateObjectTz`

Accepts exactly the same parameters as [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). It returns a [DateObjectTz](#dateobjecttz) object, which is essentially the same as [DateObject](#dateobject), but with an additional `timezone` field.

This function simply constructs a [DateObjectTz](#dateobjecttz) object from the input [DateObject](#dateobject) and the `timezone` parameter.

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
};

const output1 = dateObjectToDateObjectTz(input);
console.log(output1);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 23,
//   minute: 45
//   second: 12,
//   millisecond: 614,
//   timezone: 'UTC',
// }

const output2 = dateObjectToDateObjectTz(input, 'America/New_York');
console.log(output2);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 23,
//   minute: 45
//   second: 12,
//   millisecond: 614,
//   timezone: 'America/New_York',
// }
```

## Types

### `ToIsoDateTimeOptions`

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
