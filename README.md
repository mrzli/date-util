# Date Util

This library implements functions for:

- Converting dates between various forms.
- Manipulating dates.

Date forms which are supported:

- `JsDate` - Native JavaScript `Date` object.
- `UnixMilliseconds` - Timestamp representing number of milliseconds since the Unix epoch.
- `UnixSeconds` - Timestamp representing number of seconds since the Unix epoch.
- `IsoDateTime` - ISO datetime string.
- `DateObject` - See [DateObject](#dateobject).
- `DateObjectTz` - See [DateObjectTz](#dateobjecttz).

**No function will mutate the original object, even if wording for any of the function would seem to imply otherwise.**

## Installation

```bash
npm install --save @gmjs/date-util
```

### API Listing

#### Converters

##### `dateObjectTo*`

- [dateObjectToUnixMilliseconds](#dateobjecttounixmilliseconds) - Converts from a [DateObject](#dateobject) to Unix milliseconds timestamp.
- [dateObjectToUnixSeconds](#dateobjecttounixseconds) - Converts from a [DateObject](#dateobject) to Unix seconds timestamp.
- [dateObjectToJsDate](#dateobjecttojsdate) - Converts from a [DateObject](#dateobject) to native JavaScript `Date` object.
- [dateObjectToIsoDateTime](#dateobjecttoisodatetime) - Converts from a [DateObject](#dateobject) to ISO datetime string.
- [dateObjectToIsoDate](#dateobjecttoisodate) - Converts from a [DateObject](#dateobject) to ISO date string.
- [dateObjectToIsoTime](#dateobjecttoisotime) - Converts from a [DateObject](#dateobject) to ISO time string.
- [dateObjectToDateObjectTz](#dateobjecttodateobjecttz) - Converts from a [DateObject](#dateobject) to [DateObjectTz](#dateobjecttz).

##### `dateObjectTzTo*`

- [dateObjectTzToUnixMilliseconds](#dateobjecttztounixmilliseconds) - Converts from a [DateObjectTz](#dateobjecttz) to Unix milliseconds timestamp.
- [dateObjectTzToUnixSeconds](#dateobjecttztounixseconds) - Converts from a [DateObjectTz](#dateobjecttz) to Unix seconds timestamp.
- [dateObjectTzToJsDate](#dateobjecttztojsdate) - Converts from a [DateObjectTz](#dateobjecttz) to native JavaScript `Date` object.
- [dateObjectTzToIsoDateTime](#dateobjecttztoisodatetime) - Converts from a [DateObjectTz](#dateobjecttz) to ISO datetime string.
- [dateObjectTzToIsoDate](#dateobjecttztoisodate) - Converts from a [DateObjectTz](#dateobjecttz) to ISO date string.
- [dateObjectTzToIsoTime](#dateobjecttztoisotime) - Converts from a [DateObjectTz](#dateobjecttz) to ISO time string.
- [dateObjectTzToDateObject](#dateobjecttztodateobject) - Converts from a [DateObjectTz](#dateobjecttz) to [DateObject](#dateobject).

##### `isoDateTimeTo*`

- [isoDateTimeToUnixMilliseconds](#isodatetimetounixmilliseconds) - Converts from an ISO datetime string to Unix milliseconds timestamp.
- [isoDateTimeToUnixSeconds](#isodatetimetounixseconds) - Converts from an ISO datetime string to Unix seconds timestamp.
- [isoDateTimeToJsDate](#isodatetimetojsdate) - Converts from an ISO datetime string to native JavaScript `Date` object.
- [isoDateTimeToIsoDateTime](#isodatetimetoisodatetime) - Converts from an ISO datetime string to (another) ISO datetime string.
- [isoDateTimeToIsoDate](#isodatetimetoisodate) - Converts from an ISO datetime string to ISO date string.
- [isoDateTimeToIsoTime](#isodatetimetoisotime) - Converts from an ISO datetime string to ISO time string.
- [isoDateTimeToDateObject](#isodatetimetodateobject) - Converts from an ISO datetime string to [DateObject](#dateobject).
- [isoDateTimeToDateObjectTz](#isodatetimetodateobjecttz) - Converts from an ISO datetime string to [DateObjectTz](#dateobjecttz).

##### `jsDateTo*`

- [jsDateToUnixMilliseconds](#jsdatetounixmilliseconds) - Converts from a native JavaScript `Date` object to Unix milliseconds timestamp.
- [jsDateToUnixSeconds](#jsdatetounixseconds) - Converts from a native JavaScript `Date` object to Unix seconds timestamp.
- [jsDateToIsoDateTime](#jsdatetoisodatetime) - Converts from a native JavaScript `Date` object to ISO datetime string.
- [jsDateToIsoDate](#jsdatetoisodate) - Converts from a native JavaScript `Date` object to ISO date string.
- [jsDateToIsoTime](#jsdatetoisotime) - Converts from a native JavaScript `Date` object to ISO time string.
- [jsDateToDateObject](#jsdatetodateobject) - Converts from a native JavaScript `Date` object to [DateObject](#dateobject).
- [jsDateToDateObjectTz](#jsdatetodateobjecttz) - Converts from a native JavaScript `Date` object to [DateObjectTz](#dateobjecttz).

##### `unixMillisecondsTo*`

- [unixMillisecondsToUnixSeconds](#unixmillisecondstounixseconds) - Converts from a Unix milliseconds timestamp to Unix seconds timestamp.
- [unixMillisecondsToJsDate](#unixmillisecondstojsdate) - Converts from a Unix milliseconds timestamp to native JavaScript `Date` object.
- [unixMillisecondsToIsoDateTime](#unixmillisecondstoisodatetime) - Converts from a Unix milliseconds timestamp to ISO datetime string.
- [unixMillisecondsToIsoDate](#unixmillisecondstoisodate) - Converts from a Unix milliseconds timestamp to ISO date string.
- [unixMillisecondsToIsoTime](#unixmillisecondstoisotime) - Converts from a Unix milliseconds timestamp to ISO time string.
- [unixMillisecondsToDateObject](#unixmillisecondstodateobject) - Converts from a Unix milliseconds timestamp to [DateObject](#dateobject).
- [unixMillisecondsToDateObjectTz](#unixmillisecondstodateobjecttz) - Converts from a Unix milliseconds timestamp to [DateObjectTz](#dateobjecttz).

##### `unixSecondsTo*`

- [unixSecondsToUnixMilliseconds](#unixsecondstounixmilliseconds) - Converts from a Unix seconds timestamp to Unix milliseconds timestamp.
- [unixSecondsToJsDate](#unixsecondstojsdate) - Converts from a Unix seconds timestamp to native JavaScript `Date` object.
- [unixSecondsToIsoDateTime](#unixsecondstoisodatetime) - Converts from a Unix seconds timestamp to ISO datetime string.
- [unixSecondsToIsoDate](#unixsecondstoisodate) - Converts from a Unix seconds timestamp to ISO date string.
- [unixSecondsToIsoTime](#unixsecondstoisotime) - Converts from a Unix seconds timestamp to ISO time string.
- [unixSecondsToDateObject](#unixsecondstodateobject) - Converts from a Unix seconds timestamp to [DateObject](#dateobject).
- [unixSecondsToDateObjectTz](#unixsecondstodateobjecttz) - Converts from a Unix seconds timestamp to [DateObjectTz](#dateobjecttz).

#### Add Duration to Date

- [dateObjectAdd](#dateobjectadd) - Adds a duration to a [DateObject](#dateobject).
- [dateObjectTzAdd](#dateobjecttzadd) - Adds a duration to a [DateObjectTz](#dateobjecttz).
- [isoDateTimeAdd](#isodatetimeadd) - Adds a duration to an ISO datetime string.
- [jsDateAdd](#jsdateadd) - Adds a duration to a native JavaScript `Date` object.
- [unixMillisecondsAdd](#unixmillisecondsadd) - Adds a duration to a Unix milliseconds timestamp.
- [unixSecondsAdd](#unixsecondsadd) - Adds a duration to a Unix seconds timestamp.

## API

### Converters General Information

This section contains information that apply to converter functions in general.

#### Groups

There are six supported date forms. If we group converter function by input date form, we get six groups:

- `dateObjectTo*` - [DateObject](#dateobject) to other forms.
- `dateObjectTzTo*` - [DateObjectTz](#dateobjecttz) to other forms.
- `isoDateTimeTo*` - ISO datetime string to other forms.
- `jsDateTo*` - Native JavaScript `Date` object to other forms.
- `unixMillisecondsTo*` - Unix milliseconds timestamp to other forms.
- `unixSecondsTo*` - Unix seconds timestamp to other forms.

In each group, there is a function for converting to each of the other five remaining date forms.

Additionally there are two function for converting into the [ISO Partial Forms](#partial-date-forms), `IsoDate` and `IsoTime`. These partial forms are not intended to be used as inputs in conversions, only for outputs (formatting).

It usually makes no sense to 'convert' from one date form to the same form - i.e. it would not make sense to have `unixMillisecondsToUnixMilliseconds` function - it would simply be an identity function.

There is, however, a single exception to the above rule: [isoDateTimeToIsoDateTime](#isodatetimetoisodatetime) function. We have it because it can be used to change the format of the ISO datetime string, or to change the timezone offset while representing the same point in time.

This means there are:

- 6 groups of converter functions.
- (6 - 1) = 5 functions in each group for converting to other forms.
- 2 additional functions in each group for converting to [ISO Partial Forms](#partial-date-forms).
- 1 additional function in total where output date form is the same as input date form - [isoDateTimeToIsoDateTime](#isodatetimetoisodatetime).
- This all amounts to a total of 43 converter functions.

#### Parameters for Converter Functions

##### Input Date

All converter functions take the input date as the first parameter.

###### DateObject Input Date

All `dateObjectTo*` examples will assume the following input [DateObject](#dateobject):

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45,
  second: 12,
  millisecond: 614,
};
```

###### DateObjectTz Input Date

All `dateObjectTzTo*` examples will assume the following input [DateObjectTz](#dateobjecttz):

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45,
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};
```

###### ISO DateTime Input Date

For ISO datetime string inputs (`isoDateTimeTo*` functions), a valid ISO datetime string is expected, otherwise an error will be throws.

Here are some examples of valid ISO datetime strings:

```ts
'2023-12-31T23:45:12.614Z'; // millisecons with zero offset
'2023-12-31T23:45:12Z'; // seconds with zero offset
'2023-12-31T23:45Z'; // minutes with zero offset
'2023-12-31T23:45:12.614+00:00'; // milliseconds with offset
'2023-12-31T23:45:12.614-01:00'; // milliseconds with offset
'2023-12-31T23:45:12.614+01:00'; // milliseconds with offset
'2023-12-31T23:45:12+01:00'; // seconds with offset
'2023-12-31T23:45+01:00'; // minutes with offset
'2023-12-31T23:45:12.614'; // milliseconds without offset
'2023-12-31T23:45:12'; // seconds without offset
'2023-12-31T23:45'; // minutes without offset
'2024-01-01'; // date only
```

And here are some examples of invalid ISO datetime strings:

```ts
'aaa';
'2023-13-01';
'2023-12-32';
'2023-02-29';
'2023-12-31T24:01:00';
'2023-12-31T23:60:00';
'2023-12-31T23:59:60';
```

If no offset is specified in the input ISO datetime string, `UTC` is assumed.

##### Input Timezone

All `dateObjectTo*` functions take `inputTimezone` as the second parameter. This is the missing piece of information information that is added to the input [DateObject](#dateobject) to make it a concrete date representation. See more info about [conversion requirements](#input-date-requirements-for-conversion), [concrete date forms](#concrete-date-forms), and [abstract date forms](#abstract-date-forms).

No functions besides `dateObjectTo*` take `inputTimezone` as a parameter since all other full date forms are [concrete](#concrete-date-forms).

##### Output Options

All `*ToIso*` functions take `options` as the second parameter (or third parameter in case or `dateObjectTo*` functions). This is an optional object which contains options for output formatting.

There are three types of `options` objects for the three target ISO forms: [ToIsoDateTimeOptions](#toisodatetimeoptions), [ToIsoDateOptions](#toisodateoptions), and [ToIsoTimeOptions](#toisotimeoptions).

All of these types of options objects have a `timezone` field. This timezone is the timezone in which the output ISO string will be displayed. In other words, we want the output ISO string to to be the representation of the same point in time specified by input, but from the point of view of someone in the `timezone` timezone.

Maybe the wording of the previous paragraph is not clear, so an example should help:

```ts
const input = 1_704_066_312_614; // 2023-12-31T23:45:12.614Z
const output = unixMillisecondsToIsoDateTime(input, {
  timezone: 'America/New_York',
});
console.log(output);
// 2023-12-31T18:45:12-05:00
```

Above, the following happens:

- We pass in a Unix milliseconds timestamp, `1_704_066_312_614`, which represents `2023-12-31T23:45:12.614Z`.
- The output is that same point in time as seen from `America/New_York` timezone. It is earlier in the evening in New York, specifically `2023-12-31T18:45:12-05:00`.

###### ISO DateTime

`*ToIsoDateTime` takes [ToIsoDateTimeOptions](#toisodatetimeoptions) as the `options` parameter.

Check the [object type description](#toisodatetimeoptions) for more information about what `timeFormat` and `offset` options are used for.

If not otherwise specified, default values for [ToIsoDateTimeOptions](#toisodatetimeoptions) `options` are:

```ts
{
  timeFormat: 'HH:mm:ss',
  timezone: 'UTC',
  offset: 'utc-zero-or-offset',
}
```

###### ISO Date

`*ToIsoDate` takes [ToIsoDateOptions](#toisodateoptions) as the `options` parameter.

Check the [object type description](#toisodateoptions) for more information about what `format` is used for.

If not otherwise specified, default values for [ToIsoDateOptions](#toisodateoptions) `options` are:

```ts
{
  format: 'yyyy-MM-dd',
  timezone: 'UTC',
}
```

###### ISO Time

`*ToIsoTime` takes [ToIsoTimeOptions](#toisotimeoptions) as the `options` parameter.

Check the [object type description](#toisotimeoptions) for more information about what `format` is used for.

If not otherwise specified, default values for [ToIsoTimeOptions](#toisotimeoptions) `options` are:

```ts
{
  format: 'HH:mm:ss',
  timezone: 'UTC',
}
```

#### Output Timezone

All `*ToDateObject` and `*ToDateObjectTz` functions take `timezone` as the second parameter (or third parameter in the case of `dateObjectToDateObjectTz`). This is the timezone in which the output [DateObject](#dateobject) or [DateObjectTz](#dateobjecttz) will be displayed.

It functions the same way as the `options.timezone` described in [output options](#output-options) section.

#### Input Date Requirements for Conversion

To be able to convert date from one form to another, the date representation of the input form needs to be concrete (represent a specific point in time), or additional information needs to be provided to make it concrete.

Foe example, `1_704_084_312` is a Unix milliseconds timestamp. It is a concrete date form, it represents a specific point in time - `2023-12-31T23:45:12.614Z`.

If we just had `2023-12-31T23:45:12.614` and we were not able to make any assumptions about the timezone, that would be an abstract time.

We would not be able to convert it to a Unix milliseconds timestamp, because that abstract time could represent multiple different concrete points in time, such as:

```
2023-12-31T23:45:12.614Z      => 2023-12-31T23:45:12.614Z
2023-12-31T23:45:12.614+01:00 => 2023-12-31T22:45:12.614Z
2023-12-31T23:45:12.614-01:00 => 2024-01-01T00:45:12.614Z
...
```

#### Concrete Date Forms

Out of the six supported date forms (`JsDate`, `UnixMilliseconds`, `UnixSeconds`, `IsoDateTime`, `DateObject`, `DateObjectTz`), all but [DateObject](#dateobject) represent concrete times - meaning a specific point in time.

Even `IsoDateTime` without offset information - such as `2023-12-31T23:45:12.614` - is considered to represent a specific point in time when given as an input date, because (unlike in the example given in the previous section) we are interpreting ISO datetime strings without offset information as if they were in `UTC`.

Therefore, `2023-12-31T23:45:12.614` would be interpreted as `2023-12-31T23:45:12.614Z`.

#### Abstract Date Forms

[DateObject](#dateobject) is the only abstract date form out of the six supported. While it has all the time components from `year` down to `millisecond`, it is missing `timezone` information to be able represent a specific point in time.

Because of this, functions which convert from [DateObject](#dateobject) to other forms - i.e. `dateObjectTo*` - always take `inputTimezone` as a second parameter.

As in other converter functions, the first parameter is always the input date form. The `inputTimezone` parameter fills in the missing [DateObject](#dateobject) information, and allows the conversion to happen.

The `inputTimezone` parameter is always optional, and if not provided, it defaults to `UTC`.

#### Partial Date Forms

In addition to the six full date forms, there are two partial date forms - `IsoDate` and `IsoTime`. These represent only the date or time parts of the full ISO datetime string. Depending on the `format` option used when converting to these partial forms, they can even represent just a part of the date or time, such as month and day (`MM-dd`), or only minutes (`mm`).

Most of such formats (all except the date ones starting with `yyyy`) don't contain full information which would be necessary to determine a specific point in time. This is not relevant in our discussion about concrete and abstract date forms since converter functions never take partial date forms as input. They are only used as output formats.

### Converters

Here is a list of functions for converting dates between various forms.

#### `dateObjectToUnixMilliseconds`

Converts from a [DateObject](#dateobject) to Unix milliseconds timestamp.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

const output1 = dateObjectToUnixMilliseconds(input);
console.log(output1);
// 1_704_066_312_614 (equal to 2023-12-31T23:45:12.614Z)
// (underscore separators for timestamps are used here for readability,
//   they will not be present in the actual output)

const output2 = dateObjectToUnixMilliseconds(input, 'UTC'); // same as output1
console.log(output2);
// 1_704_066_312_614 (equal to 2023-12-31T23:45:12.614Z)

const output3 = dateObjectToUnixMilliseconds(input, 'America/New_York');
console.log(output3);
// 1_704_084_312_614 (equal to 2024-01-01T04:45:12.614Z)
```

#### `dateObjectToUnixSeconds`

Converts from a [DateObject](#dateobject) to Unix seconds timestamp. Milliseconds are truncated, i.e. seconds are not rounded.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

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

Converts from a [DateObject](#dateobject) to native JavaScript `Date` object.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

const output1 = dateObjectToJsDate(input);
console.log(output1);
// 2023-12-31T23:45:12.614Z
// (output will vary depending on how your environment prints Date objects)

const output2 = dateObjectToJsDate(input, 'UTC'); // same as output1
console.log(output2);
// 2023-12-31T23:45:12.614Z

const output = dateObjectToJsDate(input, 'America/New_York');
console.log(output);
// 2024-01-01T04:45:12.614Z
```

#### `dateObjectToIsoDateTime`

Converts from a [DateObject](#dateobject) to ISO datetime string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

const output1 = dateObjectToIsoDateTime(input);
console.log(output1);
// 2023-12-31T23:45:12Z

const output2 = dateObjectToIsoDateTime(input, 'America/New_York');
console.log(output2);
// 2024-01-01T04:45:12Z

const output3 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'America/New_York',
});
console.log(output3);
// 2023-12-31T23:45:12-05:00

const output4 = dateObjectToIsoDateTime(input, 'UTC', {
  timezone: 'America/New_York',
});
console.log(output4);
// 2023-12-31T18:45:12-05:00

const output5 = dateObjectToIsoDateTime(input, 'UTC', {
  timeFormat: 'HH:mm:ss.SSS',
  timezone: 'America/New_York',
});
console.log(output5);
// 2023-12-31T18:45:12.614-05:00

const output6 = dateObjectToIsoDateTime(input, 'UTC', {
  timeFormat: 'HH:mm:ss.SSS',
  timezone: 'America/New_York',
  offset: 'none'
});
console.log(output6);
// 2023-12-31T18:45:12.614

const output7 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'UTC',
  offset: 'utc-zero-or-offset',
});
console.log(output7);
// 2024-01-01T04:45:12Z

const output8 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'UTC',
  offset: 'offset',
});
console.log(output8);
// 2024-01-01T04:45:12+00:00

const output9 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'Europe/London',
  offset: 'utc-zero-or-offset',
});
console.log(output9);
// 2024-01-01T04:45:12+00:00

const output10 = dateObjectToIsoDateTime(input, 'America/New_York', {
  timezone: 'America/New_York',
  offset: 'utc-zero-or-offset',
});
console.log(output10);
// 2023-12-31T23:45:12-05:00
```

#### `dateObjectToIsoDate`

Converts from a [DateObject](#dateobject) to ISO date string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

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

const output6 = dateObjectToIsoDate(input, 'UTC', {
  format: 'yyyy-MM',
});
console.log(output6);
// 2023-12
```

#### `dateObjectToIsoTime`

Converts from a [DateObject](#dateobject) to ISO time string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

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
  format: 'HH:mm:ss.SSS',
});
console.log(output6);
// 23:45:12.614
```

#### `dateObjectToDateObjectTz`

Converts from a [DateObject](#dateobject) to [DateObjectTz](#dateobjecttz).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObject = { ... };

const output1 = dateObjectToDateObjectTz(input);
console.log(output1);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 23,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'UTC',
// }

const output2 = dateObjectToDateObjectTz(input, 'America/New_York');
console.log(output2);
// {
//   year: 2024,
//   month: 1,
//   day: 1,
//   hour: 4,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'UTC',
// }

const output3 = dateObjectToDateObjectTz(input, 'America/New_York', 'America/New_York');
console.log(output3);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 23,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'America/New_York',
// }

const output4 = dateObjectToDateObjectTz(input, 'Asia/Tokyo', 'America/New_York');
console.log(output4);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 9,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'America/New_York',
// }
```

#### `dateObjectTzToUnixMilliseconds`

Converts from a [DateObjectTz](#dateobjecttz) to Unix milliseconds timestamp.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output = dateObjectTzToUnixMilliseconds(input);
console.log(output);
// 1_704_084_312_614 (equal to 2023-12-31T23:45:12.614-05:00)
```

#### `dateObjectTzToUnixSeconds`

Converts from a [DateObjectTz](#dateobjecttz) to Unix seconds timestamp. Milliseconds are truncated, i.e. seconds are not rounded.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output = dateObjectTzToUnixSeconds(input);
console.log(output);
// 1_704_084_312 (equal to 2023-12-31T23:45:12Z)
```

#### `dateObjectTzToJsDate`

Converts from a [DateObjectTz](#dateobjecttz) to native JavaScript `Date` object.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output = dateObjectTzToJsDate(input);
console.log(output);
// 2024-01-01T04:45:12.614Z
```

#### `dateObjectTzToIsoDateTime`

Converts from a [DateObjectTz](#dateobjecttz) to ISO datetime string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output1 = dateObjectTzToIsoDateTime(input);
console.log(output1);
// 2024-01-01T04:45:12Z

const output2 = dateObjectTzToIsoDateTime(input, {
  timezone: 'America/New_York',
});
console.log(output2);
// 2023-12-31T23:45:12-05:00
```

#### `dateObjectTzToIsoDate`

Converts from a [DateObjectTz](#dateobjecttz) to ISO date string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output1 = dateObjectTzToIsoDate(input);
console.log(output1);
// 2024-01-01

const output2 = dateObjectTzToIsoDate(input, {
  timezone: 'America/New_York',
});
console.log(output2);
// 2023-12-31
```

#### `dateObjectTzToIsoTime`

Converts from a [DateObjectTz](#dateobjecttz) to ISO time string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output1 = dateObjectTzToIsoTime(input);
console.log(output1);
// 04:45:12

const output2 = dateObjectTzToIsoTime(input, {
  timezone: 'America/New_York',
});
console.log(output2);
// 23:45:12
```

#### `dateObjectTzToDateObject`

Converts from a [DateObjectTz](#dateobjecttz) to [DateObject](#dateobject).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input: DateObjectTz = { ... };

const output1 = dateObjectTzToDateObject(input);
console.log(output1);
// {
//   year: 2024,
//   month: 1,
//   day: 1,
//   hour: 4,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
// }

const output2 = dateObjectTzToDateObject(input, 'America/New_York');
console.log(output2);
// {
//   year: 2023,
//   month: 12,
//   day: 31,
//   hour: 23,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
// }
```

#### `isoDateTimeToUnixMilliseconds`

Converts from an ISO datetime string to Unix milliseconds timestamp.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToUnixMilliseconds('2023-12-31T23:45:12.614Z');
console.log(output);
// 1_704_066_312_614
```

#### `isoDateTimeToUnixSeconds`

Converts from an ISO datetime string to Unix seconds timestamp. Milliseconds are truncated, i.e. seconds are not rounded.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToUnixSeconds('2023-12-31T23:45:12.614Z');
console.log(output);
// 1_704_066_312
```

#### `isoDateTimeToJsDate`

Converts from an ISO datetime string to native JavaScript `Date` object.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToJsDate('2023-12-31T23:45:12.614Z');
console.log(output);
// 2023-12-31T23:45:12.614Z
```

#### `isoDateTimeToIsoDateTime`

Converts from an ISO datetime string to (another) ISO datetime string. This can be used to change the format or the timezone offset of the ISO datetime string.

Check [converter parameters](#parameters-for-converter-functions) section for more information

```ts
const output = isoDateTimeToIsoDateTime('2023-12-31T23:45:12.614Z', {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2023-12-31T18:45:12-05:00
```

#### `isoDateTimeToIsoDate`

Converts from an ISO datetime string to ISO date string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToIsoDate('2023-12-31T23:45:12.614Z', {
  format: 'yyyy-MM-dd',
  timezone: 'Asia/Tokyo',
});
console.log(output);
// 2024-01-01
```

#### `isoDateTimeToIsoTime`

Converts from an ISO datetime string to ISO time string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToIsoTime('2023-12-31T23:45:12.614Z', {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 18:45:12
```

#### `isoDateTimeToDateObject`

Converts from an ISO datetime string to [DateObject](#dateobject).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToDateObject('2023-12-31T23:45:12.614Z', 'America/New_York');
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

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = isoDateTimeToDateObjectTz('2023-12-31T23:45:12.614Z', 'America/New_York');
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

#### `jsDateToUnixMilliseconds`

Converts native JavaScript `Date` object to Unix milliseconds timestamp.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToUnixMilliseconds(input);
console.log(output);
// 1_704_066_312_614
```

#### `jsDateToUnixSeconds`

Converts native JavaScript `Date` object to Unix seconds timestamp. Milliseconds are truncated, i.e. seconds are not rounded.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToUnixSeconds(input);
console.log(output);
// 1_704_066_312
```

#### `jsDateToIsoDateTime`

Converts native JavaScript `Date` object to ISO datetime string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToIsoDateTime(input, {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2023-12-31T18:45:12-05:00
```

#### `jsDateToIsoDate`

Converts native JavaScript `Date` object to ISO date string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToIsoDate(input, {
  format: 'yyyy-MM-dd',
  timezone: 'Asia/Tokyo',
});
console.log(output);
// 2024-01-01
```

#### `jsDateToIsoTime`

Converts native JavaScript `Date` object to ISO time string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToIsoTime(input, {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 18:45:12
```

#### `jsDateToDateObject`

Converts native JavaScript `Date` object to [DateObject](#dateobject).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToDateObject(input, 'America/New_York');
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

#### `jsDateToDateObjectTz`

Converts native JavaScript `Date` object to [DateObjectTz](#dateobjecttz).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateToDateObjectTz(input, 'America/New_York');
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

Converts Unix milliseconds timestamp to Unix seconds timestamp. Milliseconds are truncated, i.e. seconds are not rounded.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToUnixSeconds(1_704_066_312_614);
console.log(output);
// 1_704_066_312
```

#### `unixMillisecondsToJsDate`

Converts Unix milliseconds timestamp to native JavaScript `Date` object.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToJsDate(1_704_066_312_614);
console.log(output);
// 2023-12-31T23:45:12.614Z
```

#### `unixMillisecondsToIsoDateTime`

Converts Unix milliseconds timestamp to ISO datetime string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToIsoDateTime(1_704_066_312_614, {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2023-12-31T18:45:12-05:00
```

#### `unixMillisecondsToIsoDate`

Converts Unix milliseconds timestamp to ISO date string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToIsoDate(1_704_066_312_614, {
  format: 'yyyy-MM-dd',
  timezone: 'Asia/Tokyo',
});
console.log(output);
// 2024-01-01
```

#### `unixMillisecondsToIsoTime`

Converts Unix milliseconds timestamp to ISO time string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToIsoTime(1_704_066_312_614, {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 18:45:12
```

#### `unixMillisecondsToDateObject`

Converts Unix milliseconds timestamp to [DateObject](#dateobject).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToDateObject(1_704_066_312_614, 'America/New_York');
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

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixMillisecondsToDateObjectTz(1_704_066_312_614, 'America/New_York');
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

Converts Unix seconds timestamp to Unix milliseconds timestamp.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToUnixMilliseconds(1_704_066_312);
console.log(output);
// 1_704_066_312_000
```

#### `unixSecondsToJsDate`

Converts Unix seconds timestamp to native JavaScript `Date` object.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToJsDate(1_704_066_312);
console.log(output);
// 2023-12-31T23:45:12.000Z
```

#### `unixSecondsToIsoDateTime`

Converts Unix seconds timestamp to ISO datetime string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToIsoDateTime(1_704_066_312, {
  timeFormat: 'HH:mm:ss',
  timezone: 'America/New_York',
  offset: 'offset',
});
console.log(output);
// 2023-12-31T18:45:12-05:00
```

#### `unixSecondsToIsoDate`

Converts Unix seconds timestamp to ISO date string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToIsoDate(1_704_066_312, {
  format: 'yyyy-MM-dd',
  timezone: 'Asia/Tokyo',
});
console.log(output);
// 2024-01-01
```

#### `unixSecondsToIsoTime`

Converts Unix seconds timestamp to ISO time string.

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToIsoTime(1_704_066_312, {
  format: 'HH:mm:ss',
  timezone: 'America/New_York',
});
console.log(output);
// 18:45:12
```

#### `unixSecondsToDateObject`

Converts Unix seconds timestamp to [DateObject](#dateobject).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToDateObject(1_704_066_312, 'America/New_York');
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

Converts Unix seconds timestamp to [DateObjectTz](#dateobjecttz).

Check [converter parameters](#parameters-for-converter-functions) section for more information.

```ts
const output = unixSecondsToDateObjectTz(1_704_066_312, 'America/New_York');
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

### Add Duration to Date General Information

Here is some general information about function that are used for adding or subtracting a duration from a date ([Add Duration to Date](#add-duration-to-date)).

There is one function for adding/subtracting a duration for each of the six full date forms.

To subtract a duration, simply pass a negative number as the duration field value.

These functions should currently work with fractional values in duration fields, but they are meant to be used with integer values.

#### Parameters for Add Duration to Date Functions

##### Input Date

All function used for adding (or subtracting) a duration from a date take an input date as the first parameter.

##### Input Timezone

`inputTimezone` is a necessary parameter before we are able to do datetime arithmetic with certain date forms.

If `undefined` is passed to it, the `inputTimezone` will default to `UTC`.

###### Day Arithmetic (and Larger Time Components)

Because of the Daylight Saving Time (DST), datetime arithmetic is dependent on both the current point in time and the timezone. For example, adding 1 day to a datetime will not necessarily add 24 hours to it.

For example:

- Clocks of most European countries were turned back by 1 hours at `2023-10-29T01:00:00Z`.
- In that instant, `Europe/Berlin` timezone went:
  - From `2023-10-29T03:00:00+02:00`.
  - To `2023-10-29T02:00:00+01:00`.
- In other words, the local time went from `03:00` to `02:00`.

Let's say:

- We have an input datetime of `2023-10-29T00:00:00` local time in `Europe/Berlin`.
- We want to add 1 day to it.
- We expect the result to be `2023-10-30T00:00:00` local time in `Europe/Berlin`.

The first datetime is `2023-10-29T00:00:00+02:00`, or `2023-10-28T22:00:00Z`. The second datetime is `2023-10-30T00:00:00+01:00`, or `2023-10-29T23:00:00Z`. The difference is 25 hours.

###### Hour Arithmetic (and Smaller Time Components)

Hours and smaller time components are not affected by Daylight Saving Time - when looking at it from the perspective of 'absolute time', like the one represented by Unix timestamps.

Adding an hour will always add `3_600_000` milliseconds to a timestamp, regardless of the current point in time and the timezone. Adding 25 hours will always add `25 * 3_600_000` milliseconds.

Adding 25 hours to `2023-10-29:00:00:00` in `Europe/Berlin` timezone will result in `2023-10-30T00:00:00` in `Europe/Berlin` timezone - exactly the same result as adding 1 day would produce in that situation. The difference between Unix milliseconds timestamps of these two datetimes is - as should now be clear - `25 * 3_600_000`.

###### Which Date Forms Need a Timezone?

All date forms except [DateObject](#dateobject) and [DateObjectTz](#dateobjecttz) need to be provided with an `inputTimezone` parameter to be able to do date arithmetic.

`UnixMilliseconds` and `UnixSeconds` obviously have no concept of timezone, so they need to be provided with an `inputTimezone` parameter to generate results consistent with the `*Add` functions for other date forms. You can always use `UTC` as the `inputTimezone` parameter if you need results unaffected by DST.

`JsDate` is essentially just a wrapper around Unix milliseconds, so same rules apply.

`IsoDateTime` can have an offset, but does not have to, and anyway the offset is ambiguous. Does `+01:00` mean `Europe/Berlin` or maybe some timezone which does not use DST? Again, and explicit `inputTimezone` parameter needs to be provided to resolve any ambiguity.

[DateObject](#dateobject) is intended to represent an abstract date and time, not tied to a particular timezone, and not tied to a particular point in time. Date arithmetic should therefore be unaffected by DST, and no `inputTimezone` parameter is needed. Internally, it uses `UTC` to accomplish this.

[DateObjectTz](#dateobjecttz) represents a concrete point in time, like `UnixMilliseconds` etc., but it also has a timezone contained within its structure. Therefore, it has all the information it needs to do date arithmetic, and no `inputTimezone` parameter is needed.

##### Add Amount

The `amount` parameter is a [Duration](#duration) object, which contains the amount of time to add/subtract to the input date.

Each duraction component (like `years` or `weeks`) can be a positive or negative number, and can be a fractional number. Positive number means that the duration will be added to the input date, negative number means that the duration will be subtracted from the input date. `amount` will work with fractional field values, but is meant to be used with integer values.

This is the third parameter if the function has an `inputTimezone` parameter, second parameter otherwise.

##### Output Options

Out of these `*Add` functions, only `isoDateTimeAdd` has output `options` parameter. It works exactly the same way as in `isoDateTo*` converter functions and has the same defaults. In short, `options` controls the output ISO format.

## Add Duration to Date

Here are functions that can be used to add or subtract a duration from a date.

#### `dateObjectAdd`

Adds/subtracts [duration](#duration) to/from a [DateObject](#dateobject).

Check [parameters](#parameters-for-add-duration-to-date-functions) section for more information.

```ts
const input: DateObject = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45,
  second: 12,
  millisecond: 614,
};
const output = dateObjectAdd(input, { days: 1 });
console.log(output);
// {
//   year: 2024,
//   month: 1,
//   day: 1,
//   hour: 23,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
// }
```

#### `dateObjectTzAdd`

Adds/subtracts [duration](#duration) to/from a [DateObjectTz](#dateobjecttz).

Check [parameters](#parameters-for-add-duration-to-date-functions) section for more information.

```ts
const input: DateObjectTz = {
  year: 2023,
  month: 12,
  day: 31,
  hour: 23,
  minute: 45,
  second: 12,
  millisecond: 614,
  timezone: 'America/New_York',
};
const output = dateObjectTzAdd(input, { days: 1 });
console.log(output);
// {
//   year: 2024,
//   month: 1,
//   day: 1,
//   hour: 23,
//   minute: 45,
//   second: 12,
//   millisecond: 614,
//   timezone: 'America/New_York',
// }
```

#### `isoDateTimeAdd`

Adds/subtracts [duration](#duration) to/from an ISO datetime.

Check [parameters](#parameters-for-add-duration-to-date-functions) section for more information.

```ts
const output1 = isoDateTimeAdd('2023-10-28T23:45:12Z', 'UTC', { days: 1 });
console.log(output1);
// 2023-10-29T23:45:12Z

const output2 = isoDateTimeAdd('2023-10-28T23:45:12Z', 'Europe/Berlin', { days: 1 });
console.log(output2);
// 2023-10-30T00:45:12Z
// (since add was made in Europe/Berlin timezone
//   during the DST transition, the difference is 25 hours)
// (output format still uses 'Z' suffix, which is dictated
//   by the options parameter, or the defaults in this case,
//   since the options parameter is not provided)

const output3 = isoDateTimeAdd(
  // providing '2023-10-28T23:45:12.614Z' as the input,
  //   which is the same point in time,
  //   would produce the same result
  '2023-10-29T01:45:12.614+02:00',
  // defines the timezone of the conversion
  //   (takes into account the DST transition)
  'Europe/Berlin',
  // add amount
  { days: 1 },
  // output format
  {
    timeFormat: 'HH:mm:ss.SSS',
    timezone: 'Europe/Berlin',
  },
);
console.log(output3);
// 2023-10-30T01:45:12.614+01:00
// (same local time as input, one day later)
```

#### `jsDateAdd`

Adds/subtracts [duration](#duration) to/from a native JavaScript `Date` object.

Check [parameters](#parameters-for-add-duration-to-date-functions) section for more information.

```ts
const input = new Date('2023-12-31T23:45:12.614Z');
const output = jsDateAdd(input, 'UTC', { days: 1 });
console.log(output);
// 2024-01-01T23:45:12.614Z
```

#### `unixMillisecondsAdd`

Adds/subtracts [duration](#duration) to/from a Unix milliseconds timestamp.

Check [parameters](#parameters-for-add-duration-to-date-functions) section for more information.

```ts
const output = unixMillisecondsAdd(1_704_066_312_614, 'UTC', { days: 1 });
console.log(output);
// 1_704_152_712_614
```

#### `unixSecondsAdd`

Adds/subtracts [duration](#duration) to/from a Unix seconds timestamp.

Any milliseconds in the resulting timestamp are truncated, i.e. seconds are not rounded.

Note that, however, only the result is truncated. You can still pass `milliseconds` in the `amount`, and if the value is less than `0` or equal to or greater than `1000`, it will affect the result.

Check [parameters](#parameters-for-add-duration-to-date-functions) section for more information.

```ts
const output1 = unixSecondsAdd(1_704_066_312, 'UTC', { days: 1 });
console.log(output1);
// 1_704_152_712

const output2 = unixSecondsAdd(1_704_066_312, 'UTC', { milliseconds: 614 });
console.log(output2);
// 1_704_066_312

const output3 = unixSecondsAdd(1_704_066_312, 'UTC', { milliseconds: 1614 });
console.log(output3);
// 1_704_066_313

const output4 = unixSecondsAdd(1_704_066_312, 'UTC', { milliseconds: -1 });
console.log(output4);
// 1_704_066_311
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
  - `yyyy` - Year only.
  - `MM` - Month only.
  - `dd` - Day only.

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
  - `HH` - Hours only.
  - `mm` - Minutes only.
  - `ss` - Seconds only.
  - `SSS` - Milliseconds only.

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

#### `Duration`

Object containing duration field, from `years` down to `milliseconds`.

It is used for adding or subtracting a duration from a date.

```ts
interface Duration {
  readonly years?: number;
  readonly months?: number;
  readonly weeks?: number;
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
  readonly milliseconds?: number;
}
```
