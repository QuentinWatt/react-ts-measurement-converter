# How to approach solving this problem

[Back to the main readme](../README.md)

## Identifying the challenge

This converter should be able to accept units such yards, inches, feet, and convert those into any other supported unit like centimeters, or meters. The challenge here is figuring out how to convert non-metric units to metric units, or vise versa. 

## What to avoid 

At first this did seem a bit daunting. Storing formulas for each individual conversion would be a nightmare. 

I definitely wanted to avoid having a list of if/else or case statements defining which formula to use as this could get really messy really quickly.

## A theoretical solution

If you know a little bit about the history of the metric system, then you'll know that each metric measurement has a base unit. Length has a base called a "Meter" while volume is measured with a base unit a "Liter". This makes conversion within the metric system easy because we simply work in multiples of 10.

To convert non-metric lengths, all we need to know is how these units compare to our base unit in the metric system. Yards can be converted to a base in Meters, and from Meters easily converted Centimeters, Kilometers or any other metric unit. The same is true the opposite way around. 

My first basic concept was to have a converter class that I could pass a provided unit, and an expected unit to, and then call a convert method to recieve the converted value.

```
export class LengthConverter {
  constructor(providedUnit, expectedUnit)
  {
    // Find the providedUnit in our list of supported units
    // Find the expectedUnit in our list of supported units
  }

  public convert(length)
  {
    // convertedLength = convertToBaseInMeters(length)
    // convertedLength = convertFromBaseInMeters(convertedLength)
    // return convertedLength
  }
}
```

###### Continue reading
[Implenting the solution](./implementing-the-solution.md)