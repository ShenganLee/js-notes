const defaultOptions = {
    zoom: 1,
    width: 200,
    height: 200,
    top: 0,
    left: 0,
}

class Resize {
    constructor(options) {
        this.options = Object.assign({}, defaultOptions, options)
    }

    getSize() {
        const opts = this.options

        return {
            width: opts.width * opts.zoom,
            height: opts.height * opts.zoom,
        }
    }

    setZoom(zoom) {
        this.options.zoom = zoom
    }



    resize(x, y, zoom) {
        this.setZoom(zoom)
        
    }
}