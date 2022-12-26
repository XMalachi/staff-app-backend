import Task from '../models/tasksModel.js';
import Staff from '../models/staffModel.js'
//get posts


const getAllTasks = async (req, res) => {
    try{
       
        const copy = await Task.find({}).sort({_id:-1})
        
        res.status(200).json({
            message: 'success',
            tasks: copy
        })

    }catch(err){
        res.status(400).json({
            message: 'failed',
            error: err.message
        })
    }
}

const getTasks = async(req,res)=>{

    try{
        // let {owner} = req.query;
        const copy = await Task.find({}).sort({_id:-1})
        const owner = req.staff._id
        let searchResult = copy; 
        // console.log("the first search result", searchResult, owner)
        
        if(owner){
            searchResult = searchResult.filter((item)=>  item.owner.toString() === owner.toString())
        }

        console.log("the search result", searchResult, owner)
        res.status(200).json({
            message: 'success',
            tasks: searchResult
        })

    }catch(err){
        res.status(400).json({
            message: 'failed',
            error: err.message
        })
    }
}

const createTask = async(req, res) => {
    const {subject,owner, task, deadline, file, completed} = req.body;
    console.log("req.staff", req.user)
    try{
        const staff = await Staff.findOne({username:owner})
        console.log("created task owner", staff)
        const thetask = await Task.create({
            owner: staff._id,
            subject,
            task,
            deadline,
            file,
            completed
        })
        res.status(200).json({
            status: 'successful',
            tasks: thetask
        })
    }catch(err){
        res.json({
            status: 'failed',
            msg: err.message
        })
    }
}

// single  task
//get post
const getSinglePost = async(req,res)=>{
    const {id} = req.params

    const task =  await Task.findById(id)
    
    res.status(200).json({
        task: task
    })
}


const updateTask = async(req, res) => {
    const {id} = req.params
    const {subject, task, deadline, file, completed} = req.body
    try{
        const updatedTask = await Task.findById({_id:id})
        console.log("updated task", updatedTask)
        if(!updatedTask){
            res.status(400).json({
                msg:'No post found'
            })
        }
        if(subject){ 
            updatedTask.subject = subject
        }
        if(task){
            updatedTask.task = task
        }
        if(deadline){
            updatedTask.deadline = deadline 
        }
        if(file){
            updatedTask.file = file
        }
        if(completed){
            updatedTask.completed = completed
        }
        const savedTask = await updatedTask.save()
        console.log("updated task second", updatedTask)
        res.status(200).json({
            status: 'success',
            updatedTask: savedTask,
        })

    }catch(err){
        res.status(400).json({
            status: 'failed',
            error: err.message
        })
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params

    try{
        const taskToBeDeleted = await Task.findById({_id:id})
        
        if(!taskToBeDeleted){
            throw Error('No Task Found')
        }
        await taskToBeDeleted.remove()
        
        res.status(200).json({
            status: 'Success',
            message: 'Deleted Successfully'
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}


export {getAllTasks, getTasks, createTask, getSinglePost, updateTask, deleteTask}