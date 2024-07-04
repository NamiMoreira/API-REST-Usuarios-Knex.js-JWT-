var knex = require("../database/connection");
var User = require("./User")


class PasswordToken{
    async create(email){
    var user = await User.findByEmail(email);
       if (user != undefined) {
        console.log(user);
        try {
            var token = Date.now();

            await knex.insert({
                user_id: user[0].idusers,
                used: 0,
                token: token
             }).table("password_tokens");
            return {status: true,token: token}
          } catch (err) {
             console.log(err);
             return{status:false, err: err}
          } 

       }else{
            return{status:false, err: "o e-mail não existe!"}
       }
    };

    async validate(token){
        try {     
            var result = await knex.select().where({token: token}).table("password_tokens");       
            if (result.length > 0 ) {
                var tk = result[0];
                console.log(tk.used);
                if (tk.used) {
                    return{status:false, err: "Token ja esta sendo utilizado"} 
                }else{
                    return {status:true,tk};
                }
            }else{
                return{status:false, err: err}
            }    
        } catch (err) {
            return{status:false, err: err}
        }
        
    };

    async setUsed(token){
        try {
            await knex.update({used: 1}).where({token: token}).table("password_tokens")
            return{status:true}
        } catch (err) {
            return {status: false,err: err}
        }
    }

}

module.exports = new PasswordToken();