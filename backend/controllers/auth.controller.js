import User from "../models/user.model.js"
import bcrptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/errorHandler.js"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    const hashedPassword = bcrptjs.hashSync(password, 10)

    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ message: "User Created Successfully!" })

    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return next(errorHandler(400, "User Not Found"))
        }
        const validPassword = await bcrptjs.compare(password, user.password)
        if (!validPassword) return next(errorHandler(400, "wrong credentials"))
        const { password: pass, ...rest } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '15d'
        })
        res.cookie("AccessToken", token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 }).status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const signout = (req, res, next) => {
    try {
        res.clearCookie("AccessToken")
        res.cookie("SignedOutCookie", "", {maxAge: 0})
        res.status(200).json({message: "user Signed Out Successfully"})
    } catch (error) {
        next(error)
    }
}

export const removeAccount = async (req, res, next) =>{
    try {
        const signedinUser = req.body
        console.log(req.body);
        const user = await User.findById(signedinUser.authUser._id)
        if (!user) return next(errorHandler(404, "User Not Found"))
        const deletedUser = await User.deleteOne({_id : user._id})
        if (deletedUser.deletedCount === 0) return next(errorHandler(500, "Unable to DeleteAccount"))
        res.clearCookie("AccessToken")
        res.cookie("deleteAccountCookie", "", {maxAge: 0})
        res.status(200).json({message: "Deleted Account Successfully"})
    } catch (error) {
        next(error)
    }
}