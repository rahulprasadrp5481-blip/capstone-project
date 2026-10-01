import { createSlice } from "@reduxjs/toolkit";

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
});

export default hotelsSlice.reducer;