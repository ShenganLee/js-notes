import { Node } from './Node'

export class Meta {

    nodes = new Set<Node>()
    relation = new WeakMap()

    constructor() {}
}