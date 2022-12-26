import Staff from '../models/staffModel.js'
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

const getStaff = async(req, res) => {
    try{
        const staffs = await Staff.find({}).sort({_id:-1})
        await res.status(200).json({
            status: 'success',
            staffs
        })
    }catch(err){
        res.status(200).json({
            status: 'error',
            error: err.message
        })
    }
}
const createStaff = async(req, res) =>{
    const {name, username, email, position, password, image} = req.body
    try{
        const staffExist = await Staff.find({email:email})
        console.log("does user exist", staffExist)
        if(staffExist > 0){
            throw new Error('Staff Already Exists')
        }

        const staff = await Staff.create({
            name, username, email, position, password
        })

        res.status(200).json({
            status: 'Success',
            staff: {
                _id: staff._id,
                name: staff.name,
                username: username,
                email: staff.email,
                position: staff.position,
                image: image
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            error: err.message
        })
    }
}

//@desc : login user
//route: POST /api/v1/users/login
//access: public 
const loginStaff = asyncHandler(async(req,res) => {
    const {username, password} = req.body
        try{
            //check that email exist
            const staff = await Staff.findOne({username:username})
            if(!staff){
                res.status(402)
                throw new Error('Staff does not exist, pls register')
            }

            if(staff && (await staff.passwordMatched(password))){
                console.log("staff password match",  staff.passwordMatched(password))
                res.status(201).json({
                    status:'success',
                    staff:{
                        _id:staff._id,
                        username:staff.username,
                        role: staff.role,
                        token: await generateToken(staff._id)
                    }
                })
            }else{
                res.status(402)
                throw new Error('incorrect password or Email')
            }
    }catch(err){
            console.log(err)
            res.status(401).json({
                status:'failed',
                error:err.message
            })
        }

})


export {getStaff, createStaff, loginStaff}