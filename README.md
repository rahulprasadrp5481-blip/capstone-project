# TrailNest

**Follow the trail. Find your nest.**

TrailNest is a single-page travel website where users can read travel blogs, search hotels country by country, view full hotel details, and save favourite hotels to a wishlist that persists across visits.

- **Live site:** https://travelapp22.netlify.app/
- **GitHub repository:** https://github.com/rahulprasadrp5481-blip/capstone-project

---

## Features

| Page | What it does |
|---|---|
| **Home (Travel Blogs)** | Fixed header, parallax banner, blogs fetched live from the Blogger API (9 per page, 3 per row) with pagination and scroll-reveal animation |
| **Hotels** | Country dropdown (249 countries, ISO-2 codes). Fetches hotels from LiteAPI, limits the result to 50, and shows 10 cards per page with pagination |
| **Hotel Detail** | Image carousel, amenities, room types, guest reviews, lowest nightly price, and an Add to Favourites button |
| **Favourites** | Saved hotels with a Remove button, empty state, and a live count badge on the header heart icon |
| **About** | Company mission, co-founders, team, investors, and an FAQ accordion |

Other details:

- Hotel card shows name, description, city, photo, rating, review count, and price ("From INR X / night" for 2 adults).
- Prices come from LiteAPI's rates endpoint. If a rate is missing, the card shows "Price unavailable" instead of failing.
- Favourites are stored in `localStorage`, so they survive refresh and browser restarts.
- Newsletter form in the footer validates the email address.
- Privacy Policy and Terms & Conditions open in a modal (closes with the X button, outside click, or Esc).
- Loading, error (with Retry), and empty states on every data-driven page.
- Custom 404 page and automatic scroll-to-top on route change.
- Fully responsive (mobile, tablet, desktop) with a hamburger menu on small screens.

## Tech stack

| Tool | Used for |
|---|---|
| React (Vite) | UI components and SPA |
| Redux Toolkit + react-redux | Global state (`createAsyncThunk` runs on redux-thunk middleware) |
| react-router-dom | Routing, including the dynamic `/hotels/:id` route |
| Tailwind CSS | Styling and responsive layout |
| react-icons | Icons |
| Vitest + React Testing Library | Unit and component tests |
| ESLint | Linting |
| Netlify | Hosting with auto-deploy from GitHub |

**APIs**

- [LiteAPI](https://docs.liteapi.travel/reference/get_data-hotels): hotel list, hotel details, reviews, and rates.
- [Blogger API v3](https://developers.google.com/blogger/docs/3.0/using): travel blog posts. Each card's "Read more" link comes from the API.

## Project structure

```
src/
├── app/            Redux store (and localStorage subscription)
├── components/     Header, Footer, Banner, Logo, HotelCard, BlogCard,
│                   Pagination, ImageCarousel, Accordion, Modal, Reveal, ScrollToTop
├── pages/          Home, Hotels, HotelDetail, Favourites, About, NotFound
├── features/       Redux slices: hotels, hotelDetail, blogs, favourites
├── services/       API calls (api.js)
├── data/           countries.js, about.js
├── utils/          storage.js, format.js, dates.js
└── tests/          Test setup, helpers, and test files
```

Data flow: **component → dispatch(thunk) → service → API → slice → useSelector → UI**. Components never call `fetch` directly.

## Run locally

```bash
git clone https://github.com/rahulprasadrp5481-blip/capstone-project.git
cd capstone-project
npm install
```

Create a `.env` file in the project root:

```
VITE_LITEAPI_KEY=your_liteapi_sandbox_key
VITE_BLOGGER_KEY=your_blogger_api_key
VITE_BLOG_ID=your_blogger_blog_id
```

Then:

```bash
npm run dev       # start the dev server
npm test          # run unit tests
npm run lint      # run ESLint
npm run build     # production build
```

Restart the dev server after changing `.env`. The `.env` file is git-ignored and must never be committed.

## Testing

24 tests across 6 files, written with Vitest and React Testing Library:

- `favouritesSlice`: add, no duplicates, remove, remove unknown id
- `utils`: HTML stripping, price formatting, stay-date generation
- `Pagination`: button count, click handler, disabled Prev/Next, single-page case
- `HotelCard`: rendered fields, price states, adding and removing favourites
- `Footer`: newsletter validation and privacy modal behaviour
- `Accordion`: default open item, switching items, closing an item

## Design

- **Name and logo:** TrailNest. "Trail" stands for the journey (blogs) and "Nest" for the stay (hotels and wishlist). The logo is a map pin with a small house inside, drawn as an SVG.
- **Palette:** deep teal (`teal-700`) as the main colour, amber (`amber-300`) as the accent, with white, light grey, and dark grey for backgrounds. Palette reference: [Color Hunt](https://colorhunt.co/).

## Known limitations and future improvements

- API keys with a `VITE_` prefix are bundled into the frontend. This is acceptable for sandbox and restricted keys, but a production app should call the APIs through a backend or serverless function.
- The parallax banner uses `background-attachment: fixed`, which iOS Safari does not support (it falls back to a normal scroll).
- Prices are fetched per visible page, for 2 adults and one night about 30 days ahead. A date and guest picker would make them exact.
- Possible upgrades: search and filters on hotels, server-side pagination, caching with RTK Query, list virtualization for large datasets, and user accounts.

## License

Built as a capstone project for learning purposes. Hotel data and images belong to their respective providers.
