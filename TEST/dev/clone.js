class Father {
    constructor() {}

    clone() {}
}

class Children extends Father {
    constructor(name) {
        super()
        this.name = name
    }
}