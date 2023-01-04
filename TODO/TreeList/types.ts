export type NodeDataType = Record<string | number | symbol, any>

export type RecursionKeyOrFunctionType = string | number | symbol | (<T>(data: T) => T[])