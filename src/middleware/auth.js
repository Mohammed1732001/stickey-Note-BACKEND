import jwt from "jsonwebtoken";
import { asyncHandler } from "../modules/utils/errorHandling.js";
import { userModel } from "../../DB/models/user.model.js";


export const auth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        next(new Error(" authorization is required "))
    }
    const decoded = jwt.verify(authorization, process.env.TOKEN_PASSCODE)
    if (!decoded?.id) {
        next(new Error(" In-valied Token Payload "))
    }
    const user = await userModel.findById(decoded.id)
    if (!user) {
        next(new Error(" Not Rigister user "))
    }
    req.user = user
    // console.log(user);
    return next()
}) 