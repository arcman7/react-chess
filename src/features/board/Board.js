import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Color } from '../../util'

import { selectBoard, selectLayers, displayMovePattern, clearMovePattern, pieceSelected, pieceMoveRequest } from '../game/gameSlice'
import { selectBoardColors, selectPlayer1Colors, selectPlayer2Colors } from '../settings/settingsSlice'
import { canMove } from '../game/gameLogic'

import { Square } from './Square'
import { MousePiece } from './MousePiece'

function getType(piece) {
  if (piece === undefined || piece === null) {
    return ''
  }
  return piece.type
}

function getPieceKey(piece) {
  if (piece === undefined || piece === null) {
    return `${Math.random()}`
  }
  return piece.gameId
}

function getPlayerColors(piece, p1, p2) {
  if (piece === undefined || piece === null) {
    return {}
  }
  return piece.playerId === 1 ? p1 : p2
}

function isSelected(piece, selected) {
  if (piece === undefined || piece === null) {
    return null
  }
  return piece === selected.piece
}

export const Board = () => {
  const dispatch = useDispatch()
  const [rowEdge, colEdge] = useSelector(state => state.game.dimensions)
  const selected = useSelector(state => state.game.currentAction)
  const board = useSelector(selectBoard)
  const layers = useSelector(selectLayers)
  const { color1, color2 } = useSelector(selectBoardColors)
  const p1Colors = useSelector(selectPlayer1Colors)
  const p2Colors = useSelector(selectPlayer2Colors)
  const onMouseUp = () => {
    dispatch(clearMovePattern())
  }
  const [classStr, setClassStr] = useState('chess-board')

  useEffect(() => {
    if (selected.piece) {
      setClassStr('chess-board selected')
    } else {
      setClassStr('chess-board')
    }
  }, [selected])

  let isPrimary = true
  const renderedSquares = []
  for (let row = 0; row < rowEdge; row++) {
    for (let col = 0; col < colEdge; col++) {
      const piece = board[row][col]
      const pieceType = getType(piece)
      let positions = null
      if (pieceType) {
        positions = canMove[pieceType]({ x: row, y: col }, board)
      }
      renderedSquares.push(
        <Square
          key={`${row}-${col}`}
          color={isPrimary ? color1 : color2}
          pieceType={pieceType}
          pieceKey={getPieceKey(piece)}
          playerColors={getPlayerColors(piece, p1Colors, p2Colors)}
          layers={layers[row][col].map(
            colorNormal => Color.build(colorNormal)
          )}
          selected={isSelected(piece, selected)}
          onMouseDown={(e) => {
            e.preventDefault()
            if (piece) {
              dispatch(pieceSelected(piece))
              dispatch(displayMovePattern(positions))
            }
            window.dispatchEvent(new Event('click'))
          }}
          onMouseUp={() => {
            dispatch(pieceMoveRequest({ row, col }))
          }}
        />
      )
      isPrimary = !isPrimary
    }
    isPrimary = !isPrimary
  }

  return (
    <div
      className={classStr}
      onMouseUp={onMouseUp}>
      {renderedSquares}
      <MousePiece
        selected={selected}
        playerColors={p1Colors}
      />
    </div>
  )
}