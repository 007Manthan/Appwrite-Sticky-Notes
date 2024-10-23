import { useRef, useEffect, useState } from 'react'
import Trash from '../icons/Trash'
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../util'

export default function NoteCard({ note }) {
  const [position, setPosition] = useState(JSON.parse(note.position))

  const colors = JSON.parse(note.colors)
  const body = bodyParser(note.body)

  let mouseStartPosition = { x: 0, y: 0 }

  const cardRef = useRef(null)
  const textAreaRef = useRef(null)

  const mouseDown = (e) => {
    setZIndex(cardRef.current)
    mouseStartPosition.x = e.clientX
    mouseStartPosition.y = e.clientY
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
    document.body.classList.add('no-select')
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
        <Trash />
      </div>
      <div className='card-body'>
        <textarea
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
