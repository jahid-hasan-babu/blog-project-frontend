import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [blog, setBlog] = useState([]);
  const router = useRouter();

  const { category } = router.query;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Handle if category is an array
        const categoryQuery = Array.isArray(category)
          ? category.join(",")
          : category;
        const res = await axios.get(
          `/api/getblog?blogCategory=${encodeURIComponent(categoryQuery)}`
        );

        const alldata = res.data;
        setBlog(alldata);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data", error);
        setLoading(false);
      }
    };

    if (category) {
      fetchBlogData();
    } else {
      router.push("/404");
    }
  }, [category]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);

  const allblog = blog.length;

  const publishedBlogs = Array.isArray(currentBlogs)
    ? currentBlogs.filter((ab) => ab.status === "publish")
    : [];

  // Function to extract the first image URL from markdown content
  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);

    return match ? match[1] : null;
  }

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="category_slug">
          <div className="container">
            <div className="category_title">
              <div className="flex gap-1">
                <h1>
                  {loading ? (
                    <div>Loading...</div>
                  ) : publishedBlogs ? (
                    publishedBlogs && publishedBlogs[0]?.blogCategory
                  ) : (
                    publishedBlogs && publishedBlogs.blogCategory
                  )}
                </h1>
                <span>
                  {loading ? (
                    <div>0</div>
                  ) : (
                    publishedBlogs.filter((blog) => blog.blogCategory).length
                  )}
                </span>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Provident earum aperiam laudantium omnis laboriosam a unde
                cumque perspiciatis labore quis.
              </p>
            </div>
            <div className="category_blogs mt-3">
              {loading ? (
                <>
                  <div className="wh-100 flex flex-center mt-2 pb-5">
                    <div className="loader"></div>
                  </div>
                </>
              ) : (
                <>
                  {publishedBlogs.map((item) => {
                    const firstImageUrl = extractFirstImageUrl(
                      item.description
                    );
                    return (
                      <div className="cate_blog" key={item._id}>
                        <Link href={`/blog/${item.slug}`}>
                          <img
                            src={
                              firstImageUrl || "/img/Image_not_available.png"
                            }
                            alt={item.title}
                          />
                        </Link>

                        <div className="bloginfo mt-2">
                          <Link href={`/tag/${item.tags[0]}`}>
                            <div className="blogtag">{item.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${item.slug}`}>
                            <h3>{item.title}</h3>
                          </Link>

                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Ea, corporis fuga! Ad natus adipisci quaerat!
                          </p>
                          <div className="blogauthor flex gap-1">
                            <div className="blogaimg">
                              <img src="/img/resume.png" alt="" />
                            </div>
                            <div className="flex flex-col flex-left gap-05">
                              <h4>JB coder</h4>
                              <span>
                                {new Date(item.createdAt).toLocaleDateString(
                                  "en-bg",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
