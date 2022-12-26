import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import {router as StaffsRoutes} from './routes/staffsRoutes.js'
import {router as TasksRoutes} from './routes/tasksRoutes.js'
import {connectDB} from './config/db.js'
const app = express()

app.use(cors("http://localhost:3000", "https://staffapp.onrender.com"))
app.use(morgan('dev'))
app.use(express.json({limit:'50mb'}))
// app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.use('/api/v1/staffs', StaffsRoutes)
app.use('/api/v1/tasks', TasksRoutes)

app.get('/', async(req, res)=> {
    const msg =  "server is up"

    try{
        res.status(200).json({
            status: 'good',
            msg
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            error: err
        })
    }
})

// app.listen(port, (err)=>{
//     if(err) throw(err)
//     console.log('server successfully staged'.bgGreen)
// })

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
}

const start = async(port) => {
    try{

        const conn = await connectDB();
        app.listen(port, (err)=>{
            if(err){
               console.log(err)
               return
            }
            console.log('server is running'.bgCyan)
       })
       console.log(process.env.PORT)

       console.log(`Database is up and running on ${conn.connection.host}`.bgGreen.underline)
    }catch(err){
      console.log(`${err}`.bgRed.underline)
    }
}



start(PORT)
