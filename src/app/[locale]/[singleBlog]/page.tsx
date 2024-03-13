import React from "react";
import Link from "next/link";
import { BlogData } from "@/types/Blogs";
import dummyData from "@/fakeData.json";

interface SingBlogProps {
  params: {
    locale: string;
    singleBlog: string;
  };
}

function SingleBlog({ params }: SingBlogProps) {
  const singleBlogID = params.singleBlog;
  const locale = params.locale;

  const requiredBlog = (dummyData as BlogData)[locale].find(
    (data) => data.id === singleBlogID
  );

  return (
    <>
      <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
        <Link
          href="/"
          className="flex justify-center items-center text-white font-bold p-0 m-0 bg-gray-500 mb-6 rounded-full w-8 h-8 hover:bg-gray-400 transition duration-300 ease-in-out"
        >
          &larr;
        </Link>
        <h1 className="text-3xl font-bold mb-4">{requiredBlog?.title}</h1>
        <img
          src={requiredBlog?.thumbnail}
          alt="Blog image"
          className="w-full h-auto rounded-lg mb-4"
        />
        <p className="text-gray-700">{requiredBlog?.content}</p>
      </div>
    </>
  );
}

export default SingleBlog;
