import { body, validationResult } from 'express-validator'

export const registerValidation = [

    body("name")
        .trim()
        .exists().withMessage("Name is required.").bail()
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 to 50 characters.")
        .isString().withMessage("Name must be a string."),
    
    body("email")
        .trim()
        .exists().withMessage("Email is required.").bail()
        .isEmail().withMessage("Please enter a valid email address.")
        .isString().withMessage("Email must be a string."),
    
    body("password")
        .trim()
        .exists().withMessage("Password is required.")
        .isString().withMessage("Password must be string.")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    
        (req, res, next) => {
    const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Invalid request",
                    errors: errors.array()
                })
            }

            next()
    }
]