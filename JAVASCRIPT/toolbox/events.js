const typeString = v => Reflect.toString.call(v).slice(8, -1)

const isArray = Array.isArray

const isString = str => typeof str === 'string'

const isSymbol = symbol => typeof symbol === 'symbol'

const isFunction = func => typeof func === 'function'

const isObject = object => typeString(object) === 'Object'

const isEvents = event => event instanceof Events

const isDispatchAction = dispatchAction => dispatchAction instanceof DispatchAction

const isListener = listener => isFunction(listener)

const isType = type => isString(type)  || isSymbol(type)

const runCatch = (self, listener, args) => {
    try {
        Reflect.apply(listener, self, args)
    } catch (error) {
        console.error(error)
    }
}

const dispatch = (type, listener, self, dispatchAction) => {
    if (!isEvents(self)) return
    if (!isDispatchAction(dispatchAction)) return

    if (isListener(type)) {
        return Reflect.apply(dispatchAction.type, self)
    } else if (isType(type) && isListener(listener)) {            
        return Reflect.apply(actions.listener, self)
    }
}

const getRelation = (relations, type, addType = false) => {
    const hasType = relations.has(type)

    let relation = void 0
    if (hasType) {
        relation = relations.get(type)
    } else {
        relation = new Array()
        addType && relations.set(type, relation)
    }

    return relation
}

const createOnceListener = (self, listener, removeFunction) => {
    var onceListener = (...args) => {
        runCatch(listener, self, args)
        isFunction(removeFunction) && Reflect.apply(removeFunction, self)
    }

    return onceListener
}

class DispatchAction {
    static KEYSET = new Set(['type', 'listener'])

    constructor(options) {
        this.init(options)
    }

    init(options) {
        if (!isObject(options)) return

        const keySet = new Set(Reflect.ownKeys(options))

        DispatchAction.KEYSET.forEach(key => {
            if (keySet.has(key)) {
                const value = Reflect.get(a, key)
                if (isFunction(value)) {
                    Reflect.set(this, key, value)
                    return
                }
            }
            
            Reflect.set(this, key, new Function())
        })
    }
}

class Events {
    constructor() {
        this.listeners = new Array()

        this.relations = new Map()

        // this.onceMap = new WeakMap()

        this.addEventListener = this.on;
        this.removeEventListener = this.off;
    }

    once(type, listener) {
        const actions = new DispatchAction({
            type: () => {
                var onceListener = createOnceListener(this, type, () => self.off(onceListener))
                self.on(onceListener)
            },
            listener: () => {
                var onceListener = createOnceListener(this, listener, () => self.off(type, onceListener))    
                self.on(type, onceListener)
            }
        })
    
        dispatch(type, listener, self, actions)

        return this
    }

    on(type, listener) {
        const actions = new DispatchAction({
            type: () => {
                this.listeners.push(type)
            },
            listener: () => {
                const relation = getRelation(this.relations, type, true)
                relation.push(listener)
            }
        })

        dispatch(type, listener, this, actions)

        return this
    }

    off(type, listener) {
        const actions = new DispatchAction({
            type: () => {
                const index = this.listeners.lastIndexOf(type)
                if (index > -1) {
                    this.listeners.splice(index, 1)
                }
            },
            listener: () => {
                const relation = getRelation(this.relations, type)
                const index = relation.lastIndexOf(type)
                if (index > -1) {
                    this.listeners.splice(index, 1)
                }
            }
        })

        dispatch(type, listener, this, actions)

        return this
    }

    emit(type, ...args) {
        const relation = getRelation(this.relations, type)

        relation.forEach(listener => {
            runCatch(listener, this, args)
        })

        this.listeners.forEach(listener => {
            runCatch(listener, this, [type, ...args])
        })
    }
    
}