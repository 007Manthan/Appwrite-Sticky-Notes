// export const setNewOffset = (card, mouseMoveDirection = { x: 0, y: 0 }) => {
//   const offSetLeft = card.offsetLeft - mouseMoveDirection.x
//   const offSetTop = card.offsetTop - mouseMoveDirection.y
//   const containerWidth = card.parentElement.clientWidth
//   const containerHeight = card.parentElement.clientHeight
//   const cardWidth = card.offsetWidth
//   const cardHeight = card.offsetHeight

//   return {
//     x:
//       offSetLeft < 0
//         ? 0
//         : offSetLeft > containerWidth - cardWidth
//         ? containerWidth - cardWidth
//         : offSetLeft,
//     y:
//       offSetTop < 0
//         ? 0
//         : offSetTop > containerHeight - cardHeight
//         ? containerHeight - cardHeight
//         : offSetTop,
//   }
// }

export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offSetLeft = card.offsetLeft - mouseMoveDir.x
  const offSetTop = card.offsetTop - mouseMoveDir.y

  return {
    x: offSetLeft < 0 ? 0 : offSetLeft,
    y: offSetTop < 0 ? 0 : offSetTop,
  }
}

export function autoGrow(textAreaRef) {
  const { current } = textAreaRef
  current.style.height = 'auto'
  current.style.height = `${current.scrollHeight}px`
}

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 69

  Array.from(document.getElementsByClassName('card')).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1
    }
  })
}

export const bodyParser = (value) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
