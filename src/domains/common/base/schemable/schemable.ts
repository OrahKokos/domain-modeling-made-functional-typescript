import { unsafeCoerce } from 'fp-ts/lib/function'
import { URIS2, Kind2, URIS, Kind } from 'fp-ts/lib/HKT'
import { MySchema, MySchemable1, MySchemable2C } from './schemable.types'
import * as D from 'io-ts/Decoder'
import * as SC from 'io-ts/Schema'

import { intDecoder } from 'domains/common/int/int'

export const schema: MySchemable2C<D.URI> = {
  ...D.Schemable,
  Int: intDecoder,
}

export const interpreter: {
  <S extends URIS2>(S: MySchemable2C<S>): <A>(
    schema: MySchema<A>
  ) => Kind2<S, unknown, A>
  <S extends URIS>(S: MySchemable1<S>): <A>(schema: MySchema<A>) => Kind<S, A>
} = unsafeCoerce(SC.interpreter)
