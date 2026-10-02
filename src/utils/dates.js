const toISO = (d) => d.toISOString().split("T")[0];

export const getStayDates = (daysFromNow = 30, nights = 1) => {
  const checkin = new Date();
  checkin.setDate(checkin.getDate() + daysFromNow);
  const checkout = new Date(checkin);
  checkout.setDate(checkout.getDate() + nights);
  return { checkin: toISO(checkin), checkout: toISO(checkout) };
};