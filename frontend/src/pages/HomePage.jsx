import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {
  const [isRateLimiter,setIsRateLimiter]=useState(true)
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
  const fetchNotes = async()=>{
    try {
      const res = await api.get("/notes")
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimiter(false)

    } catch (error) {
      console.error("Error fetching data");
      console.log(error);
      
      if(error.response?.status ===429){
        setIsRateLimiter(true)
      }else{
        toast.error("Failed to load notes")
      } 
    }finally{
        setLoading(false)
      };
  };
  fetchNotes();
},[])

  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimiter && <RateLimitedUI/>}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className ="text-center text-primary py-10">Loading notes...</div>}
        {notes.length===0 &&!isRateLimiter && <NotesNotFound/>}
        {notes.length>0 &&!isRateLimiter &&(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note=>(
              <NoteCard key={note._id} note={note} setNote={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>

  )
}

export default HomePage