# Making the converter less prone to error

## The problem 

At this point my `LengthConverter` was accepting the units to be converted as strings the constructor.

```
constructor(providedUnit: string, expectedUnit: string)
{
  this.providedUnit = providedUnit
  this.expectedUnit = expectedUnit
}
```

This is an issue because what happens if the developer using this class tried passing length units that are not found in the array of supported units? This would cause some unexpected errors that weren't going to be handled very well.

## Finding the solution

I decided it would be best to set default values for the provided and expected units. This would mean that the `convert()` method and other methods within the class could always rely on these properties to have a value.

```
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
```

Next, I removed the class' constructor all together. Now that we have default values, the constructor was no longer necessary. 

Then I created a public methods so that the `providedUnit` could be set correctly. 

```
public setProvidedUnit(unitAbbreviation: string): measurementUnit | null
{
  // check if the unit is supported
    // set the provided unit if supported
    // return the unit
  // else return null if an unsupported unitAbbreviation is provided
}
```

The logic for this method looked like this:
```
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
```

I created a very similar method for setting the `expectedUnit`. 
```
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
```

Now that I had could set measurement units in the class, I thought it might be a good idea to create a public method to allow any consumer of this class to check which measurements are supported.

```
public isSupportedUnit(unitAbbreviation: string): boolean
{
  return SUPPORTED_LENGTHS.find(unit => unit.abbreviation === unitAbbreviation) ? true : false
}
```