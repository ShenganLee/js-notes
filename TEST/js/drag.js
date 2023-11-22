const defaultOptions = {
    x: 0,
    y: 0,
    zoom: 1,
}

class Drag {
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options)
    }

    setZoom(zoom) {
        this.options.zoom = zoom
    }

    drag(offsetX, offsetY) {
        this.options.x += offsetX / this.options.zoom
        this.options.y += offsetY / this.options.zoom
    }

    
}