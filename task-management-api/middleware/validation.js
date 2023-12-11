const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


// Phone number validator middleware
const phoneNumberValidator = (value) => {
    // Define your phone number validation logic here
    // This example assumes a simple validation for a US phone number format
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(value);
};

const regValidator = [
    body('email').isEmail(),
    body('name').notEmpty(),
    body('password').notEmpty(),
    body('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .custom(phoneNumberValidator)
        .withMessage('Invalid phone number format')
];

const loginValidator = [
    body('email').isEmail(),
    body('password').notEmpty()
];

const taskValidator = [
    body("description").notEmpty()
]

function verifyJWT(req, res, next) {
    // if (req.session.autherization || req.header('Authorization')) {
    if (req.header('Authorization')) {
        token = req.header('Authorization') ? req.header('Authorization') : req.session.autherization["accessToken"];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (!err) {
                req.user = user;
                next();
            }
            else {
                return res.status(401).json({ message: "User is not authorized" });
            }
        })
    }
    else {
        return res.status(403).json({ message: "User not logged In." })
    }
}

module.exports = {
    regValidator,
    loginValidator,
    taskValidator,
    verifyJWT
};