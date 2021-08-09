const curry = ($fn, ...$args) => {
    const _len = $fn.length
    const _args = [...$args]

    const _fn = (...args) => {
        _args.push(...args)
        if (_args.length < _len) {
            return _fn
        }
        return Reflect.apply($fn, this, _args)
    }

    return _fn
}

const fn = (a, b, c, d, e) => {
    return a + b + c + d + e
}

const cfn = curry(fn)
const r = cfn(1)(2)(3, 4, 5)

console.log(r)