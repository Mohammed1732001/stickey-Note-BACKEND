import { Schema, Types, model } from "mongoose";


const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    userId: {
        fristName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            
            unique: true
        },
        age: {
            type: Number,
            default: 25,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
        confrimEmail: {
            type: Boolean,
            default: false
        }
    }
}, { timestamps: true })

export const noteModel = model("note", noteSchema)