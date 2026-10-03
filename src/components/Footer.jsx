import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Modal from "./Modal";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MODALS = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "This is a demo travel website built as a learning project.",
      "We store only your favourite hotels, and only in your own browser using local storage. This data never leaves your device.",
      "If you subscribe to the newsletter, your email is not sent or stored anywhere in this demo.",
      "Hotel and blog content is loaded from third-party services, which may have their own privacy policies.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "By using this website you agree to use it for personal, non-commercial purposes.",
      "Hotel details, ratings and prices come from a third-party service and may change or be unavailable.",
      "This demo does not process real bookings or payments.",
      "Content on this site is provided as is, without any warranty.",
    ],
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [modal, setModal] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setMessage({ type: "error", text: "Please enter your email." });
    } else if (!EMAIL_REGEX.test(value)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
    } else {
      setMessage({ type: "success", text: "Thanks for subscribing!" });
      setEmail("");
    }
  };

  const active = modal ? MODALS[modal] : null;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Wanderly</h3>
          <p className="text-sm">
            Discover travel stories and find the perfect hotel in any country.
            Save your favourites and plan your next trip with ease.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/hotels" className="hover:text-white">Hotels</Link></li>
            <li><Link to="/favourites" className="hover:text-white">Favourites</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhoneAlt /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><FaEnvelope /> hello@wanderly.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Ranchi, Jharkhand, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-3">Newsletter</h3>
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="Email for newsletter"
              className="w-full px-3 py-2 rounded-md text-gray-900"
            />
            <button type="submit" className="mt-2 w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-md">
              Subscribe
            </button>
            {message.text && (
              <p className={`mt-2 text-sm ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 text-sm py-4 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        <span>© {new Date().getFullYear()} Wanderly. All rights reserved.</span>
        <div className="flex gap-4">
          <button onClick={() => setModal("privacy")} className="hover:text-white underline">
            Privacy Policy
          </button>
          <button onClick={() => setModal("terms")} className="hover:text-white underline">
            Terms & Conditions
          </button>
        </div>
      </div>

      {active && (
        <Modal title={active.title} onClose={() => setModal(null)}>
          <div className="space-y-3 text-sm text-gray-700">
            {active.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Modal>
      )}
    </footer>
  );
}