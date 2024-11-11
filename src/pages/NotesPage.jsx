import { useContext, useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard'
import { NoteContext } from '../context/NoteContext'

export default function NotesPage() {
  const { notes } = useContext(NoteContext)
  return (
    <div id='app'>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  )
}
