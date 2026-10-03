import { verifyAcessToken } from "../utils/verifyToken.util.js";

export const authenticateUser = async (req, res, next) => {

    try {
        
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access. Token required"
            })
        }

        const decoded = verifyAcessToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const authenticateSeller = (req, res, next) => {

    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "Access Forbidden for user"
        })
    }

    next()
}