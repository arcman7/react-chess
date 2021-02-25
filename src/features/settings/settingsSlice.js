import { createSlice } from '@reduxjs/toolkit'

import { Color } from '../../util'

const initialState = {
  board: {
    color1: new Color(144, 238, 144, 1).toNormal(), // lightgreen,
    color2: new Color(86, 156, 40, 1).toNormal(), // darkgreen
  },
  player1: {
    color1: new Color(0, 0, 0, 1).toNormal(),
    color2: new Color(255, 255, 255, 1).toNormal(),
  },
  player2: {
    color1: new Color(255, 255, 255, 1).toNormal(),
    color2: new Color(0, 0, 0, 1).toNormal(),
  },
}
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeBoardColor: {
      prepare(color1, color2) {
        return {
          payload: {
            color1,
            color2,
          }
        }
      },
      reducer(state, action) {
        const { color1, color2 } = action.payload
        state.board.color1 = color1
        state.board.color2 = color2
      },
    },
    changePlayerColor: {
      prepare(playerId, color1, color2) {
        return {
          payload: {
            playerId,
            color1,
            color2,
          }
        }
      },
      reducer(state, action) {
        const { playerId, color1, color2 } = action.payload
        state[`player${playerId}`].color1 = color1
        state[`player${playerId}`].color2 = color2
      },
    },
  }
  
})

export default settingsSlice.reducer

export const selectBoardColors = state => {
  const {color1, color2 } = state.settings.board
  return { 
    color1: Color.build(color1),
    color2: Color.build(color2),
  }
}

export const selectPlayer1Colors = state => {
  const {color1, color2 } = state.settings.player1
  return { 
    color1: Color.build(color1),
    color2: Color.build(color2),
  }
}

export const selectPlayer2Colors = state => {
  const {color1, color2 } = state.settings.player2
  return { 
    color1: Color.build(color1),
    color2: Color.build(color2),
  }
}
