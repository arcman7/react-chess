import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { ChessPiece } from '../game/ChessPiece'
import { normal } from 'color-blend/unit'
import { Color } from '../../util'
export const Square = ({ color, pieceType, pieceKey, selected, layers, playerColors, onMouseDown, onMouseUp, passedRef }) => {

  let usedColor = color.toNormal()
  layers.forEach((colorObj) => {
    // blend the colors
    usedColor = normal(usedColor, colorObj.toNormal())
  })
  usedColor = Color.getColorStr(usedColor)

  let renderedChessPiece
  if (pieceType) {
    renderedChessPiece = (
      <ChessPiece
        id={pieceKey}
        key={pieceKey}
        pieceType={pieceType}
        color={playerColors.color1.toString()}
        stroke={playerColors.color2.toString()}
      />
    )
  } else {
    renderedChessPiece = null
  }
  const container = document.getElementById('mouse-anchor')
  useEffect(() => {
    if (selected) {
      ReactDOM.createPortal(<ChessPiece
        id={pieceKey}
        key={pieceKey}
        pieceType={pieceType}
        color={playerColors.color1.toString()}
        stroke={playerColors.color2.toString()}
      />, container)
    }
  }, [selected])

  return (
    <div
      className='square'
      style={{ backgroundColor: usedColor }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      >
      {selected ? null : renderedChessPiece}
    </div>
  )
}