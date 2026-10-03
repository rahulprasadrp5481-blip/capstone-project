import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <h1 className="text-6xl font-bold text-teal-700">404</h1>
      <p className="mt-4 text-gray-600">This page does not exist.</p>
      <Link to="/" className="inline-block mt-6 bg-teal-700 text-white px-6 py-3 rounded-full">
        Go home
      </Link>
    </div>
  );
}