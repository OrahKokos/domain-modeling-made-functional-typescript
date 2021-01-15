import { PositiveIntOption } from './domains/common/int/int'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import { flow, identity } from 'fp-ts/lib/function'

const positiveNumber = 10
const zeroNumber = 0
const negativeNumber = -1
const overInt = 6000000
const aString = 'string'
const anObject = {}

const someFn = flow(
  PositiveIntOption,
  O.map(myGaranteedIntValue => {
    console.log('From option box', myGaranteedIntValue)
    return myGaranteedIntValue
  }),
  E.fromOption(identity),
  E.map(myGaranteedIntValueFromRight => {
    console.log('From either box', myGaranteedIntValueFromRight)
    return myGaranteedIntValueFromRight
  }),
  E.fold(
    () => {},
    () => {}
  )
)

const res1 = someFn(positiveNumber)
const res2 = someFn(zeroNumber)
const res3 = someFn(negativeNumber)

console.log(res1, res2, res3)
