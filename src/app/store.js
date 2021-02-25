import { configureStore } from '@reduxjs/toolkit'

import gameReducer from '../features/game/gameSlice'
import settingsReducer from '../features/settings/settingsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
    users: usersReducer,
  }
})