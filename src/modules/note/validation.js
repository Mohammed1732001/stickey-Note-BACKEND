import Joi from "joi";

export const addNote = Joi.object({

    title: Joi.string().min(15).max(50).required(),
    desc: Joi.string().min(50).max(500).required()

}).required()
export const updateNote = Joi.object({

    title: Joi.string().min(15).max(50).required(),
    desc: Joi.string().min(50).max(500).required()

}).required()



