import jwt from 'jsonwebtoken'
import config from "../configs/env.config.js"

export const generateTokens = ({ id, role}) => {

    const accessToken = jwt.sign({id, role}, config.ACCESS_SECRET, { expiresIn: "12m" });
    const refreshToken = jwt.sign({id, role}, config.REFRESH_SECRET, { expiresIn: "7d" });

    return {accessToken, refreshToken}
}