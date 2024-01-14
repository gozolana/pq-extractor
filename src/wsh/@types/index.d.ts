/// <reference types='activex-excel' />
/// <reference types='activex-scripting' />
/// <reference types='windows-script-host' />

declare namespace Excel {
  interface Workbook {
    Queries: Queries
  }

  interface Query {
    Name: string
    Formula: string
  }

  interface Queries {
    readonly Count: number
    Item(Index: number | string): Query
    (Index: number | string): Query
  }
}
