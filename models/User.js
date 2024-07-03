var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{
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
        }catch{
            console.log(err);
        }    
    }
    async findEmail(email){
        var foundEmail = await knex.select("*").from("users").where({email: email})
        return foundEmail;
    }

}

module.exports = new User();