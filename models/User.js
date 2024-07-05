var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User{

    async findAll(){
        try{
            var result = await knex.select(["idusers","email","role","name"]).table("users")
            return result;
        }catch(err){
            console.log(err);
            return [1];
        };
    };

    async findById(idUser){
        var idUser = idUser

        console.log(idUser);
        try{
            var result = await knex.select(["idusers","email","role","name"])
            .from(("users"))
            .where({idusers: idUser});
            if (result.length > 0) {
                return result;
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return [1];
        }
    };

    async findByEmail(email){
        var email = email
        try{
            var result = await knex.select(["idusers","email","role","name"])
            .from(("users"))
            .where({email: email});
            if (result.length > 0) {
                return result;
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return [];
        }
    };


    async new(user){
        var {email,name, password } = user
        try{
            var hash = await bcrypt.hash(password, 10)
            await knex.insert({email,password: hash,name,role: 0}).table("users")
            .then(() =>{
                return;                
            }).catch((err) => {
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }    
    }

    async findEmail(email){
        var foundEmail = await knex.select("*").from("users").where({email: email})
        return foundEmail;
    }

    async update(data){
        console.log(data);
        var {idusers,name,email,role} = data
        
        var user = await this.findById(idusers);
        if (user != undefined) {
            var editUser = {};

            if(email != undefined){
                if(email != user.email){
                    var result = this.findEmail(email);
                    if (result != user.email) {
                        editUser.email = email
                    }else{
                        return {status:false, err:"o email ja esta cadastrado"}
                    }
                }else{
                    return {status:false, err:"o email ja esta cadastrado"}
                }
            }
            if(name != undefined){
                editUser.name = name
            }
            if (role != undefined) {
                editUser.role = role
            }
            try {
                
                await knex.update(editUser).where({idusers: idusers}).table("users");
                return {status: true}               
            } catch (err) {
                console.log("ocorreu" + err);
                return {status: false,err: err}
            }

            }else{
                return {status:false, err:"o usuario nao existe"}
            }
        };

    async delete(iduser){
        var user = await  this.findById(iduser);
        if (user != undefined) {
            
            try {
                await knex.delete().where({idusers: iduser}).table("users")     
                return{status: true} 
            } catch (err) {
                return {status: false,err: err}
            }
        }else{
            return{status: false,err:"O usuario nao existe no banco"}
        }
    };

    async changePassword(newPassword,id,token){
        try {
            var hash = await bcrypt.hash(newPassword, 10);
            await knex.update({password: hash}).where({idusers: id}).table("users");
            await PasswordToken.setUsed(token);
            return {status: true};
        } catch (err) {
            return {status: false,err: err};
        }
    };



}


module.exports = new User();