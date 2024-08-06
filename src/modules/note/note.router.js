import { Router } from "express";
import * as noteController from "../note/controller/note.js"
import { auth } from "../../middleware/auth.js";
import { validtion } from "../../middleware/validation.middleWare.js";
import * as validator from "../note/validation.js";
const router = Router()

router.post("/", auth, validtion(validator.addNote), noteController.addNote)
router.put("/:id", auth, validtion(validator.updateNote), noteController.updateNote)
router.delete("/:id", auth, noteController.deleteNote)
router.get("/", auth, noteController.notesWithUser)




export default router