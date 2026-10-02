import { getStayDates } from "../utils/dates";

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