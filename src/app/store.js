import { configureStore } from '@reduxjs/toolkit'

import gameReducer from '../features/game/gameSlice'
import settingsReducer from '../features/settings/settingsSlice'
import usersReducer from '../features/users/usersSlice'
import matchReducer from '../features/match/matchSlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
    users: usersReducer,
    match: matchReducer,
  }
})