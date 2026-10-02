import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotels, getPrices } from "../features/hotels/hotelsSlice";
import { countries } from "../data/countries";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";

const PER_PAGE = 10;

export default function Hotels() {
  const dispatch = useDispatch();
  const { list, status, error, prices } = useSelector((s) => s.hotels);
  const [country, setCountry] = useState("IN");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getHotels(country));
  }, [country, dispatch]);

  useEffect(() => {
    const visibleIds = list.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((h) => h.id);
    const missing = visibleIds.filter((id) => prices[id] === undefined);
    if (missing.length) dispatch(getPrices(missing));
  }, [list, page, prices, dispatch]);

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setPage(1);
  };

  const visible = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Find Hotels</h1>
        <select
          value={country}
          onChange={handleCountry}
          className="border rounded-md px-3 py-2 bg-white"
          aria-label="Select country"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
      </div>

      {status === "loading" && <p className="text-center py-12">Loading hotels...</p>}

      {status === "failed" && (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => dispatch(getHotels(country))}
            className="px-4 py-2 bg-teal-700 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}

      {status === "succeeded" && list.length === 0 && (
        <p className="text-center py-12">No hotels found for this country.</p>
      )}

      {status === "succeeded" && list.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((h) => (
              <HotelCard key={h.id} hotel={h} price={prices[h.id]} />
            ))}
          </div>
          <Pagination total={list.length} perPage={PER_PAGE} page={page} onChange={setPage} />
        </>
      )}
    </section>
  );
}