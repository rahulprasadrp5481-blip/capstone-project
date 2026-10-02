import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHotelsByCountry, fetchMinPrices } from "../../services/api";

export const getHotels = createAsyncThunk("hotels/getHotels", async (countryCode, { rejectWithValue }) => {
  try {
    return await fetchHotelsByCountry(countryCode);
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const getPrices = createAsyncThunk("hotels/getPrices", async (hotelIds) => {
  try {
    const found = await fetchMinPrices(hotelIds);
    const result = {};
    hotelIds.forEach((id) => { result[id] = found[id] ?? null; });
    return result;
  } catch {
    const result = {};
    hotelIds.forEach((id) => { result[id] = null; });
    return result;
  }
});

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: { list: [], status: "idle", error: null, prices: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHotels.pending, (s) => { s.status = "loading"; s.error = null; s.list = []; s.prices = {}; })
      .addCase(getHotels.fulfilled, (s, a) => { s.status = "succeeded"; s.list = a.payload; })
      .addCase(getHotels.rejected, (s, a) => { s.status = "failed"; s.error = a.payload || "Something went wrong"; })
      .addCase(getPrices.fulfilled, (s, a) => { Object.assign(s.prices, a.payload); });
  },
});

export default hotelsSlice.reducer;