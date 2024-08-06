import { auth } from "../../middleware/auth.js";
import * as userContrller from "../user/controller/user.js"
import { Router } from "express";
import { uploadFile } from "../utils/multer.js";
import { validtion } from "../../middleware/validation.middleWare.js";
import * as validator from "../user/validation.js";

const router = Router()
router.get("/", auth, userContrller.getUserProfile)
router.put("/", auth, validtion(validator.updateUser), userContrller.updateUser) 
router.delete("/", auth, userContrller.deleteUser)

// نعمل فالديشن للصور اللي جايه والفيلات 
router.post('/profile-pic', auth, uploadFile('profile').single('image'),    userContrller.profilePic)
router.post('/cover-pic', uploadFile('cover').array('images', 3), userContrller.cover)
export default router