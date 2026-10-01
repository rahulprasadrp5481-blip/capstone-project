import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
});

export default blogsSlice.reducer;