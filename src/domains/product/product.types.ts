// data WidgetCode = string starting with "W" then 4 digits
// data GizmoCode = string starting with "G" then 3 digits
// data ProductCode = WidgetCode OR GizmoCode
import { NonEmptyString } from 'io-ts-types'
import * as t from 'io-ts'
import { failure } from 'io-ts/PathReporter'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { startsWith, matchRegexp } from '../common/string'
import * as Char from '../common/char'
import { regexp } from 'io-ts-types/lib/regexp'
import { makeADT, ofType } from '@morphic-ts/adt'
import { summonFor } from '@morphic-ts/batteries/lib/summoner-ESBST'

const { summon, tagged } = summonFor<{}>({}) // Necessary to Specify the config environment (see Config Environment)

export const WidgetCode = summon(F =>
  F.interface(
    {
      type: F.tag('WidgetCode'),
      value: F.refined(
        F.string(),
        (s): s is t.Branded<string, NonEmptyString> => s.length > 0,
        'NonEmptyString'
      ),
    },
    'WidgetCode'
  )
)

export const GizmoCode = summon(F =>
  F.interface(
    {
      type: F.tag('GizmoCode'),
      value: F.refined(
        F.string(),
        (s): s is t.Branded<string, NonEmptyString> => s.length > 0,
        'NonEmptyString'
      ),
    },
    'GizmoCode'
  )
)

const ProductCode = tagged('type')({ WidgetCode, GizmoCode })

const nonEmptyString = WidgetCode.type.decode({
  value: 'decoded, non empty stringy',
})
const ratherEmptyString = WidgetCode.type.decode({ value: '' })

console.log(
  pipe(
    nonEmptyString,
    E.fold(
      err => failure(err).join(', '),
      w => w.value
    )
  )
)

console.log(
  pipe(
    ratherEmptyString,
    E.fold(
      err => failure(err).join(', '),
      w => w.value
    )
  )
)

// pipe(
//   NonEmptyString.decode('something'),
//   E.getOrElse(err => console.log(err)),
//   val => ProductCode.of.WidgetCode({ value: val })
// )

// interface WidgetCode {
//   readonly WidgetCode: unique symbol
// }

// export const WidgetCode = t.brand(
//   NonEmptyString,
//   (n): n is t.Branded<NonEmptyString, WidgetCode> => pipe(n, () => true), // startsWith W AND/OR match regexp
//   'WidgetCode'
// )

// export type WidgetCodeType = t.TypeOf<typeof WidgetCode>

// interface GizmoCode {
//   readonly GizmoCode: unique symbol
// }

// export const GizmoCode = t.brand(
//   NonEmptyString,
//   (n): n is t.Branded<NonEmptyString, GizmoCode> => pipe(n, () => true), // startsWith W AND/OR match regexp
//   'GizmoCode'
// )

// export type GizmoCodeType = t.TypeOf<typeof GizmoCode>

// nope
// const ProductCode = makeADT('type')({
//   WidgetCode: ofType<WidgetCodeType>(),
//   GizmoCode: ofType<GizmoCodeType>(),
// })
