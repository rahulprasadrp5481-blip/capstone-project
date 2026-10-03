import { getStayDates } from "../utils/dates";
import { stripHtml } from "../utils/format";

const BASE = "https://api.liteapi.travel/v3.0";
const headers = {
  "X-API-Key": import.meta.env.VITE_LITEAPI_KEY,
  accept: "application/json",
};

export async function fetchHotelsByCountry(countryCode) {
  const res = await fetch(`${BASE}/data/hotels?countryCode=${countryCode}&limit=50`, { headers });
  if (!res.ok) throw new Error(`Hotels request failed (${res.status})`);
  const json = await res.json();
  return (json.data || []).slice(0, 50);
}

export async function fetchMinPrices(hotelIds) {
  if (!hotelIds.length) return {};
  const { checkin, checkout } = getStayDates();
  const res = await fetch(`${BASE}/hotels/rates`, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json" },
    body: JSON.stringify({
      hotelIds,
      occupancies: [{ adults: 2 }],
      currency: "INR",
      guestNationality: "IN",
      checkin,
      checkout,
    }),
  });
  if (!res.ok) throw new Error(`Rates request failed (${res.status})`);
  const json = await res.json();

  const prices = {};
  (json.data || []).forEach((h) => {
    const amounts = (h.roomTypes || [])
      .map((r) => r.offerRetailRate?.amount)
      .filter((a) => typeof a === "number");
    if (amounts.length) prices[h.hotelId] = Math.min(...amounts);
  });
  return prices;
}

const BLOGGER = "https://www.googleapis.com/blogger/v3";

const firstImage = (html = "") => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
};

export async function fetchBlogs() {
  const key = import.meta.env.VITE_BLOGGER_KEY;
  const blogId = import.meta.env.VITE_BLOG_ID;
  const res = await fetch(
    `${BLOGGER}/blogs/${blogId}/posts?key=${key}&maxResults=50&fetchImages=true`
  );
  if (!res.ok) throw new Error(`Blogs request failed (${res.status})`);
  const json = await res.json();

  return (json.items || []).map((p) => ({
    id: p.id,
    title: p.title,
    url: p.url,
    published: p.published,
    author: p.author?.displayName,
    image: p.images?.[0]?.url || firstImage(p.content),
    excerpt: stripHtml(p.content).slice(0, 150),
  }));
}
const unique = (arr) => [...new Set(arr)];

export async function fetchHotelDetail(hotelId) {
  const res = await fetch(`${BASE}/data/hotel?hotelId=${hotelId}`, { headers });
  if (!res.ok) throw new Error(`Hotel request failed (${res.status})`);
  const json = await res.json();
  const d = json.data;
  if (!d) throw new Error("Hotel not found");

  const rooms = (d.rooms || []).map((r) => ({
    id: r.id,
    name: r.roomName,
    description: stripHtml(r.description),
    size: r.roomSizeSquare ? `${r.roomSizeSquare} ${r.roomSizeUnit || "sqm"}` : null,
    maxOccupancy: r.maxOccupancy,
    beds: (r.bedTypes || []).map((b) => `${b.quantity} x ${b.bedType}`),
    amenities: (r.roomAmenities || []).map((a) => a.name).filter(Boolean),
    photo: r.photos?.[0]?.hd_url || r.photos?.[0]?.url || null,
  }));

  const hotelImages = (d.hotelImages || []).map((i) => i.urlHd || i.url).filter(Boolean);
  const roomImages = (d.rooms || []).flatMap((r) =>
    (r.photos || []).map((p) => p.hd_url || p.url)
  );
  const images = unique(
    hotelImages.length ? hotelImages : [d.main_photo, ...roomImages].filter(Boolean)
  );

  const facilities = (d.hotelFacilities || [])
    .map((f) => (typeof f === "string" ? f : f?.name))
    .filter(Boolean);

  return {
    id: d.id ?? hotelId,
    name: d.name,
    city: d.city,
    address: d.address,
    description: stripHtml(d.hotelDescription),
    main_photo: d.main_photo,
    stars: d.stars ?? d.starRating,
    rating: d.rating,
    reviewCount: d.reviewCount,
    images,
    facilities,
    rooms,
  };
}

export async function fetchReviews(hotelId) {
  const res = await fetch(`${BASE}/data/reviews?hotelId=${hotelId}&limit=30`, { headers });
  if (!res.ok) throw new Error(`Reviews request failed (${res.status})`);
  const json = await res.json();
  return (json.data || [])
    .filter((r) => r.headline || r.pros || r.cons)
    .slice(0, 6)
    .map((r) => ({
      id: r.reviewId,
      name: r.name,
      score: r.averageScore,
      date: r.date,
      headline: r.headline,
      pros: r.pros,
      cons: r.cons,
      type: r.type,
    }));
}