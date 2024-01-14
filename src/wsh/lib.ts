const exportNames = (workbook: Excel.Workbook) => {
  const fso: Scripting.FileSystemObject = WScript.CreateObject(
    'Scripting.FileSystemObject'
  )
  const names = workbook.Names
  const folderPath = workbook.FullName + '.names'
  if (!fso.FolderExists(folderPath)) {
    fso.CreateFolder(folderPath)
  }
  for (let i = 1; i <= names.Count; i++) {
    const item = names.Item(i)
    const outputFilepath = fso.BuildPath(folderPath, item.Name)
    const file = fso.OpenTextFile(outputFilepath, 2, true, 0)
    file.Write(item.RefersTo)
    file.Close()
  }
}

const importNames = (workbook: Excel.Workbook) => {
  const fso: Scripting.FileSystemObject = WScript.CreateObject(
    'Scripting.FileSystemObject'
  )
  const folderPath = workbook.FullName + '.names'
  if (fso.FolderExists(folderPath)) {
    const folder = fso.GetFolder(folderPath)
    for (
      let objEnum = new Enumerator(folder.Files);
      !objEnum.atEnd();
      objEnum.moveNext()
    ) {
      const file = objEnum.item()
      const key = file.Name
      const stream = file.OpenAsTextStream(Scripting.IOMode.ForReading)
      const value = stream.ReadAll()
      stream.Close()
      workbook.Names.Add(key, value)
    }
  }
}

const exportQueries = (workbook: Excel.Workbook) => {
  const fso: Scripting.FileSystemObject = WScript.CreateObject(
    'Scripting.FileSystemObject'
  )
  const queries = workbook.Queries
  const folderPath = workbook.FullName + '.queries'
  if (!fso.FolderExists(folderPath)) {
    fso.CreateFolder(folderPath)
  }
  for (let i = 1; i <= queries.Count; i++) {
    const item = queries.Item(i)
    const outputFilepath = fso.BuildPath(folderPath, item.Name)
    const file = fso.OpenTextFile(outputFilepath, 2, true, 0)
    file.Write(item.Formula)
    file.Close()
  }
}

const importQueries = (workbook: Excel.Workbook) => {
  const fso: Scripting.FileSystemObject = WScript.CreateObject(
    'Scripting.FileSystemObject'
  )
  const folderPath = workbook.FullName + '.queries'
  if (fso.FolderExists(folderPath)) {
    const folder = fso.GetFolder(folderPath)
    for (
      let objEnum = new Enumerator(folder.Files);
      !objEnum.atEnd();
      objEnum.moveNext()
    ) {
      const file = objEnum.item()
      const key = file.ShortName
      const stream = file.OpenAsTextStream(Scripting.IOMode.ForReading)
      const value = stream.ReadAll()
      stream.Close()
      workbook.Names.Add(key, value)
    }
  }
}

const processWorkbook = (
  filepath: string,
  callback: (wb: Excel.Workbook) => void,
  save = false
) => {
  const app: Excel.Application = WScript.CreateObject('Excel.Application')
  app.Visible = false
  const wb = app.Workbooks.Open(filepath)
  callback(wb)
  app.DisplayAlerts = false
  wb.Close(save)
  app.Quit()
  WScript.Quit(0)
}

export {
  exportNames,
  exportQueries,
  importNames,
  importQueries,
  processWorkbook,
}
