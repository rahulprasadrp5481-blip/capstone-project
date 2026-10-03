import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { removeFavourite } from "../features/favourites/favouritesSlice";

export default function Favourites() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.favourites.items);

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">Your wishlist is empty</h1>
        <p className="text-gray-600 mb-6">
          Tap the heart on any hotel to save it here.
        </p>
        <Link
          to="/hotels"
          className="inline-block bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-600"
        >
          Browse hotels
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        My Favourites ({items.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((h) => (
          <article
            key={h.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <Link to={`/hotels/${h.id}`}>
              {h.main_photo ? (
                <img
                  src={h.main_photo}
                  alt={h.name}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200" />
              )}
              <div className="p-4 pb-2">
                <h3 className="font-bold text-lg">{h.name}</h3>
                <p className="text-sm text-gray-500">{h.city}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="flex items-center gap-1 bg-teal-700 text-white px-2 py-0.5 rounded">
                    <FaStar /> {h.rating}
                  </span>
                  <span className="text-gray-600">
                    {h.reviewCount?.toLocaleString("en-IN")} reviews
                  </span>
                </div>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <button
                onClick={() => dispatch(removeFavourite(h.id))}
                className="mt-2 inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <FaTrashAlt /> Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}