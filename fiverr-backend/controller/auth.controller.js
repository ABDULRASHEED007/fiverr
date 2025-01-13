import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
// import { verifyToken } from "../middleware/jwt.js";

export const register = async (req, res, next) => {
    try {

        const hashPassword = bcrypt.hashSync(req.body.password, 10)

        const newUser = new User({
            ...req.body,
            password: hashPassword,

        });

        await newUser.save();
        const token = jwt.sign({
            id: newUser._id,
            isSeller: newUser.isSeller,
        }, process.env.JWT_KEY)


        const { password, ...info } = newUser._doc;


        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(201).send(info)




    } catch (error) {
        next(error);
    }


}



export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if (!user) {
            return next(createError(404, "User Not Found!!"));
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password)
        if (!validPassword) {
            return next(createError(400, "Wrong Password!!"));

        }

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        }, process.env.JWT_KEY)


        const { password, ...info } = user._doc;


        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).send(info)


    } catch (error) {
        next(error);
        // res.status(500).send("Something went wrong")

    }



}
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,

    }).status(200).send("User has been logged out")


}


// export const becomeSeller = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);

//         if (user) {
//             user.isSeller = true;
//             // Update user status to seller
//             await user.save();
//             res.status(200).json({ message: 'User is now a seller' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }



//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }