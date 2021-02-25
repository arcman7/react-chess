import { useState, useEffect } from 'react'

import { ChessPiece } from '../game/ChessPiece'

export const MousePiece = ({ selected, playerColors }) => {
  const [display, setDisplay] = useState('none')
  const [renderedPiece, setRenderedPiece] = useState(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const mouseMoveCb = (e) => {
    setX(e.pageX)
    setY(e.pageY)
  }

  useEffect(() => {
    if (selected.piece) {
      document.addEventListener('mousemove', mouseMoveCb)
      setDisplay('inline-block')
      setRenderedPiece(
      <ChessPiece
          key="mouse-anchor-chess-piece"
          pieceType={selected.piece.type}
          color={playerColors.color1.toString()}
          stroke={playerColors.color2.toString()}
        />
      )
    } else {
      document.removeEventListener('mousemove', mouseMoveCb)
      setDisplay('none')
      setRenderedPiece(null)
    }
  }, [selected])
  
  const anchor = (
    <div
      id="mouse-anchor"
      style={{
        position: 'absolute',
        display: display,
        zIndex: 1,
        left: x - 15,
        top: y + 1,
      }}>
        {renderedPiece}
    </div>
  )

  return anchor
}