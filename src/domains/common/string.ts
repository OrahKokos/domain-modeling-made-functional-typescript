import { pipe } from 'fp-ts/lib/pipeable'
import { NonEmptyString, withMessage } from 'io-ts-types'
import { Char } from './char'
import * as O from 'fp-ts/Option'

export const NonEmptyStringWithMessage = withMessage(
  NonEmptyString,
  i => `Value ${i} is an empty string`
)

// How to operate safe strings D: ?
// Substitute s[0] with something else...
// Array of Char = String??
export const head = (s: NonEmptyString): Char => s[0] as Char

// ZeroPositiveNumber instead of number...
export const length = (s: string): number => s.length

// unsafe...
export const substring = (start: number, end: number) => (s: NonEmptyString) =>
  s.substring(start, end) as NonEmptyString
