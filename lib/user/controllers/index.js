const response = require("../../responses");
const { createUser } = require("../services");

const register = async (req, res, next) => {
    try{ 
        const { name , username, gender, email, phone, password, passwordConfirmation} = req.body
        const user = await createUser ({ name , username, gender, email, phone, password });
        if (password.localeCompare(passwordConfirmation)) {
            return response.failedWithMessage("passwords should match",res)
        }
        if (!user)
          return response.failedWithMessage("this user already exist !", res);
        return response.successWithMessage("account created successfully", res);


      } catch (err) {
        console.log("ERROR--> ", err);
        return response.serverError(res);
    }
   
  }

  module.exports = {
    register,
  }