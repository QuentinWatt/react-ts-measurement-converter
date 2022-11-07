import { measurementUnit } from '../interfaces/measurementUnit'
import { SUPPORTED_LENGTHS } from '../config/SupportedLengths'
export class LengthConverter {

  providedUnit: measurementUnit = {
    abbreviation: 'm',
    name: 'meter',
    base: 1
  }

  expectedUnit: measurementUnit = {
    abbreviation: 'yd',
    name: 'yard',
    base: 0.9144
  }

  public convert(length: number): number {
    return this.convertMeasurementFromBase(this.convertMeasurementToBase(length))
  }

  public setProvidedUnit(unitAbbreviation: string): measurementUnit | null
  {
    if(SUPPORTED_LENGTHS.find(unit => unit.abbreviation === unitAbbreviation)){
      this.providedUnit = SUPPORTED_LENGTHS.find(unit => unit.abbreviation === unitAbbreviation)!
      return this.providedUnit
    }
    else {
      return null
    }
  }

  public setExpectedUnit(unitAbbreviation: string): measurementUnit | null
  {
    if(SUPPORTED_LENGTHS.find(unit => unit.abbreviation === unitAbbreviation)){
      this.expectedUnit = SUPPORTED_LENGTHS.find(unit => unit.abbreviation === unitAbbreviation)!
      return this.expectedUnit
    }
    else {
      return null
    }
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