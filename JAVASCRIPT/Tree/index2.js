class TreeNode {
    constructor({
        data,
        getChildren,
    }) {
        this.prevNode = null
        this.nextNode = null
        this.parentNode = null
        this.nodeList = null

        this.data = data

        this.childNodes = new TreeList({
            parentNode: this,
            dataList: getChildren(data),
            getChildren,
        })
    }

    insertBefore(node) {
        this.nodeList.insertBefore(node, this)
    }

    insertAfter(node) {
        this.nodeList.insertAfter(node, this)
    }

    remove() {
        this.nodeList.deleteNode(this)
    }

    clone() {

    }
}

class TreeList {
    constructor({
        parentNode,
        dataList,
        getChildren,
    }) {
        this.parentNode = parentNode

        this.firstNode = null
        this.lastNode = null

        this.childCount = 0

        dataList.forEach(data => {
            const node = new TreeNode({
                data: data,
                getChildren,
            })

            this.push(node)
        })
    }

    get DeepNodes() {

    }

    insertNode(node, beforeNode, afterNode) {
        node.nodeList = this
        node.parentNode = this.parentNode

        if (!this.childCount) {
            this.firstNode = node
            this.lastNode = node
        } else if (beforeNode) {
            const nextNode = beforeNode.nextNode
            beforeNode.nextNode = node
            node.prevNode = beforeNode
            node.nextNode = nextNode
            nextNode && (nextNode.prevNode = node)

            if (beforeNode === this.lastNode) this.lastNode = node
        } else if (afterNode) {
            const beforeNode = afterNode.prevNode
            beforeNode && (beforeNode.nextNode = node)
            node.prevNode = beforeNode
            node.nextNode = afterNode
            afterNode.prevNode = node

            if (afterNode === this.firstNode) this.firstNode = node
        } else {
            const lastNode = this.lastNode
            lastNode.nextNode = node
            node.prevNode = lastNode

            this.lastNode = node
        }

        this.childCount ++
    }

    deleteNode(node) {
        node.nodeList = null
        node.parentNode = null

        const { prevNode, nextNode } = node

        prevNode && (prevNode.nextNode = nextNode)
        nextNode && (nextNode.prevNode = prevNode)

        node.prevNode = null
        node.nextNode = null

        this.firstNode === node && (prevNode ? (this.firstNode = prevNode) : (this.firstNode = nextNode))
        this.lastNode === node && (nextNode ? (this.lastNode = nextNode) : (this.lastNode = prevNode))

        this.childCount --
    }

    push(node) {
        this.insertNode(node)
    }

    pop() {
        if (!this.childCount) return null

        const node = this.lastNode

        this.deleteNode(node)

        return node
    }

    insertBefore(node, child) {
        child.nodeList === this && this.insertNode(node, null, child)
    }

    insertAfter(node, child) {
        child.nodeList === this && this.insertNode(node, child)
    }

    forEach(fn) {
        let currentNode = this.firstNode

        while(currentNode) {
            fn(currentNode)
            currentNode = currentNode.nextNode
        }
    }

    filter(fn) {
        const list = []
        let currentNode = this.firstNode

        while(currentNode) {
            const flag = fn(currentNode)
            flag && list.push(currentNode)
            currentNode = currentNode.nextNode
        }

        return list
    }

    map(fn) {
        const list = []
        let currentNode = this.firstNode

        while(currentNode) {
            const data = fn(currentNode)
            list.push(data)
            currentNode = currentNode.nextNode
        }

        return list
    }
}