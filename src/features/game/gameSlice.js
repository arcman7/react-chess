import { createSlice } from '@reduxjs/toolkit'

import { startingPositions } from './gameLogic'
import { Color } from '../../util'

const squareLayerCanMove = new Color(248, 172, 7, 0.6)
const canMoveColor = squareLayerCanMove.toNormal()

const board = []
const layers = []
for (let i = 0; i < 8; i++) {
  board.push(Array(8).fill(null))
  layers.push([])
  for (let j = 0; j < 8; j++) {
    layers[i].push([])
  }
}
const { player1, player2 } = startingPositions

player1.forEach((piece) => {
  const { row, col } = piece.pos
  piece.gameId = `player-1-${piece.type}-${Math.random()}`
  piece.playerId = 1
  board[row][col] = piece
})
player2.forEach((piece) => {
  const { row, col } = piece.pos
  piece.gameId = `player-2-${piece.type}-${Math.random()}`
  piece.playerId = 2
  board[row][col] = piece
})

const initialState = {
  dimensions: [8, 8],
  board,
  layers,
  currentPlayerTurn: 1,
  currentAction: {
    movePattern: null,
    piece: null,
  }
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    displayMovePattern: {
      prepare(positions) {
        return {
          payload: {
            positions,
          }
        }
      },
      reducer(state, action) {
        const { positions } = action.payload 
        positions.forEach(({ row , col }) => {
          state.layers[row][col].push(canMoveColor)
        })
        state.currentAction.movePattern = positions
      },
    },
    clearMovePattern(state) {
      const positions = state.currentAction.movePattern || []
      positions.forEach(({ row , col }) => {
        state.layers[row][col] = state.layers[row][col].filter(
          (colorObj) => colorObj === canMoveColor
        )
      })
      state.currentAction.movePattern = null
    },
    pieceSelected: {
      prepare(piece) {
        return {
          payload: {
            piece,
          } 
        }
      },
      reducer(state, action) {
        const { piece } = action.payload
        state.currentAction.piece = piece
      },
    },
    pieceMoveRequest: {
      prepare({ row, col }) {
        return {
          payload: {
            pos: { row, col },
          } 
        }
      },
      reducer(state, action) {
        const { pos } = action.payload
        const piece = state.currentAction.piece
        if (piece === null) {
          return
        }
        state.currentAction.piece = null
        const positions = state.currentAction.movePattern || []
        const allowedMove = positions.find(
          ({ row, col }) => (row === pos.row && col === pos.col)
        )
        if (!allowedMove) {
          return
        }
        const oldPos = piece.pos
        state.board[oldPos.row][oldPos.col] = null
        piece.pos = pos
        state.board[pos.row][pos.col] = piece
      },
    },
  },
})

export const { displayMovePattern, clearMovePattern, pieceSelected, pieceMoveRequest } = gameSlice.actions

export const selectBoard = state => state.game.board
export const selectLayers = state => state.game.layers

export default gameSlice.reducer