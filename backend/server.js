import express from 'express'
import noteRoutes from './routes/noteRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors';
import {connectDb} from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'


dotenv.config();

const app =express()
const PORT = process.env.PORT ||5000



if(process.env.NODE_ENV !=='production'){
app.use(
    cors({
    origin:"http://localhost:5173",
})) 
}
app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes",noteRoutes)


// Root route (health check)
app.get('/', (req, res) => {
    res.send('ThinkBoard Backend is running 🚀');
});


connectDb().then(()=>{
    
    app.listen(PORT,()=>{
    console.log('Server running on port :',PORT);
    
})
}); 