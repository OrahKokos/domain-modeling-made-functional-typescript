import { Char } from 'newtype-ts/lib/Char'
import { prism } from 'newtype-ts'

const isChar = (s: string) => s.length === 1

const prismChar = prism<Char>(isChar)

export const of = prismChar.getOption
