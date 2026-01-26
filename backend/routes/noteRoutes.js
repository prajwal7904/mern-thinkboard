import express from "express"
import { createNote,getNoteById, deleteNote, getNotes, updateNote } from "../controller/noteController.js"

const route = express.Router()

route.get("/",getNotes)
route.get("/:id",getNoteById)
route.post("/",createNote)
route.put("/:id",updateNote)
route.delete("/:id",deleteNote)




export default route
