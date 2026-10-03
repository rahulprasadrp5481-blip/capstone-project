import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHotelDetail, fetchReviews } from "../../services/api";

export const getHotelDetail = createAsyncThunk(
  "hotelDetail/getHotelDetail",
  async (hotelId, { rejectWithValue }) => {
    try {
      const [hotel, reviews] = await Promise.all([
        fetchHotelDetail(hotelId),
        fetchReviews(hotelId).catch(() => []),
      ]);
      return { hotel, reviews };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const hotelDetailSlice = createSlice({
  name: "hotelDetail",
  initialState: { hotel: null, reviews: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHotelDetail.pending, (s) => {
        s.status = "loading";
        s.error = null;
        s.hotel = null;
        s.reviews = [];
      })
      .addCase(getHotelDetail.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.hotel = a.payload.hotel;
        s.reviews = a.payload.reviews;
      })
      .addCase(getHotelDetail.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || "Something went wrong";
      });
  },
});

export default hotelDetailSlice.reducer;