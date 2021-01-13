import * as D from 'io-ts/Decoder'
import { pipe } from 'fp-ts/function'
import { Int } from 'io-ts'

export const intDecoder = pipe(
  D.number,
  D.refine((n): n is Int => Number.isInteger(n), 'Int')
)
