import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { addFavourite, removeFavourite } from "../features/favourites/favouritesSlice";
import { stripHtml, formatPrice } from "../utils/format";

export default function HotelCard({ hotel, price }) {
  const dispatch = useDispatch();
  const isFav = useSelector((s) => s.favourites.items.some((h) => h.id === hotel.id));

  const toggleFav = () => {
    if (isFav) {
      dispatch(removeFavourite(hotel.id));
    } else {
      dispatch(
        addFavourite({
          id: hotel.id,
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

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <button
        onClick={toggleFav}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
        className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-2 text-red-500 text-lg"
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/hotels/${hotel.id}`}>
        <img
          src={hotel.main_photo}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg">{hotel.name}</h3>
          <p className="text-sm text-gray-500">{hotel.city}</p>

          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="flex items-center gap-1 bg-teal-700 text-white px-2 py-0.5 rounded">
              <FaStar /> {hotel.rating}
            </span>
            <span className="text-gray-600">{hotel.reviewCount?.toLocaleString("en-IN")} reviews</span>
          </div>

          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {stripHtml(hotel.hotelDescription)}
          </p>

          <p className="mt-3 font-semibold">
            {price === undefined
              ? "Loading price..."
              : price === null
              ? "Price unavailable"
              : <>From {formatPrice(price)} <span className="text-xs font-normal text-gray-500">/ night</span></>}
          </p>
        </div>
      </Link>
    </div>
  );
}