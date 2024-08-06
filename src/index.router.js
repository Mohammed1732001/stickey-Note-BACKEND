import connectDB from "../DB/conniction.js"
import userRouter from "../src/modules/user/user.router.js"
import authRouter from "../src/modules/auth/auth.router.js"
import notesRouter from "../src/modules/note/note.router.js"
import { globalErrorHandling } from "./modules/utils/errorHandling.js"


// محتاج ال feature api 
const bootstrap = (app, express) => {
    app.use(express.json())
    app.use("/user", userRouter)
    app.use("/auth", authRouter)
    app.use("/notes", notesRouter)

    app.use("*", (req, res, next) => {
        res.send("Not Found Router 404 ")
    })

    // error 
    app.use(globalErrorHandling)

    // connectDB
    connectDB()
}

export default bootstrap