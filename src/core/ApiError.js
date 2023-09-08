const StatusCode = Object.freeze({
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
});

const ErrorTypes = Object.freeze({
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    BAD_REQUEST: 'BAD_REQUEST',
});

class ApiError extends Error {
    constructor(type, message, status) {
        super(message);
        this.type = type;
        this.status = status;
    }
}

class NotFoundError extends ApiError {
    constructor(message = 'Not found') {
        super(ErrorTypes.NOT_FOUND, message, StatusCode.NOT_FOUND);
    }
}

class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorTypes.BAD_REQUEST, message, StatusCode.BAD_REQUEST);
    }
}

class InternalServerError extends ApiError {
    constructor(message = 'Internal Server Error') {
        super(ErrorTypes.INTERNAL_ERROR, message, StatusCode.INTERNAL_ERROR);
    }
}

module.exports = {
    NotFoundError,
    InternalServerError,
    BadRequestError,
};
