import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (e) {
    console.error("Lưu vào localStorage thất bại", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);  
  } catch (e) {
    console.error("Lấy từ localStorage thất bại", e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();
const store = configureStore({
  reducer: {
    user: userReducer,  
  },
  preloadedState: {
    user: persistedState?.user, 
  },
});

store.subscribe(() => {
  saveToLocalStorage({
    user: store.getState().user,
  });
});

export default store;
