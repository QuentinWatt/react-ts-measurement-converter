import { measurementUnit } from '../interfaces/measurementUnit'

export const SUPPORTED_LENGTHS: Array<measurementUnit> = [
  {
    name: 'millimeter',
    abbreviation: 'mm',
    base: 0.001,
  },
  {
    name: 'centimeter',
    abbreviation: 'cm',
    base: 0.01,
  },
  {
    name: 'decimeter',
    abbreviation: 'dm',
    base: 0.1,
  },
  {
    name: 'meter',
    abbreviation: 'm',
    base: 1,
  },
  {
    name: 'kilometer',
    abbreviation: 'km',
    base: 1000,
  },  
  {
    name: 'inch',
    abbreviation: 'in',
    base: 0.0254,
  },
  {
    name: 'foot',
    abbreviation: 'ft',
    base: 0.3048,
  },
  {
    name: 'yard',
    abbreviation: 'yd',
    base: 0.9144,
  },
  {
    name: 'mile',
    abbreviation: 'mi',
    base: 1609.34,
  },
  {
    name: 'nautical mile',
    abbreviation: 'nmi',
    base: 1854,
  },
]