import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section
      className="relative h-[70vh] min-h-[420px] flex items-center justify-center text-center text-white bg-teal-800 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/banner.jpg')",
      }}
    >
      <div className="px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the world, one stay at a time</h1>
        <p className="text-lg mb-6">Travel stories, trusted hotels, and your personal wishlist.</p>
        <Link to="/hotels" className="inline-block bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-teal-50 transition">
          Find Hotels
        </Link>
      </div>
    </section>
  );
}