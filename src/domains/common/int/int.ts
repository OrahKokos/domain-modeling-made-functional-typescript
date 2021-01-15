import { prism } from 'newtype-ts'
import { PositiveInteger } from 'newtype-ts/lib/PositiveInteger'

const isPositiveInteger = (n: number) =>
  Number.isInteger(n) && Math.sign(n) === 1

const prismPositiveInteger = prism<PositiveInteger>(isPositiveInteger)

export const PositiveIntOption = prismPositiveInteger.getOption
