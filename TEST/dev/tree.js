class TreeList {
    nodes = void 0
    constructor(data, childrenKey) {
        if (Array.isArray(data)) {
            this.nodes = data.map(d => new TreeNode(d, childrenKey))
        }
    }
}

class TreeNode {
    data = void 0;
    childrenKey = void 0;

    constructor(data, childrenKey) {
        this.data = data
        this.childrenKey = childrenKey
    }

    get children() {
        const children = typeof this.childrenKey === 'string' ?
            this.data[this.childrenKey] : (
                typeof this.childrenKey === 'string' ?
                    this.childrenKey(this.data) :
                    void 0
            )

        if (Array.isArray(children)) return new TreeList(children, this.childrenKey)
    }
}