import Link from "next/link";
import { BlogData } from "@/types/Blogs";
import Pagination from "@/components/shared/Pagination";
import dummyData from "@/fakeData.json";

interface BlogsProps {
  searchedBlogs?: string;
  page?: string;
  locale: string;
}

export default function Blogs({ locale, searchedBlogs, page }: BlogsProps) {
  const itemsPerPage = 6;
  const startIndex = ((Number(page) || 1) - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const returnedData = (dummyData as BlogData)[locale].filter((data) => {
    if (searchedBlogs) {
      return data.title.toLowerCase().includes(searchedBlogs.toLowerCase());
    } else {
      return data;
    }
  });

  const paginatedBlogs = returnedData.slice(startIndex, endIndex);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        {returnedData.length > 1 ? (
          paginatedBlogs.map((data) => (
            <Link href={`${locale}/${data.id}`} key={data.id}>
              <div className="bg-white py-4 px-4 shadow-md rounded-lg">
                <div className="relative h-40 w-full flex justify-center items-center">
                  <img src={data.thumbnail} className="h-40" alt="Blog image" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {data.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{data.content}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold text-gray-800">
              No matching data
            </h2>
          </div>
        )}
      </div>
      <Pagination itemsNumber={returnedData.length} />
    </>
  );
}
