var User = require("../models/User");

class UserController{
   
    async index(req,res){};

    async create(req,res){
        var user = req.body;
        var {email,name, password } = req.body;
        var control = [];
        
        if(password == undefined){
            control.push("SENHA");
        };

        if(email == undefined ){
            control.push("EMAIL");
        };

        if(name == undefined ){
            control.push("NOME");
        };

        if (control != '' ) {
            res.status(400);
            res.json({err: "Parametro(s):  " + control + " incorretos."});
            return;
        }else{
               User.findEmail(email)
               .then((data) =>{
                    if (data != '') {
                        res.status(400);
                        res.json({err: "Ocorreu um erro na execução!"});
                        return;
                    } else{
                        User.new(user)
                        res.status(200);
                        res.send("Tudo ok");
                        return;        
                    }
                }).catch((err) =>{
                    console.log(err);
                    res.status(400);
                    res.json({err: "Ocorreu um erro na execução!"});
                    return;
                })
        }
    }
}

module.exports = new UserController();