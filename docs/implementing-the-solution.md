# Implementing the solution

## Starting the TDD way

I started by creating two files. 
`LengthConverter.ts` and `LengthConverter.test.ts`

I wanted to start by writing a test suite that would call create a new instance of my `LengthConverter` class, and call a `convert()` method on the class. This follows the TDD (Test Driven Development) approach, which very importantly allowed me to test my code while writing it.

My first tests were written to convert yards to meters. At first I wasn't really sure what I should pass arguments to the `LengthConverter` and experimented with passing an entire object including the unit's name, abbreviation its base to meters. 

My first call to the `LengthConverter` constructor from my test file looked something like this:
```
const providedUnit = {
  name: 'yards'
  abbreviation: 'yd',
  base: 0.9144
}

const expectedUnit = {
  name: 'meters'
  abbreviation: 'm',
  base: 1
}

const converter = new LengthConverter(providedUnit, expectedUnit)
```

However after some deliberation I realised doing it this way removes a lot of responsiblity from the `LengthConverter` class. It should be the responsibility of the class to be aware of the measurement units that are supported and what each of these measurements bases are. 

I decided to change my approach to passing only the unit abbreviation to the class contructor. So that it would look something like the code below, which is much cleaner.

```
const converter = new LengthConverter('yd', 'm')
```

Now my `LengthConverter` class looked something like this:

```
export class LengthConverter {
  providedUnit: measurementUnit
  expectedUnit: measurementUnit

  constructor(providedUnit: string, expectedUnit: string)
  {
    this.providedUnit = providedUnit
    this.expectedUnit = expectedUnit
  }

  public convert(length: number) {
    // Do something
  }
}
```

My test suite for converting yards to meters looked something like this:

```
describe('it converts yards to meters correctly', () => {
  const converter = new LengthConverter('yd', 'm')

  it('Converts 1 yard correctly', () => {
    const conversion: number = converter.convert(1)
    expect(conversion).toBe(0.9144)
  })

  it('Converts 2 yards correctly', () => {
    const conversion = converter.convert(2)
    expect(conversion).toBe(1.8288)
  })

  it('Converts 10 yards correctly', () => {
    const conversion = converter.convert(10)
    expect(conversion).toBe(9.144)
  })

  it('Converts 894 yards correctly', () => {
    const conversion = converter.convert(894)
    expect(conversion).toBe(817.4736)
  })
})
```

Of course, each of these tests should be failing at this point.

## Writing the converter logic

### Unexpected Difficulties

This is where I started hitting problems almost immediately. Questions I started asking myself were:
- Where do I pull my list of supported lengths?
- What should I do if the units provided to the constructor are not supported?
- How do I handle the validation?

I decided to find solutions to these problems later. 

### Storing the Supported lengths as a constant

Since TypeScript classes don't have a feature for constants on the class itself this meant I had to create a constant variable elsewhere.

I wanted this list to eventually be configurable, so that a new length could be added in future. I created a new file in `config/SupportedLengths.ts` and decided to store an array of Objects containing the supported lengths.

```
export const SUPPORTED_LENGTHS = [
  {
    name: 'yards',
    abbreviation: 'yd',
    base: 0.9144,
  },
  {
    name: 'm',
    abbreviation: 'm',
    base: 1,
  },
]
```

However since this object follows a very specific pattern, I thought it best to create a TypeScript interface for them. This way the app could throw an error during compilation if one of these objects is wrong.

I created an interface called `interfaces/measurementUnit.ts` and exported the interface like this:

```
export interface measurementUnit {
  name: string,
  abbreviation: string,
  base: number
}
```

Now I could use the interface to create a type for my array of supported lengths back in `config/SupportedLengths.ts`.

```
export const SUPPORTED_LENGTHS: Array<measurementUnit> = [
  {
    name: 'yards',
    abbreviation: 'yd',
    base: 0.9144,
  },
  {
    name: 'm',
    abbreviation: 'm',
    base: 1,
  },
  // There are more units in the file
]
```

### Finally converting the actual length

Now that I knew which lengths I was supporting, and how these lengths compared to the base unit in meters I could finally write the to convert the provided length.

In `LengthConverter.ts` I started by importing my SUPPORTED_LENTHS constant.

```
import { SUPPORTED_LENGTHS } from '../config/SupportedLengths'
```

Next, in the constructor, I could find the `providedUnit` and `expectedUnit` in my array of supported lengths and store the supported length in the public class properties. 

There is a problem with this approach there is no validation to determine if the consumer of this class is providing correct & supported values. I will have to fix this later.

```
import { measurementUnit } from '../interfaces/measurementUnit'
import { SUPPORTED_LENGTHS } from '../config/SupportedLengths'

export class LengthConverter {
  providedUnit: measurementUnit
  expectedUnit: measurementUnit

  constructor(providedUnit: string, expectedUnit: string)
  {
    this.providedUnit = SUPPORTED_LENGTHS.find(unit => unit.abbreviation === providedUnit)!
    this.expectedUnit = SUPPORTED_LENGTHS.find(unit => unit.abbreviation === expectedUnit)!
  }

  public convert(length: number) {
    // do something
  }
}
```

Now that I had the supported length stored in the class properties I could use the `providedUnit.base` and  `expectedUnit.base` to convert the provided measurement unit to meters, and then from meters to the new expected measurement units.

At first I started doing this all in the `convert()` method which looked something like this.
```
public convert(length: number): number {
  return (length * this.providedUnit.base) / this.expectedUnit.base
}
```

However, that already started to look unreadable, and I still wanted to add in some rounding to help remove long trailing decimal places.

At this point I encountered an issue that is unique to solving a problem like this in JavaScript. The `toFixed()` method used for rounding numbers actually returns a string and I had to convert that back into a number.

So I created a method for converting the length to the base unit (meters) called `convertMeasurementToBase()`.

```
protected convertMeasurementToBase(length: number): number
{
  return Number((length * this.providedUnit.base).toFixed(4))
}
```

I did something very similar to convert from the base unit (meters) to the expected unit whether that be cm, mm, miles etc.
```
protected convertMeasurementFromBase(length: number): number
{
  return Number((length / this.expectedUnit.base).toFixed(4))
}
```

That allowed me to clean up the `convert()` method considerably into something that is easily readable.

```
public convert(length: number): number {
  return this.convertMeasurementFromBase(this.convertMeasurementToBase(length))
}
```

At this point my class was working as expected provided the units provided were valid, and I wrote a few tests to check for different cases.