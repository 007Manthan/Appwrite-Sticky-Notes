import { createContext, useState, useEffect } from 'react'
import Spinner from '../icons/Spinner'
import { db } from '../appwrite/databases'

export const NoteContext = createContext()

const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const noteData = { notes, setNotes, selectedNote, setSelectedNote }

  const init = async () => {
    const response = await db.notes.list()
    setNotes(response.documents)
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <NoteContext.Provider value={noteData}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Spinner size='100' />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  )
}

export default NoteProvider
