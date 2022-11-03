import { LengthUnit } from '../interfaces/LengthUnit' 

export class LengthConverter {
  inputUnit: LengthUnit
  outputUnit: LengthUnit

  constructor(inputUnit: LengthUnit, outputUnit: LengthUnit){
    this.inputUnit = inputUnit
    this.outputUnit = outputUnit
  }

  public convert(input: number) {
    const lengthInMeters = input * this.inputUnit.baseToMeter
    const lengthInDesiredOutput = lengthInMeters * this.outputUnit.baseToMeter
    
    return lengthInDesiredOutput;
  }
}