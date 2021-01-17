import { NonEmptyString, RegExpC } from 'io-ts-types'
import { Char } from 'newtype-ts/lib/Char'
import * as CharT from './char'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { regexp } from 'io-ts-types/lib/regexp'
import { identity, pipe } from 'fp-ts/lib/function'

export const startsWith = (c: Char) => (s: NonEmptyString) =>
  pipe(
    CharT.of(s[0]),
    O.map(sc => sc === c),
    O.getOrElse(() => false)
  )

export const matchRegexp = (r: RegExpC) => (s: NonEmptyString) =>
  pipe(
    regexp.decode(r),
    E.map(regx => regx.test(s)),
    E.fold(() => false, identity)
  )
