import * as t from 'io-ts'
import { NonEmptyString, withMessage } from 'io-ts-types'
import { either } from 'fp-ts/Either'
import {
  startsWith,
  getLength,
  NonEmptyStringWithMessage,
} from '../common/string'
