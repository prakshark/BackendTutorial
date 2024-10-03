// Method - 1

// const asyncHandler = (fun) => {async (req, res, next) => {
//     try{
//         await fun(req, res, next);
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'Server Error'
//         });
//     }}
// }

// --------------------------------------------------

const asyncHandler = (fun) => {
    (req, res, next) => {
        Promise.resolve(fun(req, res, next))
        .catch((err) => next(err));
    }
}

export { asyncHandler }