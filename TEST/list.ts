class List extends Set {
    constructor(values?: readonly any[] | null) {
        super(values)
    }

    addAll(...args: any[]): void {
        args.forEach(value => this.add(value))
    }

    // 并集
    union(list: List): List {
        const union_list = new List()

        union_list.addAll(...Array.from(this))
        union_list.addAll(...Array.from(list))

        return union_list
    }

    // 交集
    intersect(list: List): List {
        const intersect_list = new List()

        this.forEach(value => {
            if (list.has(value)) intersect_list.add(value)
        })

        return intersect_list
    }

    // 差集
    diff(list: List): List {
        const diff_list = new List()

        this.forEach(value => {
            if (!list.has(value)) diff_list.add(value)
        })

        list.forEach(value => {
            if (!this.has(value)) diff_list.add(value)
        })

        return diff_list
    }


}