class TreeMap {
    constructor(root, parent, prev, tree, children, index, level = 0) {
        root.addTreeNode(this)

        let childNodes = void 0
        if (typeof children === 'string') {
            childNodes = tree[children]
        } else if (typeof children === 'function') {
            childNodes = children(tree)
        }

        this.parent = parent
        this.prev = prev
        prev && (prev.setNext(this))
        this.data = tree
        this.index = index
        this.level = level


        if (childNodes) {
            let currentNode = void 0
            this.childNodes = childNodes.map(((node, nodeIndex) => {
                currentNode = new TreeMap(root, this, currentNode, node, children, nodeIndex, level + 1)
                return currentNode
            }))
        }
    }

    setNext(next) {
        this.next = next
    }
}

class TreeList {
    constructor(treeList, children = 'children') {
        
        this.treeMapDeepSet = new Set()
        this.treeMapSet = new Set()

        let currentNode = void 0
        treeList.forEach(((tree, index) =>{
            currentNode = new TreeMap(this, void 0, currentNode, tree, children, index)
            treeMapSet.add(currentNode)
        }))
    }

    addTreeNode(treeMap) {
        this.treeMapDeepSet.add(treeMap)
    }

    // filter(fn) {
    //     const filterSet = this.treeMapDeepSet.filter(tree => fn(tree.data, tree.index, tree.level))

    //     const allTreeSet = new Set()
    //     filterSet.forEach(tree => {
    //         this.find2Root(tree, allTreeSet)
    //     })
    // }

    // find2Root(tree, treeSet) {
    //     if (tree) {
    //         treeSet.add(tree)
    //         this.find2Root(tree.parent, treeSet)
    //     }
    // }
}

var a = [
    {a: 1, children: [{a: 11, children: [{ a: 111, children: [{ a: 1111 }] }]}]},
    {b: 1, children: [{b: 11, children: [{ b: 111}]}]},
    {c: 1, children: [{c: 11}]},
    {d: 1, children: [{d: 11}]},
    {e: 1, children: [{f: 11, children: [{ g: 111}, { h: 111}]}]},
    {x: 1, children: [{y: 11, children: [{ z: 111}]}, {m: 11, children: [{ n: 111}]}]},
]

var tl = new TreeList(a)
console.log(tl)