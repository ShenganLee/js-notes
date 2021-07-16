const EventEmitter = require('events');

const emit = new EventEmitter()

const fn = () => {
    console.log('fn')
}

const fns = () => {
    console.log('fns')
}

const fng = () => {
    console.log('fng')
}

emit.on('xxx', fns)
emit.on('xxx', fn)
emit.on('xxx', fns)
emit.on('xxx', fn)
emit.on('xxx', fns)
// emit.addListener()

emit.off('xxx', fn)

emit.emit('xxx')
