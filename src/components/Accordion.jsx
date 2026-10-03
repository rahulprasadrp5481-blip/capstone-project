import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y border rounded-xl bg-white overflow-hidden">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 font-semibold hover:bg-gray-50"
            >
              {item.q}
              <FaChevronDown
                className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && <p className="px-4 pb-4 text-gray-700">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}