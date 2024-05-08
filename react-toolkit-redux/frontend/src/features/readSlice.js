import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FETCH_REQUEST } from "../store/actionTypes";
import { API_BASE_URL } from "../constant";

export const fetchUsers = createAsyncThunk(
  FETCH_REQUEST,
  async (_, { rejectWithValue }) => {
    try {
      // console.log("axios callling");
      const response = await axios.get(`${API_BASE_URL}api/getall`);
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const readSlice = createSlice({
  name: "read",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default readSlice.reducer;
