import { LengthConverter } from "./LengthConverter";

describe('it can set expected and provided units', () => {
  it('sets uses a default conversion of meters to yards', () => {
    const converter = new LengthConverter()
    expect(converter.providedUnit.abbreviation).toBe('m')
    expect(converter.providedUnit.base).toBe(1)

    expect(converter.expectedUnit.abbreviation).toBe('yd')
    expect(converter.expectedUnit.base).toBe(0.9144)
  })

  it('sets the provided unit correctly', () => {
    const converter = new LengthConverter()
    converter.setProvidedUnit('yd')
    expect(converter.providedUnit.abbreviation).toBe('yd')
    expect(converter.providedUnit.base).toBe(0.9144)
  })

  it('sets the expected unit correctly', () => {
    const converter = new LengthConverter()
    converter.setProvidedUnit('mm')
    expect(converter.providedUnit.abbreviation).toBe('mm')
    expect(converter.providedUnit.base).toBe(0.001)
  })

  it('returns null when an unsupported unit is provided', () => {
    const converter = new LengthConverter()
    const unsupportedProvidedUnit = converter.setProvidedUnit('l')
    expect(unsupportedProvidedUnit).toBe(null)
    const unsupportedExpectedUnit = converter.setExpectedUnit('ml')
    expect(unsupportedExpectedUnit).toBe(null)
  })

  it('uses the default values when unsupported unit is provided', () => {
    const converter = new LengthConverter()
    converter.setProvidedUnit('l')
    expect(converter.providedUnit.abbreviation).toBe('m')
    expect(converter.providedUnit.base).toBe(1)
    converter.setExpectedUnit('ml')
    expect(converter.expectedUnit.abbreviation).toBe('yd')
    expect(converter.expectedUnit.base).toBe(0.9144)
  })

  it('can return true or false when checking for unit support', () => {
    const converter = new LengthConverter();
    expect(converter.isSupportedUnit('m')).toBe(true)
    expect(converter.isSupportedUnit('l')).toBe(false)
    expect(converter.isSupportedUnit('ml')).toBe(false)
    expect(converter.isSupportedUnit('km')).toBe(true)
    expect(converter.isSupportedUnit('mk')).toBe(false)
  })
})

describe('it converts yards to meters correctly', () => {
  const converter = new LengthConverter()
  converter.setProvidedUnit('yd')
  converter.setExpectedUnit('m')

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

describe('Converts yards to cm correctly', () => {
  const converter = new LengthConverter()
  converter.setProvidedUnit('yd')
  converter.setExpectedUnit('cm')

  it('Converts 1 yard to cm correctly', () => {
    const convertedValue: number = converter.convert(1)
    expect(convertedValue).toBe(91.44)
  })

  it('converts 2 yards to cm correctly', () => {
    const convertedValue: number = converter.convert(2)
    expect(convertedValue).toBe(182.88)
  })

  it('Converts 545 yards to cm correctly', () => {
    const convertedValue: number = converter.convert(545)
    expect(convertedValue).toBe(49834.8)
  })
})

describe('Converts millimeters to cm correctly', () => {
  const converter = new LengthConverter()
  converter.setProvidedUnit('mm')
  converter.setExpectedUnit('cm')

  it('Converts 1 mm to cm correctly', () => {
    const convertedValue: number = converter.convert(1)
    expect(convertedValue).toBe(0.1)
  })

  it('converts 2 mm to cm correctly', () => {
    const convertedValue: number = converter.convert(2)
    expect(convertedValue).toBe(0.2)
  })

  it('Converts 545 mm to cm correctly', () => {
    const convertedValue: number = converter.convert(545)
    expect(convertedValue).toBe(54.5)
  })
})

describe('Converts inches to mm correctly', () => {
  const converter = new LengthConverter()
  converter.setProvidedUnit('in')
  converter.setExpectedUnit('mm')

  it('Converts 1 in to mm correctly', () => {
    const convertedValue: number = converter.convert(1)
    expect(convertedValue).toBe(25.4)
  })

  it('converts 2 in to mm correctly', () => {
    const convertedValue: number = converter.convert(2)
    expect(convertedValue).toBe(50.8)
  })

  it('Converts 368 in to mm correctly', () => {
    const convertedValue: number = converter.convert(368)
    expect(convertedValue).toBe(9347.2)
  })
})

describe('Converts miles to km correctly', () => {
  const converter = new LengthConverter()
  converter.setProvidedUnit('mi')
  converter.setExpectedUnit('km')

  it('Converts 1 mi to km correctly', () => {
    const convertedValue: number = converter.convert(1)
    expect(convertedValue).toBe(1.6093)
  })

  it('converts 2 mi to km correctly', () => {
    const convertedValue: number = converter.convert(2)
    expect(convertedValue).toBe(3.2187)
  })

  it('Converts 147 mi to km correctly', () => {
    const convertedValue: number = converter.convert(147)
    expect(convertedValue).toBe(236.573)
  })
})