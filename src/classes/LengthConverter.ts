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

  public convert(length: number): number {
    return this.convertMeasurementFromBase(this.convertMeasurementToBase(length))
  }

  protected convertMeasurementToBase(length: number): number
  {
    return Number((length * this.providedUnit.base).toFixed(4))
  }

  protected convertMeasurementFromBase(length: number): number
  {
    return Number((length / this.expectedUnit.base).toFixed(4))
  }
}