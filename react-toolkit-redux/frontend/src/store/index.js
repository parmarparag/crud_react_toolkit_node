import { configureStore } from '@reduxjs/toolkit';
// import createReducer from '../features/createSlice';
import readReducer from '../features/readSlice';
// import updateReducer from '../features/updateSlice';
// import deleteReducer from '../features/deleteSlice';

const store = configureStore({
  reducer: {
    // create: createReducer,
    read: readReducer,
    // update: updateReducer,
    // delete: deleteReducer,
  },
});

export default store;
