
function authentification(req,res,next){
    if(!req.session.authen){
        res.send({
          msg: "not logged in"
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