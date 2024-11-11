import { useRef, useEffect, useState } from 'react'
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../util'
import { db } from '../appwrite/databases'
import Spinner from '../icons/Spinner'
import DeleteButton from './DeleteButton'

export default function NoteCard({ note }) {
  const [saving, setSaving] = useState(false)
  const [position, setPosition] = useState(JSON.parse(note.position))

  const colors = JSON.parse(note.colors)
  const body = bodyParser(note.body)

  const keyUpTimer = useRef(null)
  const cardRef = useRef(null)
  const textAreaRef = useRef(null)

  let mouseStartPosition = { x: 0, y: 0 }

  const mouseDown = (e) => {
    if (e.target.className === 'card-header') {
      setZIndex(cardRef.current)
      mouseStartPosition.x = e.clientX
      mouseStartPosition.y = e.clientY
      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
      document.body.classList.add('no-select')
    }
  }

  const mouseMove = (e) => {
    // Calculating mouse move direction
    let mouseMoveDir = {
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY,
    }
    // Resetting the initial coordinates for the card
    mouseStartPosition.x = e.clientX
    mouseStartPosition.y = e.clientY

    const cardPosition = setNewOffset(cardRef.current, mouseMoveDir)

    setPosition(cardPosition)
  }

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    document.body.classList.remove('no-select')
    const newPosition = setNewOffset(cardRef.current)
    saveData('position', newPosition)
  }

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) }

    try {
      await db.notes.update(note.$id, payload)
    } catch (error) {
      console.error(error)
    }

    setSaving(false)
  }

  const handleKeyUp = () => {
    setSaving(true)

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current)
    }

    keyUpTimer.current = setTimeout(() => {
      saveData('body', textAreaRef.current.value)
    }, 2000)
  }

  useEffect(() => {
    autoGrow(textAreaRef)
  }, [])

  return (
    <div
      onMouseDown={mouseDown}
      ref={cardRef}
      className='card'
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className='card-header'
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className='card-saving'>
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className='card-body'>
        <textarea
          onKeyUp={handleKeyUp}
          onFocus={() => setZIndex(cardRef.current)}
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => autoGrow(textAreaRef)}
        ></textarea>
      </div>
    </div>
  )
}
