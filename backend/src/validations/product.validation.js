import {body, validationResult} from 'express-validator'

export const addProductValidation = [
    body('title')
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string")
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Title must be between 2 and 50 characters."),
    
    body('description')
        .exists().withMessage("Description is required")
        .isString().withMessage("Description must be a string")
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Description must between 20 and 500 characters"),
    
    body("price.amount")
        .exists().withMessage("Amount is required")
        .isFloat({ min: 0 }).withMessage("Amount must be greater than 0"),
    
    body("price.currency")
        .exists().withMessage("Currency is required")
        .isString().withMessage("Currency must be a string")
        .isIn(["INR", "USD"]).withMessage("Currency can only be INR or USD"),
    
    body("sizes")
        .exists().withMessage("Sizes are required")
        .isArray().withMessage("Sizes must be an array of objects"),
    
    body("sizes.*.size")
        .exists().withMessage("Size must be present in every entry")
        .isString().withMessage("Size must be a string")
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size can be XS, S, M, L, XL, XXL"),
    
    body("sizes.*.stock")
        .exists().withMessage("Stock must be present in every entry")
        .isInt({ min: 0 }).withMessage("Stock must be an integer value"),
    
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