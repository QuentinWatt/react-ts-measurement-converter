import { LengthConverter } from "./LengthConverter";
import { LengthUnit } from '../interfaces/LengthUnit' 

describe('it converts yards to meters correctly', () => {
  const outputUnit: LengthUnit = {
    baseToMeter: 1,
    fullName: 'Meter',
    abbreviation: 'm'
  }

  const inputUnit: LengthUnit = {
    baseToMeter: 0.9144,
    fullName: 'Yard',
    abbreviation: 'yd'
  }

  const converter = new LengthConverter(inputUnit, outputUnit)

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

describe('It converts yards to cm correctly', () => {
  const outputUnit: LengthUnit = {
    baseToMeter: 100,
    fullName: 'Centimeter',
    abbreviation: 'cm'
  }

  const inputUnit: LengthUnit = {
    baseToMeter: 0.9144,
    fullName: 'Yard',
    abbreviation: 'yd'
  }

  const converter = new LengthConverter(inputUnit, outputUnit)

  it('It converts 1 yards to cm correctly', () => {
    const convertedValue: number = converter.convert(1)
    expect(convertedValue).toBe(91.44)
  })

  it('It converts 2 yards to cm correctly', () => {
    const convertedValue: number = converter.convert(2)
    expect(convertedValue).toBe(182.88)
  })

  it('It converts 545 yards to cm correctly', () => {
    const convertedValue: number = converter.convert(545)
    expect(convertedValue).toBe(49834.8)
  })
})