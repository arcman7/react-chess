import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  gamesPlayed: 0,
  currentMatch: null,
  availableMatches: [],
  baseUrl: '',
}

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {}
})

export default matchSlice.reducer