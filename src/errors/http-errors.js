export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

export class BadRequestError extends HttpError {
    constructor(message) {
        super(400, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message) {
        super(404, message);
    }
}
