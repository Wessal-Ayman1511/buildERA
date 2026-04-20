import { User } from '../../db/models/user.model.js'
import { decrypt } from '../../utils/crypto/decrypt.js'


export const getProfile = async(req, res, next) => {


    const authUser = req.user
    authUser.phone = decrypt({data: authUser.phone})
    return res.status(200).json({success: true, data: authUser})


}

export const freezeAccount = async(req, res, next) => {

    const updatedUser = await User.updateOne({_id: req.user.id}, {isDeleted: true, deletedAt: Date.now()})

    return res.status(200).json({success: true, message: "ur account is freezed"})
}