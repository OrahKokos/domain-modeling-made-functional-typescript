import { NonEmptyString } from 'io-ts-types'
import { either } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { NonEmptyStringWithMessage } from './string'
import { Eq } from 'fp-ts/lib/Eq'

export const Char = new t.Type<NonEmptyString, NonEmptyString, NonEmptyString>(
  'Char',
  NonEmptyString.is,
  (s, c) => {
    return either.chain(NonEmptyStringWithMessage.validate(s, c), s => {
      if (s.length === 1) return t.success(s)
      return t.failure(s, c, `Input must be a string of length 1`)
    })
  },
  t.identity
)

export type Char = t.TypeOf<typeof Char>

// re-use something else?
export const eqChar: Eq<Char> = {
  equals: (c1, c2) => c1 === c2,
}
