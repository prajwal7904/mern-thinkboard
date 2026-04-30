import express from 'express'
import noteRoutes from './routes/noteRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors';
import { connectDb } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://69f308204dc1be754ee6f706--leafy-biscuit-425b8f.netlify.app"
    ],
    credentials: true,
  })
)

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes", noteRoutes)

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log('Server running on port :', PORT);
  })
});