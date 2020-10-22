const User=require('../models/user')


exports.signup = (req, res) => {
    console.log("req.body", req.body);
    //creating new user setup
    const user = new User(req.body)
    //getting new user saving to DB
    user.save((err,user) => {
        if (err) {
          return  res.status(400).json({error: err})
        }
        //no error, sending json response of user
        res.json({user})
    })
    
}