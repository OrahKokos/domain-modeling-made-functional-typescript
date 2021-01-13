import { MySchema } from '../base/schemable/schemable.types'
import * as S from 'io-ts/Schemable'

export function make<A>(f: MySchema<A>): MySchema<A> {
  return S.memoize(f)
}
