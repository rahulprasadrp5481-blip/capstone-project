import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogs } from "../../services/api";

export const getBlogs = createAsyncThunk("blogs/getBlogs", async (_, { rejectWithValue }) => {
  try {
    return await fetchBlogs();
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (s) => { s.status = "loading"; s.error = null; })
      .addCase(getBlogs.fulfilled, (s, a) => { s.status = "succeeded"; s.list = a.payload; })
      .addCase(getBlogs.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || "Something went wrong"; });
  },
});

export default blogsSlice.reducer;