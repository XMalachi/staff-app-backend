import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const staffSchema = new mongoose.Schema({
    name: {type:String, required:[true, 'name is required']},
    username: {type:String, required:[true, 'username is required'], unique:true},
    email:{type:String, required:[true, 'email is required'],unique:true},
    position:{type:String, required:[true, 'position is required']},
    role:{type:String, required:true, enum:['client', 'admin'], default:'client'},
    password:{type:String, required:[true, 'password is required']},
    image: {type:String}
})

staffSchema.methods.passwordMatched = async function(passwordToBeVerified){
    return await bcrypt.compare(passwordToBeVerified, this.password)
}

staffSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    console.log("salt", salt)
    const hashed = await bcrypt.hash(this.password, salt)
    console.log("hashed", hashed)

    this.password = hashed

})

const Staff = mongoose.model("Staff", staffSchema)

export default Staff