import { HKT, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT'
import { Int } from 'io-ts'
import * as S from 'io-ts/Schemable'

// base type class definition
export interface MySchemable<S> extends S.Schemable<S> {
  readonly Int: HKT<S, Int>
}

// type class definition for * -> * constructors (e.g. `Eq`, `Guard`)
export interface MySchemable1<S extends URIS> extends S.Schemable1<S> {
  readonly Int: Kind<S, Int>
}

// type class definition for * -> * -> * constructors (e.g. `Decoder`, `Encoder`)
export interface MySchemable2C<S extends URIS2>
  extends S.Schemable2C<S, unknown> {
  readonly Int: Kind2<S, unknown, Int>
}

export interface MySchema<A> {
  <S>(S: MySchemable<S>): HKT<S, A>
}
