
function authentification(req,res,next){
    if(!req.session.authen){
        res.send({
          msg: "Not Logged In"
        });
        return;
      }
    else{
        next();
    }
}

module.exports = {
    authentification
}