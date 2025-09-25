import SingleBlog from "@/components/Blog/SingleBlog";
import blogData from "@/components/Blog/blogData";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import { getsingleData } from "./lib/getSingleData";

export const metadata: Metadata = {
  title: "Blog Page | Free Next.js Template for Startup and SaaS",
  description: "This is Blog Page for Startup Nextjs Template",
  // other metadata
};

export const dynamic = "force-static"; // Optional: avoid full SSR unless needed
async function getBlogList() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 10 },
    cache: 'force-cache',
  });
  return res.json();
}
async function Blog() {

  const jsonData = await getBlogList();
  const singleData = await getsingleData();
  const fetchedAt = new Date().toLocaleString();

  console.log('✅ Server fetch at', new Date().toISOString());

  return (
    <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pt-[120px] pb-[120px]">
        <h2>Our Blog</h2>
        <p>res2: {singleData.title}</p>
        <div className="container">
          <p className="mb-4 text-sm text-gray-500">
            Server Fetched At: {fetchedAt}
          </p>

          <div className="-mx-4 flex flex-wrap justify-center">
            {jsonData.map((blog: any) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                {blog.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          {/* Pagination - unchanged */}
          <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                {/* Pagination buttons */}
                {["Prev", "1", "2", "3", "...", "12", "Next"].map((label, i) => (
                  <li className="mx-1" key={i}>
                    <a
                      href="#0"
                      className="bg-body-color/15 text-body-color hover:bg-primary flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition hover:text-white"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export default Blog;
