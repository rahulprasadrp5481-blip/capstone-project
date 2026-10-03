export default function BlogCard({ blog }) {
  const date = blog.published
    ? new Date(blog.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

  return (
    <article className="h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">
      {blog.image ? (
        <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-teal-600 to-teal-300" />
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg line-clamp-2">{blog.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {blog.author} {blog.author && date && "·"} {date}
        </p>
        <p className="text-sm text-gray-600 mt-3 line-clamp-3">{blog.excerpt}</p>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-4 text-teal-700 font-semibold hover:underline"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}