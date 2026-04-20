import joi from 'joi'
import { genders } from '../../db/models/user.model.js'


export const register = joi.object({
    userName: joi.string().min(3).max(22).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
    phone: joi.string().required(),
    gender: joi.string().valid(...Object.values(genders))
}).required()

export const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
}).required()