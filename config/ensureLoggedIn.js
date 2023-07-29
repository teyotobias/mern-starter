//middleware to make sure user is logged in -> to protect specific server side routes
// any route/controller action that accesses req.user needs to ensure that
// the request is coming from a logged in user
//another middleware function
module.exports = function(req, res, next) {
    if (!req.user) return res.status(401).json('Unauthorized');
    // A okay
    next();
};

//last step for MERN-setup