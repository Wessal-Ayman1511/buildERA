import { User } from "../../db/models/user.model.js";
import {sendEmail, createToken, verifyToken, hash, compare, encrypt} from '../../utils/index.js'
import { messages } from "../../utils/message/index.js";


export const register = async (req, res, next) => {

    const { userName, email, password, phone } = req.body;
    const createdUser = await User.create({
      userName,
      email,
      password: hash({data:password, saltRound:8}),
      phone: encrypt({data: phone}),
    });

    const token = createToken({payload: {id: createdUser._id}, options: {expiresIn: "15m"}})
    const link = `http://localhost:3000/auth/activate-account/${token}`;
    const emailSent = await sendEmail({
      to: email,
      subject: "Email Verification from buildERA app",
      html: `<b>click <a href=${link}>here</a> to verify your account</b>`,
    });

    if (!emailSent){
      return next(new Error(messages.user.emailNotSent, { cause: 500 }));
    }

    return res.status(200).json({
      success: true,
      message: messages.user.createdSuccessfully,
      data: createdUser,
    });

};

export const login = async (req, res, next) => {

    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist.isConfirmed) {
      return next(new Error("verify your account first!", { cause: 400 }));
    }
    if (!userExist) {
      return next(new Error(messages.user.notFound, { cause: 401 }));
    }
    if (!compare({data: password, encryptedData: userExist.password})) {
      return next(new Error(messages.user.incorrectPassword, { cause: 401 }));
    }

    if(userExist.isDeleted){
      await User.updateOne({_id: userExist.id}, {isDeleted:false})
    }
    const token = createToken({payload: {email, id: userExist._id}, options:{expiresIn: '1h'}})

    return res.status(200).json({
      success: true,
      message: "logged in successfully",
      token,
    });

};

export const activateAccount = async (req, res, next) => {

    const { token } = req.params;
    const { id } = verifyToken({token});

    const user = await User.findByIdAndUpdate(id, { isConfirmed: true });
    if (!user) {
      return next(new Error(messages.user.notFound, { cause: 400 }));
    }
    return res.status(200).json({
      success: true,
      message: "email verified Contratulations! 🎉",
    });

};
