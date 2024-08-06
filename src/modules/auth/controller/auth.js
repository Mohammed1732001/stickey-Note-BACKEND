import { userModel } from "../../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { asyncHandler } from "../../utils/errorHandling.js";
import sendEmail from "../../utils/email.js";



export const signUp = asyncHandler(async (req, res, next) => {
    const { fristName, userName, lastName, email, password } = req.body
    const cheackUser = await userModel.findOne({ email })
    if (cheackUser) {
        return next(new Error("Email Exiest"))
    }
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    const user = await userModel.create({ fristName, userName, lastName, email, password: hash })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_CONFIRM_EMAIL, { expiresIn: 60 * 5 })
    const reToken = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_CONFIRM_EMAIL, { expiresIn: "1m" })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const reLink = `${req.protocol}://${req.headers.host}/auth/confirmEmail/resend/${reToken}`
    await sendEmail({
        to: email,
        subject: "Test Email",
        text: "Hello",
        html: `<!DOCTYPE html>
    <html>
    <head>
    
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }
    
    
            body,
            table,
            td,
            a {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
    
            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            a {
                color: #1a82e2;
            }
    
            img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
            }
        </style>
    
    </head>
    
    
    <!-- start body -->
    <body style="background-color: #e9ecef;">
    
    
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
    
            <!-- start hero -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                <h1
                                    style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                    Confirm Your Email Address</h1>
                            </td>
                        </tr>
                    </table>
                    
                </td>
            </tr>
            <!-- end hero -->
    
            <!-- start copy block -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">Tap the button below to confirm your email address. </p>
                            </td>
                        </tr>
                        <!-- end copy -->
    
                        <!-- start button -->
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                        <a href="${link}" target="_blank"
                                                            style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                            This my Email </a>
                                                    </td>
                                                </tr>
                                                <br/>
                                                <br/>
                                                <tr>
                                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                        <a href="${reLink}" target="_blank"
                                                            style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                            Re-Send </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- end button -->
    
                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                <p style="margin: 0;">Cheers,<br> Paste</p>
                            </td>
                        </tr>
                        <!-- end copy -->
    
                    </table>
    
                </td>
            </tr>
    
            <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    </table>
    
                </td>
            </tr>
        </table>
    
    
    </body>
    
    </html>`
    }
    )
    return res.status(201).json({ message: "Done", user })
})



export const logIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email, userName: user.userName, role: user.role }
            , process.env.TOKEN_PASSCODE, { expiresIn: 60 * 30 })
        return res.status(200).json({ message: "Done", token })
    }
    return next(new Error("Invalied Email And Password"))
})

export const confirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    const decoded = jwt.verify(token, process.env.TOKEN_CONFIRM_EMAIL)
    const user = await userModel.updateOne({ _id: decoded.id }, { confrimEmail: true })
    return res.json({ message: "Done", user })
    // return user.modifiedCount?res.redirect("link of login page from El Front end"):res.send("<a href='link of signup page from El Front end' >Not Rigister user please go to Rigister and cheack you Email </a>")

})

export const reFreshConfirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    const decoded = jwt.verify(token, process.env.TOKEN_CONFIRM_EMAIL)
    const user = await userModel.findById({ _id: decoded.id })
    if (!user) {
        return res.send("<a href='link of signup page from El Front end' >Not Rigister user please go to Rigister and cheack you Email </a>")
    }
    if (user.confrimEmail) {
        // res.redirect("link of login page from El Front end")
        return res.json({ message: "Done", user })
    }
    const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.TOKEN_CONFIRM_EMAIL, { expiresIn: 60 * 3 })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    await sendEmail({
        to: decoded.email,
        subject: "Test Email",
        text: "Hello",
        html: `<!DOCTYPE html>
    <html>
    <head>
    
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            @media screen {
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
            }
    
    
            body,
            table,
            td,
            a {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }
    
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
    
            body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            a {
                color: #1a82e2;
            }
    
            img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
            }
        </style>
    
    </head>
    
    
    <!-- start body -->
    <body style="background-color: #e9ecef;">
    
    
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
    
            <!-- start hero -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                <h1
                                    style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                    Confirm Your Email Address</h1>
                            </td>
                        </tr>
                    </table>
                    
                </td>
            </tr>
            <!-- end hero -->
    
            <!-- start copy block -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">Tap the button below to confirm your email address. </p>
                            </td>
                        </tr>
                        <!-- end copy -->
    
                        <!-- start button -->
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                        <a href="${link}" target="_blank"
                                                            style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                            This my Email </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- end button -->
    
                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                <p style="margin: 0;">Cheers,<br> Paste</p>
                            </td>
                        </tr>
                        <!-- end copy -->
    
                    </table>
    
                </td>
            </tr>
    
            <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    </table>
    
                </td>
            </tr>
        </table>
    
    
    </body>
    
    </html>`
    })
    return res.send("<p>Cheack Your Email</p>")
    // return user.modifiedCount?res.redirect("link of login page from El Front end"):res.send("<a href='link of signup page from El Front end' >Not Rigister user please go to Rigister and cheack you Email </a>")

})