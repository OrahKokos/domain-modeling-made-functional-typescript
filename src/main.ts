import { regexp } from 'io-ts-types/lib/regexp'
import { right } from 'fp-ts/lib/Either'
import assert from 'assert'

const input1 = /\w+/
const input2 = new RegExp('\\w+')
assert.deepStrictEqual(regexp.decode(input1), right(input1))
assert.deepStrictEqual(regexp.decode(input2), right(input2))

const res = input1.test('asdasd');
console.log(res);