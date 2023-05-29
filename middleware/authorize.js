
const isAuthorized = (authLevel=1) => {
    return (req, res, next) => {
        if (req.session.user.userType < authLevel || req.session.user.userType === undefined){
            return res.status(401).json("You do not have access.");
        }
        
        next();
    }
};

module.exports = {
    isAuthorized
}