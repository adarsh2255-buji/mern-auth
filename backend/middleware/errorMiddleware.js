const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.orginalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let errorMessage = error.message;

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        statusCode = 404;
        errorMessage = 'Resource not found';
    }
    res.status(statusCode).json({
        message: errorMessage,
        stack : process.env.NODE_ENV === 'production' ? null : error.stack
    })
}

export { notFound, errorHandler }