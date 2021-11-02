class HttpError extends Error {
    constructor(statusCode, message, config) {
        super(message)
        this.config = config
        this.name = 'HttpError'
        this.statusCode = statusCode
    }

    toJSON() {
        return {
            name: this.name,
            stack: this.stack,
            config: this.config,
            message: this.message,
            statusCode: this.statusCode,
        }
    }
}