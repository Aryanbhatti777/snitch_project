import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateTokens } from "../utils/generateToken.util.js";


export const Register = async (req, res) => {

    try {
        
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

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const Login = async (req, res) => {

    try {
        
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password."
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const { accessToken, refreshToken } = generateTokens({ id: user._id, user: user.role })

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        return res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}