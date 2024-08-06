import { userModel } from "../../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/errorHandling.js";



export const getUserProfile = asyncHandler(async (req, res, next) => {

    const decoded = jwt.verify(req.headers.authorization, process.env.TOKEN_PASSCODE)
    const user = await userModel.findById(decoded.id)
    return res.status(200).json({ message: `Hello ${decoded.userName}`, user })
})


export const updateUser = asyncHandler(async (req, res, next) => {
    const { userName, age } = req.body
    console.log({ userName, age });
    const user = await userModel.updateMany({ userName, age })
    res.status(201).json({ message: "Done" })

})

export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndDelete(req.user._id)
    res.status(200).json({ message: "Done" })

})

export const profilePic = asyncHandler(async (req, res, next) => {
    res.json({ file: req.folderName })
})
export const cover = asyncHandler(async (req, res, next) => {
    res.json({ file: req.folderName })
})