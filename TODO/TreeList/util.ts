import { NodeDataType, RecursionKeyOrFunctionType } from './types'

export const getRecursionChildren = <T extends NodeDataType>(
    data: T,
    recursionKeyOrFunction: RecursionKeyOrFunctionType
): T[] => {
    return typeof recursionKeyOrFunction === 'function' ?
        recursionKeyOrFunction(data) :
        data[recursionKeyOrFunction]
}