import { ExtensionContext } from 'vscode'
import { execute } from './execute'

const exportQueries = async (
  context: ExtensionContext,
  excelPath: string
): Promise<void> => {
  const result = await execute(
    context.asAbsolutePath('./dist/wsh/exportNames.js'),
    [excelPath]
  )
  console.log(result)
  console.log(`Eporting from ${excelPath}.`)
}

const importQueries = async (
  context: ExtensionContext,
  excelPath: string
): Promise<void> => {
  const result = await execute(
    context.asAbsolutePath('./dist/wsh/importNames.js'),
    [excelPath]
  )
  console.log(result)
  console.log(`Importing to ${excelPath}.`)
}

export { exportQueries, importQueries }
