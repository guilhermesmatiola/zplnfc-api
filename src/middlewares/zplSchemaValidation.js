import { zplSchema } from "../schemas/zplSchema.js";

export async function ValidateZPL(req, res, next){

    const validation = zplSchema.validate(req.body, { abortEarly: false});

    if (validation.error){
        console.log(validation.error.details);
        res.sendStatus(422);
        return;
    }
    next();
}