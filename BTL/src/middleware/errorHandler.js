const errorHandle = (err, req, res, next) => {
    if(!err.statusCode) err.statusCode = 500;
    //ghi lỗi vào log
    res.status(err.statusCode).json({
        status: 'error',
        errorStatusCode: err.statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
    });
}
module.exports = errorHandle;