import { spawn } from 'node:child_process'
import { extname, resolve } from 'node:path'
import { cscript } from './cscript'

export type CmdResult = {
  stdOut: string[]
  stdErr: string[]
  exitCode: number
}

export const execute = async (
  scriptPath: string,
  args: string[]
): Promise<CmdResult> => {
  const command = cscript()
  const file = resolve(scriptPath)
  args.unshift(file)
  const options =
    extname(scriptPath).toLocaleLowerCase() === '.js'
      ? ['//Nologo', '//E:JScript']
      : extname(scriptPath).toLocaleLowerCase() === '.vbs'
      ? ['//Nologo', '//E:VBScript']
      : ['//Nologo']
  args.unshift(...options)
  console.log(args)
  return new Promise<CmdResult>((resolve) => {
    const child = spawn(command, args, {
      windowsHide: true,
      shell: true,
    })
    const result: CmdResult = {
      stdOut: [],
      stdErr: [],
      exitCode: 0,
    }
    child.stdout.on('data', (data) => {
      console.log('stdOut', data.toString())
      result.stdOut.push(data.toString())
    })
    child.stderr.on('data', (data) => {
      console.log('stdErr', data.toString())
      result.stdErr.push(data.toString())
    })
    child.on('close', (code) => {
      console.log('exitCode', code)
      result.exitCode = code ?? -1
      return resolve(result)
    })
  })
}
