import { either } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import * as S from '../../common/string'

export const WIDGET_CODE_LENGTH = 5
export const WIDGET_CODE_STARTS_WITH = 'W'

export const WidgetCode = new t.Type<NonEmptyString, NonEmptyString, string>(
  'WidgetCode',
  NonEmptyString.is,
  (u, c) =>
    either.chain(S.NonEmptyStringWithMessage.validate(u, c), s => {
      const errors: t.ValidationError[] = []

      const codeLength = S.length(s)
      const hasCorrectLength = codeLength === WIDGET_CODE_LENGTH
      if (!hasCorrectLength) {
        errors.push({
          value: s,
          context: c,
          message: `The input: ${s} length is not ${WIDGET_CODE_LENGTH}`,
        })
        // Short circuit - no need to check further
        return t.failures(errors)
      }

      const firstChar = S.head(s)
      const isFirstCharCorrect = firstChar === WIDGET_CODE_STARTS_WITH

      // Collect results
      if (!isFirstCharCorrect) {
        errors.push({
          value: s,
          context: c,
          message: `The input: ${s} does not start with W`,
        })
      }
      const targetRestOfCode = S.substring(1, 5)
      const regexp = /^\d{4}$/
      const isRestOfTheCodeGood = regexp.test(targetRestOfCode(s))

      if (!isRestOfTheCodeGood) {
        errors.push({
          value: s,
          context: c,
          message: `The input: ${s} substring does not contain digits`,
        })
      }

      if (errors.length) return t.failures(errors)
      return t.success(s)
    }),
  t.identity
)
