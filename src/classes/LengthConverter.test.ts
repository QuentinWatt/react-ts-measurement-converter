import { LengthConverter } from "./LengthConverter";

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

describe('Converts yards to cm correctly', () => {
  const converter = new LengthConverter('yd', 'cm')

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
  const converter = new LengthConverter('mm', 'cm')

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
  const converter = new LengthConverter('in', 'mm')

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
  const converter = new LengthConverter('mi', 'km')

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