import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { matcher } from 'io-ts-extra'
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/PathReporter'

interface WidgetCode {
  readonly WidgetCode: unique symbol
}

export const WidgetCode = t.brand(
  NonEmptyString,
  (n): n is t.Branded<NonEmptyString, WidgetCode> => true, // startsWith W AND/OR match regexp
  'WidgetCode'
)

export type WidgetCodeType = t.TypeOf<typeof WidgetCode>

interface GizmoCode {
  readonly GizmoCode: unique symbol
}

export const GizmoCode = t.brand(
  NonEmptyString,
  (n): n is t.Branded<NonEmptyString, GizmoCode> => true, // startsWith W AND/OR match regexp
  'GizmoCode'
)

export type GizmoCodeType = t.TypeOf<typeof GizmoCode>

interface BorkCode {
  readonly BorkCode: unique symbol
}

export const BorkCode = t.brand(
  NonEmptyString,
  (n): n is t.Branded<NonEmptyString, BorkCode> => true,
  'BorkCode'
)

export type BorkCodeType = t.TypeOf<typeof BorkCode>

interface PorkCode {
  readonly PorkCode: unique symbol
}

export const PorkCode = t.brand(
  NonEmptyString,
  (n): n is t.Branded<NonEmptyString, PorkCode> => true,
  'PorkCode'
)

export type PorkCodeType = t.TypeOf<typeof PorkCode>

const ProductCode = t.union([WidgetCode, GizmoCode])
type ProductCode = t.TypeOf<typeof ProductCode>

const AlternativeProductCode = t.union([PorkCode, BorkCode])
type AlternativeProductCode = t.TypeOf<typeof AlternativeProductCode>

const miew = t.union([ProductCode, AlternativeProductCode])
type miew = t.TypeOf<typeof miew>

const tryMatch = fold<t.Errors, miew, string>(
  err => failure(err).join(''),
  productCode =>
    matcher<miew>()
      .case(GizmoCode, g => g.toString() + ' iz gizmooo')
      .case(ProductCode, w => w.toString())
      .case(BorkCode, b => b.toString())
      .case(PorkCode, p => p.toString())
      .get(productCode)
)

console.log(pipe(WidgetCode.decode('WDGT2000'), tryMatch))
console.log(pipe(WidgetCode.decode(''), tryMatch))

console.log(pipe(GizmoCode.decode('GZM2000'), tryMatch))
console.log(pipe(GizmoCode.decode(''), tryMatch))
