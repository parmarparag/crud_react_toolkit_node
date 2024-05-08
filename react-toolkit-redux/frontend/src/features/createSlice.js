import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CREATE_REQUEST } from "../store/actionTypes";
import { API_BASE_URL } from "../constant";

export const createUser = createAsyncThunk(
  CREATE_REQUEST,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}api/create`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addSlice = createSlice({
  name: "create",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default addSlice.reducer;
