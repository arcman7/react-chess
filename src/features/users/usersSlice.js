import AnimalAvatar from 'animal-avatars.js'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const anim = new AnimalAvatar()
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const initialState = {
  userInfo: {
    username: 'Guest - The ' + anim.getAvatarName(),
    name: anim.getAvatarName(),
    email: null,
    auth: null,
    id: 'Guest ' + Math.random(),
    picUrl: `https://place-puppy.com/${100 + getRandomInt(0, 10)}x${100 + getRandomInt(0, 10)}`,
  },
  loggedIn: false,
  status: 'idle',
}

export const userLogin = createAsyncThunk('user/login',
 // The payload creator recieves the login method to be used
  async (loginMethod) => {
    const account = await loginMethod()
    return account
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserInfo: {
      prepare(userInfo) {
        return {
          payload: userInfo
        }
      },
      reducer(state, action) {
        const account = action.payload
        state.userInfo = { ...state.userInfo, ...account }
        state.userInfo.username = account.name + ' - The ' + anim.getAvatarName()
        state.loggedIn = true
      },
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.status = 'loading'
    },
    [userLogin.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      const account  = action.payload
      const userInfo = { ...state.userInfo, ...account }
      userInfo.username = account.name + ' - The ' + anim.getAvatarName()

      state.userInfo = userInfo
      state.loggedIn = true
    }
  }
})

export const selectUserInfo = state => state.users.userInfo
export const { setUserInfo } = usersSlice.actions
export default usersSlice.reducer