import { useContext, useEffect, useState } from 'react'
import Controls from '../components/Controls'
import NoteCard from '../components/NoteCard'
import { NoteContext } from '../context/NoteContext'

export default function NotesPage() {
  const { notes } = useContext(NoteContext)
  return (
    <div id='app'>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  )
}
