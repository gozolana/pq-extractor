import { importNames, processWorkbook } from './lib'
const filepath = WScript.Arguments.Item(0)
processWorkbook(filepath, importNames, true)
