import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaStar, FaArrowLeft } from "react-icons/fa";
import { getHotelDetail } from "../features/hotels/hotelDetailSlice";
import { getPrices } from "../features/hotels/hotelsSlice";
import { addFavourite, removeFavourite } from "../features/favourites/favouritesSlice";
import { formatPrice } from "../utils/format";
import ImageCarousel from "../components/ImageCarousel";

export default function HotelDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { hotel, reviews, status, error } = useSelector((s) => s.hotelDetail);
  const price = useSelector((s) => s.hotels.prices[id]);
  const isFav = useSelector((s) => s.favourites.items.some((h) => h.id === id));
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getHotelDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (price === undefined) dispatch(getPrices([id]));
  }, [id, price, dispatch]);

  const toggleFav = () => {
    if (isFav) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(
        addFavourite({
          id,
          name: hotel.name,
          city: hotel.city,
          main_photo: hotel.main_photo,
          rating: hotel.rating,
          reviewCount: hotel.reviewCount,
          stars: hotel.stars,
        })
      );
    }
  };

  if (status === "idle" || status === "loading") {
    return <p className="text-center py-20">Loading hotel details...</p>;
  }

  if (status === "failed") {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => dispatch(getHotelDetail(id))}
          className="px-4 py-2 bg-teal-700 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!hotel) return null;

  const facilities = showAll ? hotel.facilities : hotel.facilities.slice(0, 12);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/hotels" className="inline-flex items-center gap-2 text-teal-700 mb-4 hover:underline">
        <FaArrowLeft /> Back to hotels
      </Link>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600 mt-1">
            {hotel.address}, {hotel.city}
          </p>
          <div className="flex items-center gap-3 mt-3 text-sm">
            <span className="flex items-center gap-1 bg-teal-700 text-white px-2 py-1 rounded">
              <FaStar /> {hotel.rating}
            </span>
            <span className="text-gray-600">
              {hotel.reviewCount?.toLocaleString("en-IN")} reviews
            </span>
            {hotel.stars ? <span className="text-yellow-500">{"★".repeat(hotel.stars)}</span> : null}
          </div>
        </div>

        <div className="md:text-right">
          <p className="font-semibold text-lg">
            {price === undefined
              ? "Loading price..."
              : price === null
              ? "Price unavailable"
              : `From ${formatPrice(price)} / night`}
          </p>
          <button
            onClick={toggleFav}
            className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
              isFav ? "bg-red-500 text-white border-red-500" : "text-red-500 border-red-500 hover:bg-red-50"
            }`}
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
            {isFav ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
      </div>

      <ImageCarousel key={id} images={hotel.images} alt={hotel.name} />

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-3">About this hotel</h2>
        <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
      </section>

      {hotel.facilities.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Amenities</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-gray-700">
            {facilities.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-teal-600">✓</span> {f}
              </li>
            ))}
          </ul>
          {hotel.facilities.length > 12 && (
            <button onClick={() => setShowAll(!showAll)} className="mt-3 text-teal-700 font-semibold hover:underline">
              {showAll ? "Show less" : `Show all ${hotel.facilities.length} amenities`}
            </button>
          )}
        </section>
      )}

      {hotel.rooms.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Room types</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {hotel.rooms.map((r) => (
              <article key={r.id} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                {r.photo && (
                  <img src={r.photo} alt={r.name} loading="lazy" className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{r.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {[r.size, r.maxOccupancy ? `Up to ${r.maxOccupancy} guests` : null, ...r.beds]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">{r.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {r.amenities.slice(0, 6).map((a) => (
                      <span key={a} className="text-xs bg-teal-50 text-teal-800 px-2 py-1 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Guest reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No written reviews available yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.id} className="border rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.name || "Guest"}</p>
                  <span className="text-sm bg-teal-700 text-white px-2 py-0.5 rounded">{r.score}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {r.type?.replaceAll("_", " ")} ·{" "}
                  {r.date ? new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : ""}
                </p>
                {r.headline && <p className="font-medium mt-2">{r.headline}</p>}
                {r.pros && <p className="text-sm text-green-700 mt-1">+ {r.pros}</p>}
                {r.cons && <p className="text-sm text-red-700 mt-1">− {r.cons}</p>}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}