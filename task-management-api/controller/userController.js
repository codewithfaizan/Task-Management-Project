const User = require("../model/User");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const logger = require("../logger/logger");
const env = require("dotenv").config();


async function regReq(req, res) {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send(result.array());
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = await User.find({ email: email });

        if (!user.length == 0) {
            logger.error("User already exists!!");
            return res.status(409).json({ message: "User already exists!!!" });
        }

        const newUser = await User.create(
            { name: name, email, email, password: hashPassword, phoneNumber: phoneNumber }
        );

        logger.info("User Successfully registered!! You can login!");
        return res.status(200).json({ message: "User Successfully registered!! You can login!" });
    }
    catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}


async function loginReq(req, res) {
    try {
        const { email, password } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            logger.error(`Form Validation Error Occured`);
            logger.error(result.array());
            return res.send(result.array());
        }

        const user = await User.findOne({ email: email });
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const accessToken = jwt.sign({
                    _id: user._id
                }, process.env.SECRET_KEY, { expiresIn: 60 * 60 });

                req.session.autherization = {
                    accessToken, user
                };
                
                return res.status(200).json({
                    "data": {
                        "accessToken": accessToken
                    },
                    message: "User Successfully logged In!!"
                });
            }
            else {
                return res.status(400).json({ error:  "Wrong Credentials!!!"});
            }
        }
        else {
            return res.status(401).json({ error:  "User is not Registered!"});
        }
    }
    catch (error) {
        logger.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

function logOutReq(req, res) {
    if (req.session.autherization["accessToken"]) {
        req.session.autherization["accessToken"] = null;
        logger.info("User logged Out!");
        return res.status(200).json({ title: "Successful", message: "User logged Out!" });
    }
    else {
        logger.info("User is not loogged In, Login First");
        return res.status(403).json({ message: "User is not loogged In, Login First" });
    }
}


const sendResetPasswordMail = async (name, email, passResetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASS
            }
        });

        // html: `<p> hi ${name}, Please copy the link <a href="http://127.0.0.1:3000/reset-password/${token}">Reset your password!</a>`
        // Change reset-password url for production level 
        const mailOptions = {
            from: "vishalprakash.maurya@w3villa.com",
            to: email,
            subject: "For Reset password",
            html: `<p> hi ${name}, Please copy the link <a href="https://task-management-api-wrqg.onrender.com/reset-password/${passResetToken}">Reset your password!</a> OR For the documentation level password-reset required token: ${passResetToken} </p>`,
        }


        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw new Error(err);
            }
    
        })
    }
    catch {
        (error) => {
            res.status(400).send({ message: error.message });
        }
    }
}


async function forgetPassword(req, res) {
    try {
        const email = req.body.email;
        const user = await User.find({ email: email });

        if (user.length > 0) {
            const passResetToken = randomstring.generate();
            const data = await User.updateOne({ email: email }, { $set: { passResetToken: passResetToken } });
            await sendResetPasswordMail(user[0].name, user[0].email, token);
            return res.status(200).json({ title: "Successful", message: "Please check your mail!!" });
        }
        else {
            throw new Error("User is not found!");
        }
    }
    catch (error) {
        logger.error(error.message);
        return res.status(400).json({ title: "Unsuccessful", message: error.message });
    }
}


async function resetPassword(req, res) {
    try {
        const passResetToken = req.params.passResetToken;
        const user = await User.find({ passResetToken: passResetToken });

        // 2a$10$rxcQ2WtyQkEC.HkponYqR.Q7P4yIGx5TGLVIEDfAc9qrVtlFb9gg2

        if (user.length > 0) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);

            const data = await User.updateOne({ passResetToken: passResetToken }, { $set: { password: hashPassword, token: null } });
            return res.status(200).json({ title: "Successful", message: "Password has been Successfully Updated!!" });
        }
        else {
            throw new Error("User is not found! Generated Token expired or invalid!");
        }
    }
    catch (error) {
        return res.status(400).json({ title: "Unsuccessful", message: error.message });
    }
}




module.exports = {
    regReq,
    loginReq,
    logOutReq,
    forgetPassword,
    resetPassword
}