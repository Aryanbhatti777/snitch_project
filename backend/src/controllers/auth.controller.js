import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokens } from "../utils/generateToken.util.js";


export const Register = async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        return res.status(409).json({
            message: "User already exists",
            errors: [
                {
                    path: "email",
                    msg: "User already exists with this email address"
                }
            ]
        })
    }

    const user = await userModel.create({
        email,
        name,
        password: await bcrypt.hash(password, 10)
    })

    const { accessToken, refreshToken } = generateTokens({
        id: user._id,
        role: user.role
    })

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res.status(201).json({
        message: "User created successfully", 
        user: {
            name: user.name,
            email: user.email,
            id: user._id
        },
        accessToken
    })
}