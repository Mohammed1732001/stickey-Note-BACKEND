import Joi from "joi";

export const updateUser = Joi.object({

    userName: Joi.string().required(),
    age: Joi.number().min(18).max(55).required()

}).required()



