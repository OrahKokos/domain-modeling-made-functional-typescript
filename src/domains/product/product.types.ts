// data WidgetCode = string starting with "W" then 4 digits
// data GizmoCode = string starting with "G" then 3 digits
// data ProductCode = WidgetCode OR GizmoCode
import { NonEmptyString } from 'io-ts-types'
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/function'
import { startsWith, matchRegexp } from '../common/string'
import * as Char from '../common/char'
import { regexp } from 'io-ts-types/lib/regexp'
import { makeADT, ofType } from '@morphic-ts/adt'

interface WidgetCode {
  readonly WidgetCode: unique symbol
}

export const WidgetCode = t.brand(
  NonEmptyString,
  (n): n is t.Branded<NonEmptyString, WidgetCode> => pipe(n, () => true), // startsWith W AND/OR match regexp
  'WidgetCode'
)

export type WidgetCodeType = t.TypeOf<typeof WidgetCode>

interface GizmoCode {
  readonly GizmoCode: unique symbol
}

export const GizmoCode = t.brand(
  NonEmptyString,
  (n): n is t.Branded<NonEmptyString, GizmoCode> => pipe(n, () => true), // startsWith W AND/OR match regexp
  'GizmoCode'
)

export type GizmoCodeType = t.TypeOf<typeof GizmoCode>

// nope
const ProductCode = makeADT('type')({
  WidgetCode: ofType<WidgetCodeType>(),
  GizmoCode: ofType<GizmoCodeType>(),
})
