import Trash from '../icons/Trash'
import { db } from '../appwrite/databases'
import { useContext } from 'react'
import NoteProvider, { NoteContext } from '../context/NoteContext'

export default function DeleteButton({ noteId }) {
  const { setNotes } = useContext(NoteContext)
  const handleDelete = async () => {
    await db.notes.delete(noteId)
    setNotes((prevState) => {
      return prevState.filter((note) => note.$id !== noteId)
    })
  }
  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  )
}
