import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageCarousel({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="h-72 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
        No photos available
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div>
      <div className="relative">
        <img
          src={images[index]}
          alt={`${alt} photo ${index + 1}`}
          className="w-full h-72 md:h-[28rem] object-cover rounded-xl"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow"
            >
              <FaChevronRight />
            </button>
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button key={src} onClick={() => setIndex(i)} aria-label={`Show photo ${i + 1}`}>
              <img
                src={src}
                alt=""
                loading="lazy"
                className={`h-16 w-24 object-cover rounded-md border-2 ${
                  i === index ? "border-teal-600" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}