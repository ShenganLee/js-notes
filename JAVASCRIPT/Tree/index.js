
const weakMap = new WeakMap()

class TreeNode {
    constructor(parent, data, getChildren, cxt = {}) {
        this.parent = parent
        this.data = data
        this.prev = null
        this.next = null
        this.children = new TreeList(this, getChildren(data), getChildren)
    }

    toJSON() {
        return {
            ...this.data,
            children: this.children.toJSON()
        }
    }
}

class TreeList {
    constructor(parent, list, getChildren, cxt = {}) {
        this.parent = parent
        this.first = null
        this.last = null
        this.length = 0

        list.forEach(item => {
            const node = new TreeNode(this.parent, item, getChildren)
            this.push(node)
        });
    }

    push(node) {
        if (this.first === null && this.last === null) (this.first = node) && (this.last = node)
        else (node.prev = this.last) && (this.last.next = node) && (this.last = node)

        this.length ++
    }

    pop() {
        const node = this.last
        node.prev && (this.last = node.prev) && (node.prev = null)
        this.first === node && (this.first = null)

        this.length --

        return node.data
    }

    toJSON() {
        const list = []
        let current = this.first

        while(current) {
            list.push(current.toJSON())
            current = current.next
        }

        return list
    }
}