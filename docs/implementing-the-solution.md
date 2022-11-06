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

I decided to go with passing only the unit abbreviation to the class contructor. So that it would look something like the code below, which is much cleaner.

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

  public convert(length: number): number {
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

## 