const loginQuery = require('../query/login');

const login = (async(req, res, next) => {
  loginQuery.checkCredentials(req.body.email, req.body.password)
    .then((response) => {
      req.session.details = response.data;
      req.session.save((err) => {
        if (err) throw err;
      });
      res.status(response.statusCode).json(response);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


const createUser = (async(req , res ,next)=>{
    loginQuery.createNewUser(req.body.name , req.body.email , req.body.password , req.body.type)
    .then((response)=>{
        res.status(response.statusCode).json(response)
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    })
})



module.exports = { login ,createUser };
