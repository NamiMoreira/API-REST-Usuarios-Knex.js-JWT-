var User = require("../models/User");

class UserController{
   
    async edit(req,res){
        var data = req.body;
        var result = await User.update(data);
        if (result != undefined) {
            if (result.status != false) {
                res.status(200);
                res.send("Atualização ocorrida com sucesso!") 
            }else{
                res.status(406);
                res.json(result.err)
            }
        }else{
            res.status(406);
            res.json(result.err)
        }
    }
    async index(req,res){};
    
    async findAll(req,res){
        var user = await User.findAll(); 
        res.status(200);
        res.json(user)
    };

    async findById(req,res){
        var {idUser} = req.body
        if (idUser == undefined) {
            res.status(403);
            res.json({err: "Parametros incorretos para a solicitação"});
            return;
        }else{
            var user = await User.findById(idUser);
            if (user == undefined) {
                res.status(404);
                res.json({err: "Usuario não encontrado"})
            }else{
                res.status(200);
                res.json(user)
            }
        }
    }

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
                        res.status(406);
                        res.json({err: "O EMAIL já está cadastrado no banco!"});
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
    async remove(req,res){
        var id = req.params.id;
        try {
         var result = await User.delete(id);
            if (result.status) {
                res.status(200);
                res.send("Deletado com sucesso!");
            }else{
                res.status(406);
                res.json(result.err)
            }
        } catch (err) {
            res.status(406);
            res.json({err: "Ocorreu um erro na execução!"}) 
        }
    }
}

module.exports = new UserController();