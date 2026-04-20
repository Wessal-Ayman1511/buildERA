import {Schema, model} from 'mongoose'



export const genders = {
    MALE: 'male',
    FEMALE: 'female',
    M : 'm',
    F: 'f'
}




const userSchema = new Schema(
    {
        userName: {type: String, required: [true, "userName is required!"], unique: [true, "userName must be unique"]},
        email: {type: String, required: [true, "email is required!"], unique: [true, "email must be unique"], lowercase: true},
        password: {type: String, required: [true, "password is required!"]},
        gender: {type: String, enum: Object.values(genders)},
        phone: {type: String, required:[true, "phone is required!"], unique: [true, "phone must be unique"]},
        isConfirmed: {type: Boolean, default: false},
        isDeleted: {type: Boolean, default: false}, 
        deletedAt: {type: Date}
    }, 
    {
        timestamps: true
    })

export const User = model('users', userSchema)