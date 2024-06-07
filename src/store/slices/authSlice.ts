import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store.ts'

export interface AuthState {
  isLogin?: boolean
  jwt: string | null
}

const initialState = () => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return {
      isLogin: true,
      jwt
    }
  } else {
    return {
      isLogin: false,
      jwt: null
    }
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogin = true
      state.jwt = action.payload
      localStorage.setItem('jwt', JSON.stringify(state.jwt))
    },
    loggedOut: (state) => {
      state.isLogin = false
      state.jwt = ''
      localStorage.removeItem('jwt')
    }
  }
})

export const {login, loggedOut} = authSlice.actions
export const selectLogin = (state:RootState) => state.auth.isLogin

export default authSlice.reducer
