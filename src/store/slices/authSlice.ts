import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store.ts'

export interface AuthState {
  isLogin?: boolean
  jwt: string
  userId: string
  username: string
}

const initialState: () => AuthState = () => {
  const [jwt, userId, username] = ['jwt', 'userId', 'username'].map(key => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  })
  return {
    isLogin: !!(jwt && userId && username),
    jwt: jwt ?? '',
    userId: userId ?? '',
    username: username ?? ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<AuthState, 'isLogin'>>) => {
      const {jwt, userId, username} = action.payload
      state.isLogin = true
      state.jwt = jwt
      state.userId = userId
      state.username = username
      localStorage.setItem('jwt', JSON.stringify(state.jwt))
      localStorage.setItem('userId', JSON.stringify(state.userId))
      localStorage.setItem('username', JSON.stringify(state.username))
    },
    loggedOut: (state) => {
      state.isLogin = false
      state.jwt = ''
      state.userId = ''
      state.username = ''
      const removeItems = ['jwt', 'userId', 'username']
      removeItems.forEach(key => {
        localStorage.removeItem(key)
      })
    }
  }
})

export const {login, loggedOut} = authSlice.actions
export const selectLogin = (state: RootState) => state.auth.isLogin
export const selectUsername = (state: RootState) => state.auth.username
export const selectUserId = (state: RootState) => state.auth.userId

export default authSlice.reducer
