import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UPDATE_REQUEST } from "../store/actionTypes";
import { API_BASE_URL } from "../constant";

export const updateUser = createAsyncThunk(
  UPDATE_REQUEST,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}api/update/${userId}`);
      console.log("response==> update", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const editSlice = createSlice({
  name: "update",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the user in the users array
        const updatedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editSlice.reducer;
