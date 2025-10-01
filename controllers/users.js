const User = require("../models/user");


module.exports.signupUserGET = (req, res) => {
    res.render("users/signup.ejs");
}

 module.exports.signupUserPOST= async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // Log the user in
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to VISTARA");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};
 
module.exports.loginUserGET = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUserPOST =async (req, res) => {
        req.flash("success","Welcome Back to VISTARA");
        let redirectUrl = res.locals.redirectUrl || "/listings" ;
        res.redirect(redirectUrl);
    }
 
   module.exports.logoutUser = (req,res, next)=>{
        req.logout((err)=>{
            if(err){
              return  next(err);
            }
            req.flash("success","You are Logged Out");
            res.redirect("/listings");
        }
    )}

