import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  // role: null,
  maThanhVien: null,
  lichSuTapLuyen: [], 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.maThanhVien = action.payload.maThanhVien;
    },
    doLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.maThanhVien = null;
      state.lichSuTapLuyen = []; 
      localStorage.removeItem('userState');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
    },
    restoreSession: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.maThanhVien = action.payload.maThanhVien;
    },
    setLichSuTapLuyen: (state, action) => {
      state.lichSuTapLuyen = action.payload;
    }
  },
});

export const { doLogin, doLogout, restoreSession, setLichSuTapLuyen } = userSlice.actions;
export default userSlice.reducer;
