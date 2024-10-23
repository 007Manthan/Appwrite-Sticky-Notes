import { useEffect, useState } from 'react'
import { db } from '../appwrite/databases'
import NoteCard from '../components/NoteCard'

export default function NotesPage() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const response = await db.notes.list()
    console.log(response)
    setNotes(response.documents)
  }

  return (
    <div id='app'>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  )
}
