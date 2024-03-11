import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import authRoutes from './routes/auth.route.js'

const app = express()
app.use(express.json())
dotenv.config()

const port = process.env.PORT || 5000

app.listen(port, ()=> {
    connectDB()
    console.log(`Server is Running on ${port}`);
})

app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})