import { asyncHandler } from "../../utils/errorHandling.js";
import { noteModel } from "../../../../DB/models/note.model.js";

export const addNote = asyncHandler(async (req, res, next) => {
    const { title, desc } = req.body
    const userId = req.user._id
    const note = await noteModel.create({ title, desc, userId })
    res.status(201).json({ message: "Done", note })
})
// ناقصه اعمل اتشك لليوزر
export const updateNote = asyncHandler(async (req, res, next) => {
    const { title, desc } = req.body
    const { id } = req.params
    const note = await noteModel.findById(id)
    if (!note) {
        return next(new Error('invalid note id'))
    }
    if (note.userId.toString() != req.user._id.toString()) {
        return next(new Error('you are not allowed to delete this note'))
    }

    const updatedData = await noteModel.findByIdAndUpdate({ _id: id }, { title, desc }, { new: true })
    res.status(200).json({ message: "Done", updatedData })
})
// ناقصه اعمل اتشك لليوزر
export const deleteNote = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const note = await noteModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Done" })
})
export const notesWithUser = asyncHandler(async (req, res, next) => {
    const noteList = await noteModel.find({ userId: req.user._id }).populate([{
        path: "userId"
    }])
    return res.json({ message: "Done", noteList })
})
