import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
        subject: {type:String},
        owner:{
            type: mongoose.Schema.ObjectId, 
            required:true,
            ref:'Staff'
        },
        task: {type:String, required:[true, 'task is required']},
        deadline: {type:Date, required:[true, 'deadline is required']},
        file: {type:String},
        completed: {type: Boolean, default:false}
        
    },
    {
        timestamps: true
    }
)


const Task = mongoose.model("Task", tasksSchema)

export default Task