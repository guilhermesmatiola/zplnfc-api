import joi from "joi";

export const zplSchema = joi.object({
    
    script: joi.string().required(),
    zplname: joi.string().required()
});