import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_REQUEST } from "../store/actionTypes";
import { API_BASE_URL } from "../constant";

export const getUserById = createAsyncThunk(
  FETCH_REQUEST,
  async (userId, { rejectWithValue }) => {
    try {
      // console.log("getone callling");
      const response = await axios.get(`${API_BASE_URL}api/getone/${userId}`);
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const getUserByIdSlice = createSlice({
  name: "getUser",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default getUserByIdSlice.reducer;
