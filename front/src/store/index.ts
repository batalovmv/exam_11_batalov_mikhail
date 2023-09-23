import {configureStore} from '@reduxjs/toolkit';
import blocksReducer from '../features/blocksSlice.ts';

const store = configureStore({
  reducer: {
    blocks: blocksReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
