import { stripHtml, formatPrice } from "../utils/format";
import { getStayDates } from "../utils/dates";

describe("stripHtml", () => {
  it("removes tags and extra spaces", () => {
    expect(stripHtml("<p><strong>Luxury</strong> stay</p>")).toBe("Luxury stay");
  });

  it("handles missing input", () => {
    expect(stripHtml()).toBe("");
  });
});

describe("formatPrice", () => {
  it("formats rupees with Indian commas and no decimals", () => {
    const text = formatPrice(28017.17);
    expect(text).toContain("28,017");
    expect(text).not.toContain(".17");
  });
});

describe("getStayDates", () => {
  it("returns ISO dates with checkout after checkin", () => {
    const { checkin, checkout } = getStayDates();
    expect(checkin).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Date(checkout) > new Date(checkin)).toBe(true);
  });
});