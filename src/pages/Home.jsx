import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blogs/blogsSlice";
import Banner from "../components/Banner";
import BlogCard from "../components/BlogCard";
import Reveal from "../components/Reveal";
import Pagination from "../components/Pagination";

const PER_PAGE = 9;

export default function Home() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((s) => s.blogs);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === "idle") dispatch(getBlogs());
  }, [status, dispatch]);

  const visible = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changePage = (p) => {
    setPage(p);
    document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Banner />
      <section id="blogs" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Travel Blogs</h2>

        {status === "loading" && <p className="text-center py-12">Loading blogs...</p>}

        {status === "failed" && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => dispatch(getBlogs())} className="px-4 py-2 bg-teal-700 text-white rounded-md">
              Retry
            </button>
          </div>
        )}

        {status === "succeeded" && list.length === 0 && (
          <p className="text-center py-12">No blog posts found.</p>
        )}

        {status === "succeeded" && list.length > 0 && (
          <>
            <div key={page} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((b, i) => (
                <Reveal key={b.id} delay={(i % 3) * 120}>
                  <BlogCard blog={b} />
                </Reveal>
              ))}
            </div>
            <Pagination total={list.length} perPage={PER_PAGE} page={page} onChange={changePage} />
          </>
        )}
      </section>
    </>
  );
}