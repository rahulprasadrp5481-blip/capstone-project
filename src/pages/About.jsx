import Accordion from "../components/Accordion";
import { founders, team, investors, faqs } from "../data/about";

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function PersonCard({ person }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <div className="mx-auto h-20 w-20 rounded-full bg-teal-700 text-white flex items-center justify-center text-2xl font-bold">
        {initials(person.name)}
      </div>
      <h3 className="mt-4 font-bold text-lg">{person.name}</h3>
      <p className="text-teal-700 text-sm font-medium">{person.role}</p>
      {person.bio && <p className="mt-2 text-sm text-gray-600">{person.bio}</p>}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">About Wanderly</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl">
        Wanderly brings travel stories and hotel discovery together in one simple place.
        Read inspiring blogs, search hotels country by country, and keep a personal
        wishlist for your next trip.
      </p>

      <Section title="Our mission">
        <p className="text-gray-700 max-w-3xl">
          Planning a trip should feel exciting, not confusing. We make it easy for anyone,
          technical or not, to explore destinations, compare stays and decide with confidence.
        </p>
      </Section>

      <Section title="Co-founders">
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
          {founders.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </Section>

      <Section title="Our team">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </Section>

      <Section title="Our investors">
        <div className="flex flex-wrap gap-3">
          {investors.map((name) => (
            <span
              key={name}
              className="px-4 py-2 rounded-full bg-teal-50 text-teal-800 font-medium border border-teal-200"
            >
              {name}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Frequently asked questions">
        <div className="max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>
    </div>
  );
}