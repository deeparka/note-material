import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import Masonry from '@mui/lab/Masonry'

export default function Notes() {
  const breakpoints = { sm: 1, md: 2, lg: 3 }
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/notes`)
    .then(response => response.json())
    .then(data => setNotes(data))
  }, [])

  async function handleDelete(id) {
    await fetch(`http://localhost:8000/notes/` + id, {
      method: "DELETE"
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }


  return (
    <Container>
     <Masonry columns={breakpoints} spacing={2}>
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
