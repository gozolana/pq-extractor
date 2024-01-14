import { exportNames, processWorkbook } from './lib'
const filepath = WScript.Arguments.Item(0)
processWorkbook(filepath, exportNames)
