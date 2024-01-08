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

Converts from a [DateObject](#dateobject) to Unix milliseconds timestamp.

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
// 1_704_066_312_614
// (equal to 2023-12-31T23:45:12.614Z)
// (underscore separators are used here for readability,
//   they will not be present in the actual output)

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

Accepts exactly the same parameters as [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds). It returns a native JavaScript `Date` object.

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
  offset: 'utc-zero-or-offset',
});
console.log(output7); // 2024-01-01T04:45:12Z

const output8 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'UTC',
  offset: 'offset',
});
console.log(output8); // 2024-01-01T04:45:12+00:00

const output9 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'Europe/London',
  offset: 'utc-zero-or-offset',
});
console.log(output9); // 2024-01-01T04:45:12+00:00

const output10 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'America/New_York',
  offset: 'utc-zero-or-offset',
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

#### `dateObjectToTzUnixMilliseconds`

Converts from a [DateObjectTz](#dateobjecttz) to Unix milliseconds timestamp.

It is almost exactly the same function as [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds), but `timezone` is a part of the [DateObjectTz](#dateobjecttz), so it is not necessary to pass it as a separate parameter.

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output = dateObjectTzToUnixMilliseconds(input);
console.log(output);
// 1_704_084_312_614 (equal to 2023-12-31T23:45:12.614-05:00)
```

#### `dateObjectTzToUnixSeconds`

Converts from a [DateObjectTz](#dateobjecttz) to Unix seconds timestamp.

It is almost exactly the same function as [dateObjectToUnixSeconds](#dateobjecttounixseconds), but `timezone` is a part of the [DateObjectTz](#dateobjecttz), so it is not necessary to pass it as a separate parameter.

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output = dateObjectTzToUnixSeconds(input);
console.log(output);
// 1_704_084_312 (equal to 2023-12-31T23:45:12Z)
```

#### `dateObjectTzToJsDate`

Converts from a [DateObjectTz](#dateobjecttz) to native JavaScript `Date` object.

It is almost exactly the same function as [dateObjectToJsDate](#dateobjecttojsdate), but `timezone` is a part of the [DateObjectTz](#dateobjecttz), so it is not necessary to pass it as a separate parameter.

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output = dateObjectTzToJsDate(input);
console.log(output);
// 2024-01-01T04:45:12Z
```

#### `dateObjectTzToIsoDateTime`

Converts from a [DateObjectTz](#dateobjecttz) to ISO datetime string.

It is almost exactly the same function as [dateObjectToIsoDateTime](#dateobjecttoisodatetime), but `timezone` is a part of the [DateObjectTz](#dateobjecttz), so it is not necessary to pass it as a separate parameter.

Examples:

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output1 = dateObjectTzToIsoDateTime(input);
console.log(output1);
// 2024-01-01T04:45:12Z

const output2 = dateObjectTzToIsoDateTime(input, {
  timezone: 'America/New_York',
});
console.log(output2);
// 2023-12-31T23:45:12-05:00
```

See [dateObjectToIsoDateTime](#dateobjecttoisodatetime) for more examples of `options`.

#### `dateObjectTzToIsoDate`

Converts from a [DateObjectTz](#dateobjecttz) to the date part of the ISO string.

It is almost exactly the same function as [dateObjectToIsoDate](#dateobjecttoisodate), but `timezone` is a part of the [DateObjectTz](#dateobjecttz), so it is not necessary to pass it as a separate parameter.

Examples:

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output1 = dateObjectTzToIsoDate(input);
console.log(output1);
// 2024-01-01

const output2 = dateObjectTzToIsoDate(input, {
  timezone: 'America/New_York',
});
console.log(output2);
// 2023-12-31
```

See [dateObjectToIsoDate](#dateobjecttoisodate) for more examples of `options`.

Converts from a [DateObjectTz](#dateobjecttz) to the time part of the ISO string.

It is almost exactly the same function as [dateObjectToIsoTime](#dateobjecttoisotime), but `timezone` is a part of the [DateObjectTz](#dateobjecttz), so it is not necessary to pass it as a separate parameter.

Examples:

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output1 = dateObjectToIsoTzTime(input);
console.log(output1);
// 04:45:12

const output2 = dateObjectToIsoTzTime(input, {
  timezone: 'America/New_York',
});
console.log(output2);
// 23:45:12
```

See [dateObjectToIsoTime](#dateobjecttoisotime) for more examples of `options`.

#### `dateObjectTzToDateObject`

Converts a [DateObjectTz](#dateobjecttz) object to [DateObject](#dateobject). It simply removes the `timezone` field from the input object, and keeps the values of all other fields intact.

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};

const output = dateObjectTzToDateObject(input);
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 23,
//   minute: 45
//   second: 12,
//   millisecond: 614,
// }
```

#### `isoDateTimeToUnixMilliseconds`

Converts from an ISO datetime string to Unix milliseconds timestamp.

If the input string does not contain offset, `UTC` is assumed.

If an invalid ISO datetime string is passed, and error is thrown.

Valid examples:

```ts
const inputs: readonly string[] = [
  '2023-12-31T23:45:12.614Z', // millisecons with zero offset
  '2023-12-31T23:45:12Z', // seconds with zero offset
  '2023-12-31T23:45Z', // minutes with zero offset
  '2023-12-31T23:45:12.614+00:00', // milliseconds with offset
  '2023-12-31T23:45:12.614-01:00', // milliseconds with offset
  '2023-12-31T23:45:12.614+01:00', // milliseconds with offset
  '2023-12-31T23:45:12+01:00', // seconds with offset
  '2023-12-31T23:45+01:00', // minutes with offset
  '2023-12-31T23:45:12.614', // milliseconds without offset
  '2023-12-31T23:45:12', // seconds without offset
  '2023-12-31T23:45', // minutes without offset
  '2024-01-01', // date only
];

const outputs = inputs.map((input) => isoDateTimeToUnixMilliseconds(input));
console.log(outputs);
// [
//   1_704_066_312_614,
//   1_704_066_312_000,
//   1_704_066_300_000,
//   1_704_066_312_614,
//   1_704_069_912_614,
//   1_704_062_712_614,
//   1_704_062_712_000,
//   1_704_062_700_000,
//   1_704_066_312_614,
//   1_704_066_312_000,
//   1_704_066_300_000,
//   1_704_067_200_000,
// ]
```

Invalid ISO datetime strings:

```ts
// each of these would throw an error
'aaa';
'2023-13-01';
'2023-12-32';
'2023-02-29';
'2023-12-31T24:01:00';
'2023-12-31T23:60:00';
'2023-12-31T23:59:60';
```

#### `isoDateTimeToUnixSeconds`

Converts from an ISO datetime string to Unix seconds timestamp. It returns the whole number, i.e. the milliseconds part is truncated (seconds are not rounded).

Other than that, it works exactly the same as [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds).

```ts
const output = isoDateTimeToUnixSeconds('2023-12-31T23:45:12.614Z');
console.log(output);
// 1_704_066_312
```

#### `isoDateTimeToJsDate`

Converts from an ISO datetime string to native JavaScript `Date` object.

Other than that, it works exactly the same as [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds).

```ts
const output = isoDateTimeToJsDate('2023-12-31T23:45:12.614Z');
console.log(output);
// 2023-12-31T23:45:12.614Z
```

#### `isoDateTimeToIsoDateTime`

Converts from an ISO datetime string to another ISO datetime string. It can be used to change the format of the string, or to change the offset.

Accepts the same kinds of ISO datetime input strings as [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds).

For a description of `options`, and more examples, see [dateObjectToIsoDateTime](#dateobjecttoisodatetime).

```ts
const output = isoDateTimeToIsoDateTime('2023-12-31T23:45:12.614Z', {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2024-01-01T04:45:12-05:00
```

#### `isoDateTimeToIsoDate`

Converts from an ISO datetime string to the date part of an ISO datetime string.

Accepts the same kinds of ISO datetime input strings as [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds).

For a description of `options`, and more examples, see [dateObjectToIsoDate](#dateobjecttoisodate).

```ts
const output = isoDateTimeToIsoDate('2023-12-31T23:45:12.614Z', {
  format: 'yyyy-MM-dd',
  timezone: 'America/New_York',
});
console.log(output);
// 2024-01-01
```

#### `isoDateTimeToIsoTime`

Converts from an ISO datetime string to the time part of an ISO datetime string.

Accepts the same kinds of ISO datetime input strings as [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds).

For a description of `options`, and more examples, see [dateObjectToIsoTime](#dateobjecttoisotime).

```ts
const output = isoDateTimeToIsoTime('2023-12-31T23:45:12.614Z', {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 04:45:12
```

#### `isoDateTimeToDateObject`

Converts from an ISO datetime string to [DateObject](#dateobject).

Accepts the same kinds of ISO datetime input strings as [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds).

Input strings are interpreted in the same way as in [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds), i.e. if the input string does not contain offset, `UTC` is assumed.

After that interpretation (where we already have an exact point in time), the `timezone` parameter is used to determine the local time (meaning the values of `year`, `month`, `day`, `hour`, `minute`, `second` and `millisecond` fields) for that time point in that timezone.

`timezone` is optional, if not provided defaults to `UTC`.

To clarify the process:

- Lets say the input string is `2023-12-31T23:45:12.614`, and timezone parameter is `America/New_York`.
- Since the input string does not contain offset, `UTC` is assumed, and the input string is interpreted as `2023-12-31T23:45:12.614Z`.
- That exact point in time (`2023-12-31T23:45:12.614Z`) is then converted to the representation in the `America/New_York` timezone, which is `2023-12-31T18:45:12.614-05:00`.
- Meaning, local time for that point in time in `America/New_York` timezone is year `2023`, month `12`, day `31`, hour `18`, minute `45`, second `12` and millisecond `614`.
- These values are the components of the resulting [DateObject](#dateobject).
- ([DateObject](#dateobject) represents an abstract time, not tied to any particular timezone, and therefore not tied to any particular point in time. By assigning it a timezone, if and when we choose to, we can again fix it to a particular point in time.)

```ts
const output = isoDateTimeToDateObject('2023-12-31T23:45:12.614', 'America/New_York');
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 18,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
// }
```

#### `isoDateTimeToDateObjectTz`

Converts from an ISO datetime string to [DateObjectTz](#dateobjecttz).

It is very similar to [isoDateTimeToDateObject](#isodatetimetodateobject), but it returns a [DateObjectTz](#dateobjecttz) which contains the `timezone` field, and therefore represents a concrete point in time.

```ts
const output = isoDateTimeToDateObject('2023-12-31T23:45:12.614', 'America/New_York');
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 18,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'America/New_York',
// }
```

#### `unixMillisecondsToUnixSeconds`

Converts Unix milliseconds timestamp to Unix seconds timestamp. It returns the whole number, i.e. the milliseconds part is truncated (seconds are not rounded).

```ts
const output = unixMillisecondsToUnixSeconds(1_704_066_312_614);
console.log(output);
// 1_704_066_312
```

#### `unixMillisecondsToJsDate`

Converts Unix milliseconds timestamp to native JavaScript `Date` object.

```ts
const output = isoDateTimeToUnixSeconds(1_704_066_312_614);
console.log(output);
// 2023-12-31T23:45:12.614Z
```

#### `unixMillisecondsToIsoDateTime`

Converts unix milliseconds timestamp to ISO datetime string.

It accepts `options` as a second parameter. For more details, and more examples, see [dateObjectToIsoDateTime](#dateobjecttoisodatetime).

```ts
const output = unixMillisecondsToIsoDateTime(1_704_066_312_614, {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2024-01-01T04:45:12-05:00
```

#### `unixMillisecondsToIsoDate`

Converts unix milliseconds timestamp to date part of the ISO datetime string.

It accepts `options` as a second parameter. and more examples, see [dateObjectToIsoDate](#dateobjecttoisodate).

```ts
const output = unixMillisecondsToIsoDate(1_704_066_312_614, {
  format: 'yyyy-MM-dd',
  timezone: 'America/New_York',
});
console.log(output);
// 2024-01-01
```

#### `unixMillisecondsToIsoTime`

Converts unix milliseconds timestamp to time part of the ISO datetime string.

It accepts `options` as a second parameter. and more examples, see [dateObjectToIsoTime](#dateobjecttoisotime).

```ts
const output = unixMillisecondsToIsoTime(1_704_066_312_614, {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 04:45:12
```

#### `unixMillisecondsToDateObject`

Converts Unix milliseconds timestamp to [DateObject](#dateobject).

Given the time instance specified by the input Unix milliseconds, the `timezone` parameter is used to determine the local time (meaning the values of `year`, `month`, `day`, `hour`, `minute`, `second` and `millisecond` fields) for that time point.

`timezone` is optional, if not provided defaults to `UTC`.

```ts
const output = isoDateTimeToDateObject(1_704_066_312_614, 'America/New_York');
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 18,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
// }
```

#### `unixMillisecondsToDateObjectTz`

Converts Unix milliseconds timestamp to [DateObjectTz](#dateobjecttz).

It is very similar to [isoDateTimeToDateObject](#isodatetimetodateobject), but it returns a [DateObjectTz](#dateobjecttz) which contains the `timezone` field, and therefore represents a concrete point in time.

```ts
const output = isoDateTimeToDateObject(1_704_066_312_614, 'America/New_York');
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 18,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'America/New_York',
// }
```

#### `unixSecondsToUnixMilliseconds`

Converts Unix seconds timestamp to Unix millseconds timestamp.

```ts
const output = unixSecondsToUnixMilliseconds(1_704_066_312);
console.log(output);
// 1_704_066_312_000
```

#### `unixSecondsToJsDate`

Converts Unix seconds timestamp to native JavaScript `Date` object.

```ts
const output = unixSecondsToJsDate(1_704_066_312);
console.log(output);
// 2023-12-31T23:45:12.000Z
```

#### `unixSecondsToIsoDateTime`

Converts Unix seconds timestamp to ISO datetime string.

It accepts `options` as a second parameter. For more details, and more examples, see [dateObjectToIsoDateTime](#dateobjecttoisodatetime).

```ts
const output = unixSecondsToIsoDateTime(1_704_066_312, {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2024-01-01T04:45:12-05:00
```

#### `unixSecondsToIsoDate`

Converts Unix seconds timestamp to date part of the ISO datetime string.

It accepts `options` as a second parameter. and more examples, see [dateObjectToIsoDate](#dateobjecttoisodate).

```ts
const output = unixSecondsToIsoDate(1_704_066_312, {
  format: 'yyyy-MM-dd',
  timezone: 'America/New_York',
});
console.log(output);
// 2024-01-01
```

#### `unixSecondsToIsoTime`

Converts Unix seconds timestamp to time part of the ISO datetime string.

It accepts `options` as a second parameter. and more examples, see [dateObjectToIsoTime](#dateobjecttoisotime).

```ts
const output = unixSecondsToIsoTime(1_704_066_312, {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 04:45:12
```

#### `unixSecondsToDateObject`

Converts Unix seconds timestamp to [DateObject](#dateobject).

Given the time instance specified by the input Unix seconds, the `timezone` parameter is used to determine the local time (meaning the values of `year`, `month`, `day`, `hour`, `minute`, `second` and `millisecond` fields) for that time point.

`timezone` is optional, if not provided defaults to `UTC`.

```ts
const output = isoDateTimeToDateObject(1_704_066_312, 'America/New_York');
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 18,
//   minute: 45,
//   second: 12,
//   millisecond: 0,
// }
```

#### `unixSecondsToDateObjectTz`

Converts Unix milliseconds timestamp to [DateObjectTz](#dateobjecttz).

It is very similar to [isoDateTimeToDateObject](#isodatetimetodateobject), but it returns a [DateObjectTz](#dateobjecttz) which contains the `timezone` field, and therefore represents a concrete point in time.

```ts
const output = isoDateTimeToDateObject(1_704_066_312, 'America/New_York');
console.log(output);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 18,
//   minute: 45,
//   second: 12,
//   millisecond: 0,
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
