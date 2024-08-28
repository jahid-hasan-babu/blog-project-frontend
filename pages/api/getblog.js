import { mongooseconnect } from "@/lib/mongoose";
import Blog from "@/models/blog";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseconnect();

  if (method === "GET") {
    try {
      if (req.query?.id) {
        // Fetch a single blog by id
        const blog = await Blog.findById(req.query.id);
        res.json(blog);
      } else if (req.query?.blogCategory) {
        // Assuming blogCategory might be a comma-separated string
        const categories = req.query.blogCategory.split(",");
        const cate = await Blog.find({ blogCategory: { $in: categories } });
        res.json(cate.reverse());
      } else if (req.query?.tags) {
        const tag = await Blog.find({ tags: req.query.tags });
        res.json(tag.reverse());
      } else if (req.query?.slug) {
        const url = await Blog.find({ slug: req.query.slug });
        res.json(url.reverse());
      } else {
        const blogs = await Blog.find();
        res.json(blogs.reverse());
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
