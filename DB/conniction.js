import mongoose from "mongoose";


const connectDB = async () => {
    return await mongoose.connect(process.env.DB_URL).then(result => {
        console.log("DB connected");
    }).catch(err => {
        console.log("DOWN SERVER");
        console.log(err);
    })
}

export default connectDB