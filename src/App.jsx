import NoteProvider from './context/NoteContext'
import NotesPage from './pages/NotesPage'

function App() {
  return (
    <>
      <div>
        <NoteProvider>
          <NotesPage />
        </NoteProvider>
      </div>
    </>
  )
}

export default App
