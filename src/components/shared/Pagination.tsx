"use client";

import { useState, useEffect } from "react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";

function Pagination({ itemsNumber }: { itemsNumber: number }) {
  const t = useTranslations("Index");
  const router = useRouter();
  const pathname = usePathname(); // To get the pathname without the parameters
  const searchParams = useSearchParams(); // To get the parameters

  let selectedPage = Number(searchParams?.get("page")) || 1;

  // Total number of pages
  const totalPages = Math.floor(itemsNumber / 6) + 1;

  // All pages in array used in slicing to display the current page, two before and two after
  const [allPages, setAllPages] = useState<number[]>([]);

  // The 5 displayed pages
  const [shownPages, setShownPages] = useState<number[]>([]);

  useEffect(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    setAllPages(pages);
  }, [totalPages]);

  // Handles the 5 displayed pages
  useEffect(() => {
    if (selectedPage == 0) {
      const visiblePages = allPages.slice(selectedPage, selectedPage + 5);
      setShownPages(visiblePages);
    } else if (selectedPage == 1) {
      const visiblePages = allPages.slice(selectedPage - 1, selectedPage + 4);
      setShownPages(visiblePages);
    } else if (selectedPage == 2) {
      const visiblePages = allPages.slice(selectedPage - 2, selectedPage + 3);
      setShownPages(visiblePages);
    } else {
      const visiblePages = allPages.slice(selectedPage - 3, selectedPage + 2);
      setShownPages(visiblePages);
    }
  }, [allPages, selectedPage]);

  useEffect(() => {
    if (selectedPage == 0) {
      selectedPage = 1;
    }
  }, [selectedPage]);

  function handlePagination(page: string) {
    const paginationParam = searchParams.has("page");

    if (paginationParam) {
      const currentURL = new URL(window.location.href);
      currentURL.searchParams.set("page", page);
      router.replace(currentURL.href, {
        scroll: false,
      });
    } else {
      router.replace(`${pathname}?${searchParams}&page=${page}`, {
        scroll: false,
      });
    }
  }

  const previousPageClick = () => {
    if (selectedPage > 1) {
      selectedPage = selectedPage - 1;
      handlePagination(String(selectedPage));
    }
  };

  const nextPageClick = () => {
    if (selectedPage == 0) {
      selectedPage = selectedPage + 2;
      handlePagination(String(selectedPage));
    } else if (selectedPage < totalPages) {
      selectedPage = selectedPage + 1;
      handlePagination(String(selectedPage));
    }
  };

  const buttonClick = (page: number) => {
    handlePagination(String(page));
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <button
        className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300 disabled:opacity-50"
        onClick={previousPageClick}
        disabled={selectedPage <= 1}
      >
        {t("prev")}
      </button>
      <div className="flex">
        {shownPages.map((page) => (
          <button
            key={page}
            className={`px-4 py-2 mx-1 ${
              selectedPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-600 hover:text-white rounded`}
            onClick={() => buttonClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300 disabled:opacity-50"
        onClick={nextPageClick}
        disabled={selectedPage >= totalPages}
      >
        {t("next")}
      </button>
    </div>
  );
}

export default Pagination;
