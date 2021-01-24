import { WidgetCode } from './domains/product/types/WidgetCode'

const setOfInputStrings = Object.freeze({
  EMPTY: '',
  INVALID: ['xxxxx'],
  VALID: 'W1234',
})

const emptyResult = WidgetCode.decode(setOfInputStrings.EMPTY)
const invaldResult = WidgetCode.decode(setOfInputStrings.INVALID[0])
const validResult = WidgetCode.decode(setOfInputStrings.VALID)

console.log('Empty', emptyResult)
console.log('Empty', invaldResult)
console.log('Empty', validResult)
