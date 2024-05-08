// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DELETE_REQUEST } from "../store/actionTypes";
import { API_BASE_URL } from "../constant";

export const deleteUser = createAsyncThunk(
  DELETE_REQUEST,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}api/delete/${userId}`
      );
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define a thunk for deleting a user
// export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
//   await axios.delete(`/api/users/${userId}`);
//   return userId;
// });

// Define initial state
const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// Create a slice for managing users
const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    // Additional reducers for CRUD operations can be added here
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default deleteSlice.reducer;
