const isLoggedIn = (req, res, next) => {
    if (req.session.user === undefined){
        console.log("Inside is logged in");
        next();
    } else {
        res.status(200).send("You are already logged in.");
    }
};

module.exports = {
    isLoggedIn
}